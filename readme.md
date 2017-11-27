# Sticky nav

A simple, pure js sticky nav element.

Adds an `is-sticky` element on scroll to attach a fixed element class.

# Init

Init like this:
```
/**
 * Let's Do this
 */
new StickyNav({
   target: '.js-sticky',
   offset: 235,
   throttle: 20,
});
```

## Required Styles

Since we're making our sticky element a fixed position element, the minimum required styles would include:

```
.sticky-nav.is-sticky {
  z-index: 9;
  position: fixed;
  width: 100%;
}
```
