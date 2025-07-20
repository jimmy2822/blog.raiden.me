'use strict';

const assign = require('object-assign');
const pathFn = require('path');
const lunr   = require('lunr');
const fs     = require('fs');
const moment = require('moment')

const config = hexo.config.lunr = assign({
    field: 'all',
    fulltext: false,
    path: 'assets/lunr/'
}, hexo.config.lunr);

hexo.extend.generator.register('lunr', function(locals){
    let config = this.config,
        lunrConfig = config.lunr,
        field = (lunrConfig.field||'').trim(),
        lunrPath = lunrConfig.path,
        posts = [],
        pages = [],
        items,
        res = {"all":[]},
        year1,
        language = config.language;

    switch(field){
        case '':
        case 'post':
            posts = locals.posts.sort('-date');
            break;
        case 'page':
            pages = locals.pages;
            break;
        case 'all':
            posts = locals.posts.sort('-date');
            pages = locals.pages;
            break;
    }//switch
    items = posts.data.concat(pages.data);

    //grouping
    items.forEach(function(post){
        if(post.date._isAMomentObject) {
            year1 = (language == 'en'?post.date.format('YYY'):post.date.format('YYYY'));
        } else {
            year1 = (language == 'en'?post.date.format('YYY'):moment(post.date).format('YYYY'));
        }
        if(!res[year1]){
            res[year1] = [post];
        } else {
            res[year1].push(post);
        }
        res.all.push(post);
    });

    //indexing
    let finalData = [],
        searchIdx,
        store = {},
        tags,
        tagArr,
        cates,
        bodyText;

    for(var yearKey in res){
        let documents = [];
        
        res[yearKey].forEach(function(post){
            tags = [];
            cates = [];
            tagArr = [];
            if (post.tags) {
                post.tags.each(function(tag){
                    tags.push(tag.name);
                    tagArr.push({
                        name: tag.name,
                        path: config.root + tag.path
                    });
                });
            }
            if (post.categories) {
                post.categories.each(function(cate){
                    cates.push(cate.name);
                });
            }
            bodyText = lunrConfig.fulltext ? post.content : post.excerpt;
            
            let doc = {
                title: post.title,
                desc: post.subtitle || "",
                body: bodyText || "",
                tags: tags.join(','),
                cates: cates.join(','),
                href: '/' + post.path
            };
            
            documents.push(doc);

            store['/' + post.path] = {
                url: '/' + post.path,
                title: post.title,
                tags: tags,
                tagArr: tagArr,
                cates: cates,
                cover: post.cover || hexo.config.default_cover || hexo.theme.config.default_cover,
                desc: post.subtitle || post.excerpt || "",
                date: moment(post.date).locale('zh-tw').format(),
                day: moment(post.date).locale('zh-tw').format('D'),
                month: (language == 'en'?moment(post.date).locale('en').format('MMM'):moment(post.date).locale('zh-tw').format('MMMM')),
                authorLink: post.author
                    && post.author.link
                    || hexo.config.author
                    && hexo.config.author.link
                    || hexo.theme.author
                    && hexo.theme.author.link
                    || '/',
                authorNick: post.author
                    && post.author.nick
                    || hexo.config.author
                    && hexo.config.author.name
                    || hexo.theme.author
                    && hexo.theme.author.name
                    || 'unknow'
            };
        });
        
        // 建立 lunr 索引
        searchIdx = lunr(function(){
            this.field('title', {boost:10});
            this.field('body');
            this.field('desc');
            this.field('tags', {boost:5});
            this.field('cates', {boost:5});
            this.ref('href');
            
            // 添加所有文檔到索引
            documents.forEach(function(doc) {
                this.add(doc);
            }, this);
        });
        
        finalData.push({
            path: pathFn.join(lunrPath, yearKey + ".json"),
            data: JSON.stringify({
                index: searchIdx.toJSON(),
                store: store
            })
        });
        store = {};
    }
    return finalData;
});
