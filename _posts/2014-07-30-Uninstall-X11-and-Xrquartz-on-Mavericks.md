---
title: Uninstall X11 and Xrquartz on Mavericks
comments: true
layout: post
Date: 2014-07-30 07:00
---
{% highlight bash linenos=table %}
sudo rm -rf /etc/X11 /usr/X11R6 /Applications/Utilities/X11.app
	
sudo rm -rf /usr/X11* /System/Library/Launch*/org.x.* /Applications/Utilities/X11.app /etc/*paths.d/X11
sudo rm -rf /opt/X11* /Library/Launch*/org.macosforge.xquartz.* /Applications/Utilities/XQuartz.app /etc/*paths.d/*XQuartz
{% endhighlight %}