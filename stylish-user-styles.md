---
layout: page
title: User Styles
Slug: stylish-user-styles
Date: 2014-05-01 17:00
Type: page
Published: true
Tags: Firefox, Stylish, User Styles, All-in-One Sidebar
---

<div id="userstyles-container">

	<script type="text/javascript" src="{{ site.url }}/js/User Styles/v1.js"></script>
	
	<script type="text/javascript">

		if (window.addEventListener)
			window.addEventListener("load", userstylesLoad, false);
		else if (window.attachEvent)
			window.attachEvent("onload", userstylesLoad);
		
		function userstylesLoad() {
			var c = document.getElementById("userstyles-container");
			var s1 = document.createElement("script");
			s1.setAttribute("async", "true");
			var s2 = s1.cloneNode(false);

			s1.src = userstyles; /* value obtain from external js file*/
					/* https://df6a.https.cdn.softlayer.net/80DF6A/static.userstyles.org/widgets/v1.js */
									/* backup in js folder */
			c.appendChild(s1);

			s2.src = "//userstyles.org/users/263946.jsonp?callback=userstyles.handleData"; 
					/* http://widget.userstyles.org/users/263946.jsonp?callback=userstyles.handleData */ 
									/* backup in js folder */
			c.appendChild(s2); 
		}
	</script>

	<noscript>
		Check out <a href="http://userstyles.org/users/263946">My User Styles</a>
	</noscript>
</div>

<br><br>