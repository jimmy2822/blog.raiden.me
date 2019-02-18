{{ open_graph({
  url: page.permalink || config.url,
  twitter_id: config.twitter_id,
  google_plus: config.google_plus,
  fb_app_id: config.fb_app_id,
  image: config.header_cover || config.default_cover || post.cover
}) }}
