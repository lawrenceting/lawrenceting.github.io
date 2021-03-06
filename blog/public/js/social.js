var scripts = {
    'facebook-jssdk': '//connect.facebook.net/en_US/all.js#xfbml=1',
    'googleplus'    : 'https://apis.google.com/js/plusone.js',
    'twitter-wjs'   : '//platform.twitter.com/widgets.js',
    'analytics'     : ('https:'==location.protocol?'//ssl':'//www') + '.google-analytics.com/ga.js'
  }, script, _gaq=[['_setAccount','UA-47200464-1'],['_trackPageview']];

  for (var id in scripts) {
    script = document.createElement('script');
    script.src = scripts[id]; script.id = id;
    script.type = 'text/javascript';
    script.async = true;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
  }