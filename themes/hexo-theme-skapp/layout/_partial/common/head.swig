<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
<meta name="format-detection" content="telephone=no">
<meta name="author" content="{{ get_setting('author') }}" /> <meta name="keywords" content="{{ get_setting('keywords') }}"/>
<meta name="description" content="{{ get_setting('description') }}" />

<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="robots" content="all" />

<link rel="canonical" href="{{ url }}">

<link rel="icon" type="image/png" href="{{ get_setting('favicon_ico') }}" sizes="32x32">

{% if config.google_site_verification %}
  <meta name="google-site-verification" content="{{ config.google_site_verification }}" />
{% endif %}

{% if config.bing_site_verification %}
  <meta name="msvalidate.01" content="{{ config.bing_site_verification }}" />
{% endif %}

<!-- CSS -->
{{ css('scss/base/index') }}

<!-- Prefetch -->
{% include './prefetch.swig' %}

<!-- RSS -->
{{ feed_tag('atom.xml') }}

<!-- 统计 -->
{% include './analytics.swig' %}

<!-- 為圖片加入 og 協議 -->
{% include './open_graph.swig' %}

<!-- 加入 FB SDK -->
{% include './fb_sdk.swig' %}

<!-- 使用 jQuery -->
<script src= '/js/libs/jquery.min.js'></script>

<!-- 使用 google prettify 美化 codeblock -->
{% include './prettify.swig' %}

