/**
 * Global Utilities
 */

var Util = (function() {

  return {
    /**
     * Throttle Util
     * Stoopid simple throttle util to control scroll events and so on.
     *
     * @param  {Function}  Function call to throttle.
     * @param  {int}       milliseconds to throttle  method
     * @return {Function}  Returns a throttled function
     */
    throttle: function(callback, ms) {
      var wait = false;
      return function () {
          if (!wait) {
              callback.call();
              wait = true;
              setTimeout(function () {
                  wait = false;
              }, ms);
          }
      };
    },
  };
 })();
