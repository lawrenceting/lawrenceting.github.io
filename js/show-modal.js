function showModal(PL_id, CH_description){
	
	

		var description = replaceAll("\n", "<br>", CH_description);
			description = Autolinker.link( description, { newWindow: true } );		

		var $modal = $('#myModal').modal({
			  backdrop: true,
			  show: false,
			  keyboard: false
		});
		var showMsg = function (callback) {
			$modal
				.find('.modal-title').html( $( '#channelContainer_' + PL_id + ' .channelTitle-container' )[0].outerHTML ).end()
				.find('.modal-body > h4').html("Description").end()
				.find('.modal-body > p#myModalBody').html(description).end()
				.find('.callback-btn').html("Save").end()
				.find('.callback-btn').off('click.callback')
				.on('click.callback', function(){
				
					if (typeof callback === "function") { 
						callback("Callback Successful!"); 
														 
					} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
				
					$modal.modal('hide');
				
				 }).end()				
				.modal('show');
		}; 
		showMsg(function(result) {
			alert(result);
		});			
	
}