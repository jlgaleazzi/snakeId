'use strict';

	var fileUploader = {
		uploadFile: function(file) {
			// reset
			$('.box').css({'background-color':'#aad339'});
			$('#venom').css({'display':'none'});
			$('#undetermined').css({'display':'none'});
			$('#notvenom').css({'display':'none'});
			$('#snakebox').css({'background-color':'aad339'});
			$('#snake').attr("src",'static/img/snake_loader4.gif');
			var file_data = $('#picFile').prop('files')[0]; 
			var form_data = new FormData();
			form_data.append('file', file_data);
			var rq = $.ajax({
				url: "/",
				contentType: false,
				cache: false,
				processData: false,
				data: form_data,
				type:'POST'
			})
			rq.done(function(data) {
				// add image to container
				var obj = JSON.parse(data);
				var snakeName = obj.snake;
				var venom = obj.venomous;
				if (venom === 'true') {
					// display venom msg
					var msg = "Venomous";
					$('.box').css({'background-color':'red'});
					$('#venom').css({'display':'block'});
					$('#venom').css({'color':'white'});
					$('#snakebox').css({'background-color':'red'});
					$('#venom').html("<p><a href='/snakes#"+snakeName+"'>"+snakeName+"</a></p><em>"+msg+"</em>");
				} 
				if (venom === 'undetermined')
				{	
					
					$('#undetermined').css({'display':'block'});
					$('#venom').text("Can't Identify");
					$('#undetermined').css({'color':'black'});
					$('.box').css({'background-color':'yellow'});
				}
				if (venom === 'false')
				{
					var msg = "Not venomous";
					$('#notvenom').css({'display':'block'});
					$('#notvenom').css({'background-color':'#aad339'});
					$('#notvenom').css({'color':'black'});
					$('#notvenom').html("<p><a href='/snakes#"+snakeName+"'>"+snakeName+"</a></p><em>"+msg+"</em>");
					$('.box').css({'background-color':'#aad339'});
					
				}
				var rndm = Math.random()
				var imgName = obj.img+'?'+rndm
				$('#snake').attr("src",imgName);
			})
		}
	};
  
	$( document ).ready(function(){
		console.log('doc ready');
		$('#picFile').on('change', fileUploader.uploadFile);
	});