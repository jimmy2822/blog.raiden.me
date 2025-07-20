<link rel= "stylesheet" href="/js/libs/google-code-prettify/skins/{{ config.custom_highlight_theme }}.min.css" type="text/css">
<script src= "/js/libs/google-code-prettify/prettify.js" type = "text/javascript" ></script>
<script type= "text/javascript" >
$(document).ready(function(){
    // 處理 Hexo 生成的 highlight 結構
    $('figure.highlight td.code pre').addClass('prettyprint').attr('style', 'overflow:auto;');
    // 也處理一般的 pre 標籤
    $('pre:not(.prettyprint)').addClass('prettyprint linenums').attr('style', 'overflow:auto;');
    prettyPrint();
    });
</script>
