# LightFox

LightFox is a responsive and flexible lightbox solution.

* [Bower Installation](#bower-installation)
* [Usage](#usage)
  * [Basic Usage (Pt. 1)](#basic-usage-pt-1)
  * [Basic Usage (Pt. 2)](#basic-usage-pt-2)
  * [Advanced Usage](#advanced-usage)


###### Bower Installation:
```
bower install lightfox
```


### Usage:

###### Basic Usage (Pt. 1)
```
var options = {
    bindTo: $('#some-element'), 
    bindOn: 'click', 
    url: 'http://www.some-url.com/lightfox', 
    data: data, 
    effect: LightBox.options.animation.slide.top 
  };
  
var lb = new LightBox(options);
```

###### Basic Usage (Pt. 2)
```
var options = {
    content: '<some>html</some>', // or $('#some-element').html()
    effect: LightBox.options.animation.slide.top 
  };
  
var lb = new LightBox(options);

lb.initLightbox();
```
###### Advanced Usage
```
	var lb = new LightBox({content: content, effect: LightBox.options.animation.slide.top});

	lb.didAppear = function() {
		LightBox.prototype.didAppear.call(this); //Call Super
		var that = this;
		var clickHandler = function() {
			LightBox.prototype.willDisappear.call(that);
			addAndHandle(); //Some previouslly defined function
		};
		//bind confirm-add btn
		$('#confirm-add').on('click', clickHandler);
	};

	lb.willDisappear = function() {
		LightBox.prototype.willDisappear.call(this); //Call Super
		//Unbind confirm-add
		$('#confirm-add').unbind('click');
	};

	lb.initLightbox();
```
