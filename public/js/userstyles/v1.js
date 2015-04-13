var userstyles = {
	itemTemplate: 
		"<dl>" + 
			"<dt><a href=\"${url}\" target=\"_new\">" + 
				"<span class=\"userstyles-style-name\">${name}</span><br>" + 
			"</a></dt>" + 
			"<dd>" + 
				"<span class=\"userstyles-style-description\">${description} " + 
				"<a href=\"${screenshot}\" target=\"_new\">[screenshot]</a>" + 
				"</span>" + 
			"</dd>" + 
		"</dl>",
	
	handleData: function(data) {
		var replacements = this.itemTemplate.match(/\$\{[a-z_]+\}/g);
		var allHtml = "";
		for (var i = 0; i < data.length; i++) {
			var itemHtml = this.itemTemplate;
			for (var j = 0; j < replacements.length; j++) {
				var property = this.stripTemplateMarkers(replacements[j]);
				if (property in data[i]) {
					var value = data[i][property];
					if (typeof value == "number") {
						value = this.formatNumber(value);
					}
					itemHtml = itemHtml.replace(new RegExp("\\$\\{" + property + "\\}", "g"), this.escapeHtml(value));
				}
			}
			allHtml += itemHtml;
		}
		console.log(allHtml);
		
		$("#userstyles-container").html(allHtml);
	},

	escapeHtml: function(html) {
		if (typeof html != "string") {
			return html;
		}
		return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
	},

	stripTemplateMarkers: function(s) {
		return s.substring(2, s.length - 1);
	},

	formatNumber: function(num) {
	},

	addStylesheet: function() {
	}
}