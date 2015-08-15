Lski-Modal
============

Creates a centered modal box without and pre-defined styling, beyond the most basic to get it to work. It is built as a standalone item and does NOT require any additional framworks such as jQuery.

## Installation

bower install https://github.com/lski/lski-modal.git --save

## Usage

#### Basic

To create a very basic modal box create the markup below and add any markup you want to show in the 'lski-modal-box'. 
By default this will show only a blank overlay on screen with nothing else. This leaves you the ability to add and style the content yourself.

```html
<div id="myModal" class="lski-modal">
	<div class="lski-overlay"></div>
	<div class="lski-modal-box">
		<!--Place any markup you want in here-->
	</div>
</div>
```

```js
lski.modal.show('#myModal');
lski.modal.hide('#myModal');
```

#### Fade in/out:

You can manipulate the code however you want, but there is a built in class to enable fade in and out of the overlay and contents. 
To use it simply add the class 'lski-modal-fade' as below.

```html
<div id="myModal" class="lski-modal lski-modal-fade">
	<div class="lski-overlay"></div>
	<div class="lski-modal-box">
		<!--Place any markup you want in here-->
	</div>
</div>
```

#### Close Modal

You can provide a way for a user to close a modal box. Simply add a 'data-modal-dismiss' attribute an element. 
Below shows how to allow the user to close the modal when they click on the overlay (away from the modal box) or if they click on 'close' inside the modal box.

```html
<div id="myModal" class="lski-modal lski-modal-fade">
	<div class="lski-overlay" data-modal-dismiss></div>
	<div class="lski-modal-box">
		<!--Place any markup you want in here-->
		<span data-modal-dismiss>Close</span>
	</div>
</div>
```

Alternatively you can simply attach an event and close the modal in code.

```js
lski.modal.hide('#myModal');
```


## Support

- IE9+ (IE8+ possible see below)
- Firefox
- Chrome
- Opera 7+
- Safari

#### IE8

Its very easy to add support for IE8 as well as IE9+. I have not added it by default to keep the size of the project down especially as support for IE8 is now much lower. There are two things you need to be aware of.

Required

lski-modal requires the following methods are present to enable dismissing the dialog `addEventListener`, `removeEventListener` and `dispatchEvent` that are not in IE8 natively. However there are several shims available to reproduce them, including this shim: [addEventListener-shim](https://gist.github.com/lski/39c59b03a60e31541cda) on GitHub, I have added shim for these three methods as well.

Optional

IE8 does not support CSS tranforms, which are used to centre where the modal box is when it is displayed. There are several possible solutions to this. Below are two ways of doing it, choose the one that best suits your circumstance.

__Note__: Its best to only apply these to IE8 browsers, a good techinque of this is [Paul Irish's](http://www.paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/) suggestion.

Add additional styles to the `lski-modal-box` class by setting a specific width and height and then use negative margins to reposition the box:

```css
.lski-modal-box {
	width:400px;
	height:300px;
	margin-top: -150px;
	margin-left: -200px;
	overflow:scroll;
}
```
OR

Add an additional div inside the `lski-modal-box` e.g. `lski-modal-content` and added the following extra styles:

```css
.lski-modal {
	display: table;
	display: table-cell;
    vertical-align: middle;
}

.lski-modal-box {
	display:table-cell;
	vertical-align: middle;
  	text-align:center;
}

.lski-modal-content {
	display:inline-block;
	text-align:left;
}
```