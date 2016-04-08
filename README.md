Lski-Modal
============

Creates a centered modal box without and pre-defined styling, beyond the most basic to get it to work. It is built as a standalone item and does NOT require any additional framworks.

## Installation

You can either download the dist/lski-modal.js and dist/lski-modal.css files directly or you can use a package manager.

```
npm install github:lski/lski-modal --save
// or
bower install https://github.com/lski/lski-modal.git --save
```

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

Alternatively you can close the modal in code.

```js
lski.modal.hide('#myModal');
```

## Events 

There are two events fired against the modal element that also bubble so can be caught using event listeners. This is especially useful for when a user dismisses a modal via the `data-modal-dismiss` attribute.

The two events are `lski-modal-opened` and `lski-modal-closed` and are fired after their respected processes. `lski-modal-closed` is especially useful for cleaning up resources.

```html
<div id="myModal" class="lski-modal lski-modal-fade">
	<div class="lski-overlay"></div>
	<div class="lski-modal-box">
		<!--Place any markup you want in here-->
	</div>
</div>
```

```javscript
var element = document.getElementById('myModal');

element.addEventListener('lski-modal-closed', function() {
	console.log('modal closed');
});
```

## Support

- IE9+ (IE8+ possible see below)
- Firefox
- Chrome
- Opera 7+
- Safari

### IE8 and Older Browsers

Its easy to add support for IE8, it just requires adding some polyfills and being aware of the browsers limitations. 

I have not included workarounds into code by default as IE8 is only used in a few markets now, so I decided to keep a smaller footprint and test against polyfills instead.

There are simply two things you need to implement to get it to work. First implement EventListeners via a shim and second handle the centralised location of the modal dialog.

#### EventListeners

The dialog uses `addEventListener`, `removeEventListener` and `dispatchEvent` that are not in IE8 natively. There are several shims available to implement them, including one I have included on github: [addEventListener-with-dispatch](https://github.com/lski/addeventlistener-with-dispatch) and is also available on bower and npm too.

```
bower install addeventlistener-with-dispatch
npm i addeventlistener-with-dispatch
```

#### Centralised Modal Box

The modal box is centralised via CSS transforms, which are not available in IE8, below are two solutions pick one which suits your needs best. __Note__: Its best to only apply these to ONLY IE8 browsers, a great techinque of this is [Paul Irish's](http://www.paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/) suggestion.

##### Option 1:

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
##### Option 2:

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