/*
    Scrolling Divs code from Dynamic Web Coding at dyn-web.com
    Copyright 2001-2011 by Sharon Paine 
    See Terms of Use at www.dyn-web.com/business/terms.php
    This notice must be retained in the code as is!
    
    For demos, documentation and updates, visit http://www.dyn-web.com/code/scroll/
    version date: Oct 2011 (adds touch and keyboard support and more...)
*/

// from former scroll_controls.js file
// for backwards compatible setup (using .setUpScrollControls and .setUpScrollbar)
// also used by speed options demo

dw_scrollObj.prototype.setUpScrollControls = function(controlsId, autoHide, axis) {
    var el = document.getElementById(controlsId); if (!el) { return; }
    var wnId = this.id; 
    if ( autoHide && axis == 'v' || axis == 'h' ) {
        dw_scrollObj.handleControlVis(controlsId, wnId, axis);
        dw_Scrollbar_Co.addEvent( this, 'on_load', function() { dw_scrollObj.handleControlVis(controlsId, wnId, axis); } );
        dw_Scrollbar_Co.addEvent( this, 'on_update', function() { dw_scrollObj.handleControlVis(controlsId, wnId, axis); } );
    }
    var links = el.getElementsByTagName('a');
    dw_scrollObj.handleControlLinks(links, wnId);
    links = el.getElementsByTagName('area');
    dw_scrollObj.handleControlLinks(links, wnId);
};

dw_scrollObj.handleControlLinks = function (links, wnId) {
    var list, cls, eType;
    var eTypesAr = ['mouseover', 'mousedown', 'click'];
    for (var i=0; links[i]; i++) { 
        list = dw_Util.get_DelimitedClassList( links[i].className );
        for (var j=0; cls = list[j]; j++) { // loop thru classes
            eType = cls.slice(0, cls.indexOf('_') );
            if ( dw_Util.inArray(eType, eTypesAr) ) {
                switch ( eType ) {
                    case 'mouseover' :
                    case 'mousedown' :
                        dw_scrollObj.handleMouseOverDownLinks(links[i], wnId, cls);
                        break;
                    case 'click': 
                        dw_scrollObj.handleClick(links[i], wnId, cls) ;
                        break;
                }
                break; // stop checking classes for this link
            }
        }
    }
};

dw_scrollObj.handleMouseOverDownLinks = function (linkEl, wnId, cls) {
    var parts = cls.split('_'); var eType = parts[0];
    var re = /^(mouseover|mousedown)_(up|down|left|right)(_[\d]+)?$/;
    if ( re.test(cls) ) { 
        var dir = parts[1];  var speed = parts[2] || null; 
        var deg = (dir == 'up')? 90: (dir == 'down')? 270: (dir == 'left')? 180: 0;
        dw_scrollObj.setupMouseEvents(linkEl, wnId, eType, deg, speed);
    }
};

dw_scrollObj.handleClick = function (linkEl, wnId, cls) {
    var wndo = dw_scrollObj.col[wnId];
    var parts = cls.split('_'); var eType = parts[0]; 
    var dur_re = /^([\d]+)$/; var fn, re, x, y, dur;
    if ( eType == 'click' ) {
        var o = dw_scrollObj.getClickParts(cls);
        fn = o.fn; x = o.x; y = o.y; dur = o.dur;
    }
    if ( x !== '' && y !== '' ) {
        dur = !isNaN( parseInt(dur) )? parseInt(dur): null;
        if (fn == 'scrollBy') {
            dw_Event.add( linkEl, 'click', function (e) {
                    dw_scrollObj.scrollBy(wnId, x, y, dur);
                    if (e && e.preventDefault) e.preventDefault();
                    return false;
                } );
        } else if (fn == 'scrollTo') {
            dw_Event.add( linkEl, 'click', function (e) {
                    dw_scrollObj.scrollTo(wnId, x, y, dur);
                    if (e && e.preventDefault) e.preventDefault();
                    return false;
                } );
        }
    }
};


//////////////////////////////////////////////////////////////////////////
//  adapted from old html_att_ev.js  
// click scrollTo and scrollBy class usage needs check for 'end' and null
dw_scrollObj.scrollBy = function(wnId, x, y, dur) {
    if ( dw_scrollObj.col[wnId] ) {
        var wndo = dw_scrollObj.col[wnId];
        x = (x === null)? -wndo.x: parseInt(x);
        y = (y === null)? -wndo.y: parseInt(y);
        wndo.initScrollByVals(x, y, dur);
    }
};

dw_scrollObj.scrollTo = function(wnId, x, y, dur) {
    if ( dw_scrollObj.col[wnId] ) {
        var wndo = dw_scrollObj.col[wnId];
        x = (x === 'end')? wndo.maxX: x;
        y = (y === 'end')? wndo.maxY: y;
        x = (x === null)? -wndo.x: parseInt(x);
        y = (y === null)? -wndo.y: parseInt(y);
        wndo.initScrollToVals(x, y, dur);
    }
};

// may need for demos, like layer id in query string 
dw_scrollObj.loadLayer = function(wnId, lyrId, horizId) {
    if ( dw_scrollObj.col[wnId] ) dw_scrollObj.col[wnId].load(lyrId, horizId);
};
//
//////////////////////////////////////////////////////////////////////////

// get info from className (e.g., click_down_by_100)
dw_scrollObj.getClickParts = function(cls) {
    var parts = cls.split('_');
    var re = /^(up|down|left|right)$/;
    var dir, fn = '', dur, ar, val, x = '', y = '';
    
    if ( parts.length >= 4 ) {
        ar = parts[1].match(re);
        dir = ar? ar[1]: null;
            
        re = /^(to|by)$/; 
        ar = parts[2].match(re);
        if (ar) {
            fn = (ar[0] == 'to')? 'scrollTo': 'scrollBy';
        } 
    
        val = parts[3]; // value on x or y axis
        re = /^([\d]+)$/;
        dur = ( parts[4] && re.test(parts[4]) )? parts[4]: null;
    
        switch (fn) {
            case 'scrollBy' :
                if ( !re.test( val ) ) {
                    x = ''; y = ''; break;
                }
                switch (dir) { // 0 for unspecified axis 
                    case 'up' : x = 0; y = val; break;
                    case 'down' : x = 0; y = -val; break;
                    case 'left' : x = val; y = 0; break;
                    case 'right' : x = -val; y = 0;
                 }
                break;
            case 'scrollTo' :
                re = /^(end|[\d]+)$/;
                if ( !re.test( val ) ) {
                    x = ''; y = ''; break;
                }
                switch (dir) { // null for unspecified axis 
                    case 'up' : x = null; y = val; break;
                    case 'down' : x = null; y = (val == 'end')? val: -val; break;
                    case 'left' : x = val; y = null; break;
                    case 'right' : x = (val == 'end')? val: -val; y = null;
                 } 
                break;
         }
    }
    return { fn: fn, x: x, y: y, dur: dur }
};

