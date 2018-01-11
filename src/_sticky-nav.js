/**
 * Sticky Nav Element
 */
var StickyNav = function (options) {
  if (!this || !(this instanceof StickyNav)) {
    return new StickyNav(options);
  }

  if (!options) {
    options = {};
  }

  this.targetEl = options.targetEl;
  this.offset = options.offset;
  this.throttle = options.throttle;
  this.ACTIVE_CLASS = options.activeClass;

  this.el  = document.querySelector(options.targetEl);
  this.position = this.el.offsetTop;

  if (document.querySelector(this.targetEl)) {
    this.init();
  }
};

StickyNav.prototype = {

  /**
   * Init
   */
  init: function() {
    this.bindEvents();

  },
  /**
   * Bind events
   * Handles our primary load and scroll Events
   * @see js/components/_utils for throttle utility
   */
  bindEvents: function () {

    window.addEventListener('load', function () {
      var elHeight = this.getHeight(this.el);
      this.addHeight(this.el, elHeight);

    }.bind(this), false);

    window.addEventListener('scroll', Util.throttle(function() {
      this.sticker(this.el);
    }.bind(this), this.throttle), false);
  },


  /**
   * Apply/remove is-sticky
   */
  sticker: function (el) {

    var isStuck = this.setSticky();

    if (isStuck) {
      el.classList.add(this.ACTIVE_CLASS);
    } else {
      el.classList.remove(this.ACTIVE_CLASS);
    }
  },

  /**
   * Set Sticky Position
   */
  setSticky: function() {
   return this.position <= window.scrollY + this.offset;
  },


  /**
   * Get El's height
   */
  getHeight: function(el) {
    return el.clientHeight;
  },

  /**
   * Helper to Apply height to El
   */
  addHeight: function(el, elHeight) {
    el.parentNode.style.height = elHeight + 'px';
  },
};

/**
 * Let's Do this
 */
new StickyNav({
   targetEl: '.js-sticky-nav',
   activeClass: 'is-sticky',
   offset: 105,
   throttle: 20,
});
