---
layout: post
title: ExpressCard USB on MacBook Pro Late 2008
Date: 2014-04-25 08:41 
---

Install ExpressCard USB on MacBook Pro Late 2008, cost around $10, get it cheaply on ebay or amazon. add an extra USB 3.0 port, faster than USB 2.0 

Notice how the USB ports at the back are exhausted. Now, i need not worry as there are 2 additional USB ports in the front. Another plus, the USB ports are hidden. No need to worry about enormous USB modem blocking the USB ports. 

![alt text](http://terrywhite.com/wp-content/uploads/2009/04/usbadapter_0013.jpg "Logo Title Text 1")

this is the one i use

![alt text](http://i.ebayimg.com/00/s/NzUzWDcwMA==/z/rOEAAOxyMxpRpKZR/$T2eC16ZHJGUFFi!7YKScBRpKZRWM6Q~~60_3.JPG "Logo Title Text 1")

http://www.ebay.com.au/itm/2-Port-Hidden-Inside-USB-3-0-to-ExpressCard-Express-Card-34-34mm-Adapter-NEC-5G-/180884695143?

The mbp does not readily support the expresscard. Must download 3rd party drivers.

**Requirements:**
* Expresscard with `uPD720202` Chipset
* Download the driver http://sourceforge.net/projects/genericusbxhci/files/latest/download
* Download Kext Utility from http://cvad-mac.narod.ru/index/0-4
* install the driver and restart

**Some Problems:**
* Most usb devices will work, a mouse and usb external drive have failed so far.
* After the expresscard adapter get stuck in the macbook pro. 

to remove the expresscard menubar icon, go to /System/Library/CoreServices/Menu Extras rename ExpressCard.menu. Then restart

More help can be found at http://www.insanelymac.com/forum/topic/286860-genericusbxhci-usb-30-driver-for-os-x-with-source