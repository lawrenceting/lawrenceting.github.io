---
layout: post
title: ExpressCard USB on MacBook Pro Late 2008
comments: true
Date: 2014-04-25 08:41 
---

Notice how the original USB ports are all used up. You can add USB ports with an ExpressCard USB. You can get it cheaply on <a href="//www.ebay.ca/itm/2-Port-Hidden-Inside-USB-3-0-to-ExpressCard-Express-Card-34-34mm-Adapter-NEC-5G-/180884695143" target="_blank">eBay</a> or Amazon for around $10.

<img src="{{ site.url }}/img/2014-04-25-ExpressCard-USB-Blocked.jpg"/>

<img src="{{ site.url }}/img/2014-04-25-ExpressCard-USB.JPG"/>

My MacBook Pro (Late 2008) does not readily support the ExpressCard USB. You have to download 3rd party drivers.

**Requirements:**

1. Make sure you get an Expresscard USB that has a `uPD720202` Chipset.
2. <a href="//sourceforge.net/projects/genericusbxhci/files/latest/download" target="_blank">Download</a> the driver by zenith432 
3. <a href="//cvad-mac.narod.ru/index/0-4" target="_blank">Download</a> Kext Utility.
4. Install the driver using Kext Utility and restart.

**Some Problems:**

1. Most USB devices will work. However, a mouse and USB external drive have failed so far.
2. The Expresscard USB may get stuck in the MacBook Pro.

To remove the Expresscard menubar icon, go to `/System/Library/CoreServices/Menu Extras` and rename "ExpressCard.menu". Restart again.

More help/info can be found at <a href="//www.insanelymac.com/forum/topic/286860-genericusbxhci-usb-30-driver-for-os-x-with-source" target="_blank">insanelymac.com</a>