
# PhotoSwipe Handler

Default handler for PhotoSwipe.


## Installation

[Download a latest package](https://github.com/frontpack/releases) or use [Composer](http://getcomposer.org/):

```
composer require frontpack/photoswipe-handler
```

Include PhotoSwipe and `photoswipe-handler.js` file to HTML page.

```html
<link rel="stylesheet" href="/path/to/photoswipe/photoswipe.css">
<link rel="stylesheet" href="/path/to/photoswipe/default-skin/default-skin.css">

<script src="/path/to/photoswipe/photoswipe.min.js"></script>
<script src="/path/to/photoswipe/photoswipe-ui-default.min.js"></script>
<script src="/path/to/photoswipe-handler.js"></script>
```


## Usage

**Single photo**

```html
<a href="/path/to/original.jpg" class="photoswipe" data-size="<original size of image>">...</a>
<a href="/path/to/original.jpg" class="photoswipe" data-size="1024x768">...</a>
```


**Gallery**

```html
<a href="/path/to/original.jpg" class="photoswipe" data-size="<original size of image>" data-gallery="<gallery-id>">...</a>
<a href="/path/to/original.jpg" class="photoswipe" data-size="1024x768" data-gallery="my-gallery">...</a>
```

------------------------------

License: [New BSD License](license.md)
<br>Author: Jan Pecha, https://www.janpecha.cz/
