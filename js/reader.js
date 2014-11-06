//Reader
function Reader(options) {
	LightBox.call(this, options);
	
	this.background = '<div id="lb-bkg" class="dark"></div>';

	this.buildBox = function(){
		var box = this.background;
		box += '<div class="lb-float reader" id="'+this.lbID+'">';
		box += '<div id="lb-wrapper">';
		box += '<div id="lb-wrapper-inner" class="center">';
		box += '<div id="lb-frame">';
		box += '<div id="lb-close"><div>';
		box += 'close'; //Close button image or content goes here;
		box += '</div></div>';
		box += '<div id="lb-content">'+this.content+'</div>';
		box += '</div></div></div></div>';
		
		this.box = box;
	};
}

Reader.prototype = new LightBox();
Reader.prototype.constructor = Reader;
Reader.prototype.parent = LightBox.prototype;

