---
layout: page
title: ExpressCard USB on MacBook Pro Late 2008
permalink: index.html
comments: true
Date: 2014-04-25 08:41 
---

Install ExpressCard USB on MacBook Pro Late 2008. You can get it cheaply on ebay or amazon at around $10. 

Notice how the USB ports at the back are blocked. The ExpressCard USB will solve this problem. Plus, the USB ports are hidden. No need to worry about an enormous USB device blocking the USB ports. 

![alt text](ExpressCard-USB-Blocked "ExpressCard USB Exhausted")

this is the one i use

![alt text](ExpressCard-USB- "ExpressCard USB Exhausted")

http://www.ebay.com.au/itm/2-Port-Hidden-Inside-USB-3-0-to-ExpressCard-Express-Card-34-34mm-Adapter-NEC-5G-/180884695143?

MacBook Pro does not readily support the ExpressCard. You must download 3rd party drivers.

**Requirements:**

1. Expresscard with `uPD720202` Chipset
2. Download the driver http://sourceforge.net/projects/genericusbxhci/files/latest/download
3. Download Kext Utility from http://cvad-mac.narod.ru/index/0-4
4. install the driver and restart

**Some Problems:**
* Most usb devices will work, a mouse and usb external drive have failed so far.
* After the expresscard adapter get stuck in the macbook pro. 

to remove the expresscard menubar icon, go to /System/Library/CoreServices/Menu Extras rename ExpressCard.menu. Then restart

More help can be found at http://www.insanelymac.com/forum/topic/286860-genericusbxhci-usb-30-driver-for-os-x-with-source