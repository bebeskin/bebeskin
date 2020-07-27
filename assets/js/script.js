

$(document).ready(function(){

	/* 헤더, 푸터 로드 */
	$("#header").load("/header_include.html");
	$("#footer").load("/footer_include.html");

	/* 메인 배너 */
	if( $("#wrap.main").length > 0 ){
		$(".main-banner-content .banner-area").slick({
			dots: true,
			arrows : false,
			autoplay: false,
			autoplaySpeed: 3000
		});
		$(".main-banner-content").on("click" , ".play-btn" , function(){				
			$(".main-banner-content .banner-area").slick("slickPlay");
		});

		var doit = true;
		$(window).on("resize.mainBanner" , function(){
			if( !doit ){ return }
			doit = false;
			var window_width = $(window).width();	
			
			if(window_width > 768){
				$(".main-banner-content .banner img").each(function(){
					$(this).prop("src" , $(this).data("pc"));
				});
			}else{
				$(".main-banner-content .banner img").each(function(){
					$(this).prop("src" , $(this).data("mobile"));					
				});
			}				
			setTimeout(function(){
				doit = true;
				$(".main-banner-content .banner-area").slick("refresh");
				$(".main-banner-content .slick-dots").append("<li class='play-btn'></li>");
			},500);
		});
		$(window).trigger("resize.mainBanner");

		/* 메인 이벤트 배너 */
		$(".event-banner-area").slick({
			dots: true,
			arrows : false
		});

		/* 메인 상영시간표 높이정렬 */
		$(".today-time-content li .txt").each(function( index ){			
			if( index == 0 ){ return; }
			var txt_line_height = Number( $(this).css("line-height").replace("px" , "") );
			var txt_height =  Number( $(this).css("height").replace("px" , "") );

			if( (txt_height/txt_line_height) == 2 ){
				$(this).css("margin-top" , "32px");
			}else if( (txt_height/txt_line_height) == 1 ){
				$(this).css("margin-top" , "40px");
			}			
		});
	}	
	
	/* 스케줄 배너 */
	if( $('.day-select-banner').length > 0 ){
		$('.day-select-banner').slick({
			dots: false,
			arrows : true,
			infinite: false,
			slidesToShow: 7,
			slidesToScroll: 1,
			responsive: [
				{
					breakpoint: 769,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
					}
				}
			]
		});
		$(window).on("resize.daySelect" , function(){
			var window_width = $(window).width();			
			if(window_width > 768){			
				moveDayCenter("pc");
			}else{			
				moveDayCenter("mobile");
			}
		});
		$(window).trigger("resize.daySelect");

		function moveDayCenter( txt ){		
			var minus_num;
			if( txt == "pc" ){
				minus_num = 3;
			}else if( txt == "mobile" ){
				minus_num = 1;
			}
			var active_banner_num = $('.day-select-banner .banner.on').index() - minus_num;
			$('.day-select-banner').slick('slickGoTo',active_banner_num,true);		
		}
	}

	/* 모바일 메뉴 열기 */
	$("#header").on("click" ,".mobile-menu-btn", function(){
		$("#header .gnb").toggleClass("on");		
	});
	
});