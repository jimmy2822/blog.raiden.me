{{ open_graph({
  url: page.permalink || config.url,
  twitter_id: config.twitter_id,
  fb_app_id: config.fb_app_id,
  image: page.cover || config.default_cover || config.header_cover
}) }}
