
;(function(
	window
) {

	'use strict';

	var FrontpackPhotoSwipe = {};

	FrontpackPhotoSwipe._photoSwipeElement = null;
	FrontpackPhotoSwipe._currentPhotoSwipe = null;


	FrontpackPhotoSwipe.handleClick = function (event) {
		var target = event.target;

		do {
			if (target.tagName.toLowerCase() === 'a') {
				if (target.classList.contains('photoswipe') && FrontpackPhotoSwipe.openInPhotoSwipe(target)) { // if success, we stop event propagation
					event.preventDefault();
					event.stopPropagation();
				}

				return;

			} else {
				target = target.parentNode;
			}

		} while (target && (typeof target.tagName === 'string'));
	};


	FrontpackPhotoSwipe.openInPhotoSwipe = function (anchor) {
		if (this._photoSwipeElement === null) {
			FrontpackPhotoSwipe._photoSwipeElement = FrontpackPhotoSwipe._createPhotoSwipeElements();
		}

		if (this._currentPhotoSwipe !== null) {
			this._currentPhotoSwipe.close();
			this._currentPhotoSwipe = null;
		}

		var options = {
			shareEl: false
		};
		var items = [];
		var item;

		if (anchor.hasAttribute('data-gallery')) {
			var anchors = document.querySelectorAll('a[data-gallery="' + anchor.getAttribute('data-gallery') + '"]');
			var addToItems = false;
			var anchorUrl = anchor.getAttribute('href');
			var j;

			for (var i = 0; i < anchors.length; i++) {
				item = this._createPhotoSwipeItem(anchors[i]);

				if (item !== null) {
					addToItems = true;

					for (j = 0; j < items.length; j++) {
						if (items[j].src === item.src) {
							addToItems = false;
							break;
						}
					}

					if (addToItems) {
						if (anchorUrl === item.src) {
							options.index = items.length;
						}
						items.push(item);
					}
				}
			}

		} else {
			item = this._createPhotoSwipeItem(anchor);

			if (item !== null) {
				items.push(item);
			}
		}

		if (!items.length) {
			return false;
		}

		this._currentPhotoSwipe = new PhotoSwipe(this._photoSwipeElement, PhotoSwipeUI_Default, items, options);
		this._currentPhotoSwipe.init();
		return true;
	};


	FrontpackPhotoSwipe._createPhotoSwipeItem = function (anchor) {
		if (!anchor.hasAttribute('data-size')) {
			console.log('Missing attribute data-size for PhotoSwipe.');
			return null;
		}

		var size = anchor.getAttribute('data-size').split('x');

		return {
			src: anchor.getAttribute('href'),
			w: parseInt(size[0], 10),
			h: parseInt(size[1], 10)
		};
	};


	FrontpackPhotoSwipe._createPhotoSwipeElements = function () {
		if (this._photoSwipeElement !== null) {
			return;
		}

		var pswp = document.createElement('div');
		pswp.setAttribute('class', 'pswp');
		pswp.setAttribute('tabindex', '-1');
		pswp.setAttribute('role', 'dialog');
		pswp.setAttribute('aria-hidden', 'true');
		pswp.innerHTML = '<div class="pswp__bg"></div>' +
			'<div class="pswp__scroll-wrap">' +
				'<div class="pswp__container">' +
					'<div class="pswp__item"></div>' +
					'<div class="pswp__item"></div>' +
					'<div class="pswp__item"></div>' +
				'</div>' +

				'<div class="pswp__ui pswp__ui--hidden">' +
					'<div class="pswp__top-bar">' +
						'<div class="pswp__counter"></div>' +
						'<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>' +
						'<button class="pswp__button pswp__button--share" title="Share"></button>' +
						'<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>' +
						'<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>' +
						'<div class="pswp__preloader">' +
							'<div class="pswp__preloader__icn">' +
							  '<div class="pswp__preloader__cut">' +
								'<div class="pswp__preloader__donut"></div>' +
							  '</div>' +
							'</div>' +
						'</div>' +
					'</div>' +

					'<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">' +
						'<div class="pswp__share-tooltip"></div>' +
					'</div>' +

					'<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>' +
					'<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>' +

					'<div class="pswp__caption">' +
						'<div class="pswp__caption__center"></div>' +
					'</div>' +
				'</div>' +
			'</div>';

		document.body.appendChild(pswp);
		return pswp;
	};


	/**
	 * Add to global namespace
	 */
	window.FrontpackPhotoSwipe = FrontpackPhotoSwipe;

})(
	window
);

document.addEventListener('click', function (event) {
	FrontpackPhotoSwipe.handleClick(event);
}, false);
