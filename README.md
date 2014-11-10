# LightFox

LightFox is a responsive and flexible lightbox solution.

* [Bower Installation](#bower-installation)
* [Usage](#usage)
  * [Basic Usage (Pt. 1)](#basic-usage-pt-1)
  * [Basic Usage (Pt. 2)](#basic-usage-pt-2)
  * [Advanced Usage](#advanced-usage)


### Bower Installation:
Install lightfox with bower via the following

```
bower install lightfox
```


### Usage:
Some basic examples of ways in which lightfox can be invoked.



###### Basic Usage (Pt. 1)
Bind to a DOM element on click, asynchronously load the lightbox content via a REST call.

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
Manually specify the content of the lightbox and manually initialize it.

```
var options = {
    content: '<some>html</some>', // or $('#some-element').html()
    effect: LightBox.options.animation.slide.top 
  };
  
var lb = new LightBox(options);

lb.initLightbox();
```



###### Advanced Usage

You can customize each phase of execution via the exposed methods.

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
