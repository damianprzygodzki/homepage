$(document).ready(function(){

	$(".nav a").on("click", function(){
		var val = this.id;
		ga('send', 'event', 'nav', 'click', val);
	});

	$(".social a").on("click", function(){
		var val = $(this).attr("name");
		ga('send', 'event', 'nav', 'click', val);
	});

	$(".jazzy-innovations").on("click", function(){
		ga('send', 'event', 'link', 'click', "jazzy");
	});
	
	glitterFadeIn($(".glitter-fade-in"));

	$(".glitter-fade-in-on-hover").on("mouseenter", function(){
		var val = $(this).text();
		ga('send', 'event', 'glitter', 'mouseenter', val);

		glitterFadeIn($(this));
	});

	$(".nav a").on("click", function(){
		scrollTo($("section#"+$(this).attr("id")+"-screen"));

	});

	$(window).on("scroll", function(){
		scrollHandler();
	});
});


function scrollTo(target){
	var body = $("html, body");
	var targetOffset = 0;

	if(target != null) {
		var targetOffset = target.offset().top;
		body.animate({scrollTop:targetOffset}, 1200);
	}
}

function scrollHandler(event) {
    var offset = $(document).scrollTop();
    var height = $(document).height();
    var progress = offset/height * 100;

    $(".bar").css({"left": progress+"%"});

    var whiteSectionHeight = $("section#skills-screen").height();
    var whiteSectionOffset = $("section#skills-screen").offset().top;
    var navHeight = parseInt($(".nav").height(),2);
    var navTop = $(".nav").offset().top;

    var parseOffset = navTop + navHeight/2 + 10;

    if(parseOffset > whiteSectionOffset && parseOffset < whiteSectionOffset+whiteSectionHeight){
    	$(".nav").addClass("negative");
    }else{
    	$(".nav").removeClass("negative");
    }
}

function glitterFadeInAnimation(target){
	$("span", target).each(function(){
		var item = $(this);
		var random = 300 + Math.floor(Math.random() * 500);
		setTimeout(function(){
			 item.stop(false, true).animate({"opacity": 1}, 1600,"easeInOutBounce");
		}, random);
	});
}

function glitterFadeIn(target) {
	target.each(function(){
		if($("span", this).length == 0){
			var text = $(this).html();
			var array = text.split("");
			var ret = "";

			for (var i = 0; i < array.length; i++) {
				ret += '<span class="' + array[i] + '">' + array[i] + '</span>';
			}
			$(this).html(ret);

			glitterFadeInAnimation(this);
		}else{
			$("span", this).each(function(){
				var item = $(this);
				var random = Math.floor(Math.random() * 300);
				setTimeout(function(){
					 item.stop(false,true).animate({"opacity": 0}, 300);
				}, random);
			});

			glitterFadeInAnimation(this);
		}
		
		
	});
}
