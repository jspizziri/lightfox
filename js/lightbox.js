/***************************
 *       LightBox
 ***************************/

/**
 * USAGE:
 * 
 *  The SRC lightbox is bound to a an arbitrary HTML element
 *  And bound on a standard jQuery event, as specified by the 'bindOn'
 *  parameter.
 *   *  ...Boom
 * 
 * @author Jacob Spizziri <jacob.spizziri@gmail.com>
 * 
 * @param jQuery $bindTo
 * @param String bindOn
 * @param String url
 * @param Lightbox.option effect
 * @returns {LightBox}
 */
function LightBox(options) {
	
	var animationTime = 500;
	var bkg;
	var lb;
	var that = this;
	
	this.box = "";
	this.content = 'Loading...';
	this.background = '<div id="lb-bkg"></div>';
	this.isAnimating = false;
	this.openAnimation = null;
	this.closeAnimation = null;
	this.lbID = 'lb'+LightBox.id;
	LightBox.id++;
	
	
	this.buildBox = function(){
		var box = this.background;
		box += '<div class="lb-float" id="'+this.lbID+'">';
		box += '<div id="lb-wrapper">';
		box += '<div id="lb-wrapper-inner" class="center-content">';
		box += '<div id="lb-frame">';
		box += '<div id="lb-close"><div>';
		box += 'close'; //Close button image or content goes here;
		box += '</div></div>';
		box += '<div id="lb-content">'+this.content+'</div>';
		box += '</div></div></div></div>';
		
		this.box = box;
	};
	
	if(options){
		/**
		 * Bind and Execute
		 * This is where the Magic Happens Baby
		 */
		$(options.bindTo).on(options.bindOn, function(e){
			//preventDefault doesn't work in IE8
			if(e.preventDefault)
				e.preventDefault();

			that.willAppear();

			//preventDefault doesn't work in IE8
			return false;
		});

		if(options.url) {
				//Load in the url	
				$.ajax({
					type: "GET", 
					url: options.url,
					data: options.data,
					success: function(data){
						that.content = data;
						var $c = $('#'+that.lbID+' #lb-content');

						//Reload the content if the box is onscreen
						if($c.length !== 0)
							$c.html(that.content);

						if(options.onLoad && typeof options.onLoad === 'function')
							options.onLoad();
					},
					error: function(xhr, status, error){
						if(console)
							console.log(status);
					},
					dataType: "html"
				});
		} else if(options.url === undefined && options.content === undefined) {
			this.content = $(options.contentID).html();
			$(options.contentID).remove();
		} else if (options.content !== undefined) {
			this.content = options.content;
		}
	}
	
	this.getId = function (){
		return 'div#'+this.lbID;
	};
	
	this.initLightbox = function() {
		//Build the box Empty at first
		this.buildBox();
		
		//Lock body
		$('body').css('overflow','hidden');
		
		that.appendLightbox();
		bkg = $('div#lb-bkg');
		lb = $(that.getId());

		//Bind Close Event
		$(document).on('click', 'div#lb-close div', function() {
			that.willDisappear();
		});
		
		that.animateLightbox(true);
	};
	
	//Add lb offscreen to the DOM without animating
	this.appendLightbox = function(){
		if($(that.getId()).length === 0)
			$(this.box).hide().appendTo('body');
	};

	//Update the onscreen content of the lb
	this.updateContent = function(c){
		this.content = c;
		if($(that.getId()) === undefined) {
			$(that.getId()+ ' #lb-content').html(this.content);
		}
	};

	this.exitLightbox = function() {
		$(document).unbind('div#lb-close div');
		lb.remove();
		$('body').css('overflow','');
	};
	
//	Do not reload forms in lightbox
//	/**
//	 * Form Binding
//	 */
//	
//	this.bindInternalForms = function(){
//		var $forms = $('#'+this.lbID+' form');
//		$forms.each(function(index, element){
//			$(element).on('submit', function(e){
//				
//				//preventDefault doesn't work in IE8
//				if(e.preventDefault)
//					e.preventDefault();
//				
//				var $this = $(this);
//				var target = '#'+$this.parent().attr('id');
//				var url = $this.attr('action');
//				var data = $this.serialize();
//				data += '&part=true';
//				serverCalls.reloadTarget(target, url, data, null, that.unbindInternalForms, that.bindInternalForms);
//				
//				//preventDefault doesn't work in IE8
//				return false;
//			});
//		});
//	};
//	
//	this.unbindInternalForms = function(){
//		var $forms = $('#'+this.lbID+' form');
//		$forms.unbind('submit');
//	};

	/**
	 * Animation Controller
	 */
	this.animateLightbox = function(animateIn) {
		isAnimating = true;
		var animation;

		if (animateIn) {
			animation = that.openAnimation ? that.openAnimation : options.effect;
			bkg.fadeIn(animationTime);
		}
		else {
			animation = that.closeAnimation ? that.closeAnimation : options.effect;
			bkg.fadeOut(animationTime, function() {
				bkg.remove();
			});
		}

		switch (animation) {
			case LightBox.options.animation.slide.top:
				animateSlideTop(animateIn);
				break;

			case LightBox.options.animation.slide.bottom:
				animateSlideBottom(animateIn);
				break;

			case LightBox.options.animation.slide.left:
				animateSlideLeft(animateIn);
				break;

			case LightBox.options.animation.slide.right:
				animateSlideRight(animateIn);
				break;

			case LightBox.options.animation.grow:
				animateGrow(animateIn);
				break;

			case LightBox.options.animation.standard:
				animateDefault(animateIn);
				break;
				
			default:
				animateDefault(animateIn);
				break;
		}
	};


	/**
	 * Animation Effects
	 */

	var animateSlideTop = function(isIn) {
		if (isIn) {
			lb.css({top: "-100%"}).show();
			lb.animate({top: "0"}, animationTime, "swing", function() {
				that.didAppear();
			});
		} else {
			lb.animate({top: "-100%"}, animationTime, "swing", function() {
				that.didDisappear();
			});
		}
	};

	var animateSlideBottom = function(isIn) {
		if (isIn) {
			lb.css({top: "200%"}).show();
			lb.animate({top: "0"}, animationTime, "swing", function() {
				that.didAppear();
			});
		} else {
			lb.animate({top: "200%"}, animationTime, "swing", function() {
				that.didDisappear();
			});
		}
	};

	var animateSlideLeft = function(isIn) {
		if (isIn) {
			lb.css({left: "-100%"}).show();
			lb.animate({left: "0"}, animationTime, "swing", function() {
				that.didAppear();
			});
		} else {
			lb.animate({left: "-100%"}, animationTime, "swing", function() {
				that.didDisappear();
			});
		}
	};

	var animateSlideRight = function(isIn) {
		if (isIn) {
			lb.css({right: "200%"}).show();
			lb.animate({right: "0"}, animationTime, "swing", function() {
				that.didAppear();
			});
		} else {
			lb.animate({right: "200%"}, animationTime, "swing", function() {
				that.didDisappear();
			});
		}
	}

	var animateGrow = function(isIn) {
		//TODO: Add Grow Animation
		animateDefault(isIn);
	};

	var animateDefault = function(isIn) {
		if (isIn) {
			lb.fadeIn(animationTime, function() {
				that.didAppear();
			});
		} else {
			$(that.getId()).fadeOut(animationTime, function() {
				$(that.getId()).remove();
				that.didDisappear();
			});
			$('div#lb-bkg').fadeOut(animationTime, function() {
				$('div#lb-bkg').remove();
			});
		}
	};
}


LightBox.prototype.willAppear = function() {
	this.isAnimating = true;
	this.initLightbox();
	var that = this;
	
	//Bind off-click close
	$('#lb-wrapper').on('click', function(e){ 
    if(e.target.id === 'lb-wrapper-inner') {
			that.willDisappear();
    }
	}); 
	
};
LightBox.prototype.didAppear = function() {
	this.isAnimating = false;
	if($.placeholder && typeof $.placeholder.shim === 'function')
		$.placeholder.shim();
	//this.bindInternalForms();
};
LightBox.prototype.willDisappear = function() {
	this.isAnimating = true;
	//this.unbindInternalForms();
	//Unbind off-click
	$('#lb-wrapper').off();
	this.animateLightbox(false);
};
LightBox.prototype.didDisappear = function() {
	this.exitLightbox();
	this.isAnimating = false;
};



/**********************
 * LIGHTBOX ANIMATE OPTIONS
 **********************/
LightBox.options = {
		animation: {
			standard: 100,
			slide: {
				top: 101,
				bottom: 102,
				left: 103,
				right: 104
			},
			grow: 105
		},
		close: {
			standard: 200
		}
	};
	
	
/***********************
 *   Lightbox ID
 ***********************/
LightBox.id = 0;