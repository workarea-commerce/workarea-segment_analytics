/**
 * @namespace WORKAREA.segmentAnalytics
 */
WORKAREA.registerModule('segmentAnalytics', (function () {
    'use strict';
    /*global analytics*/

    var logger = function () {
            if (WORKAREA.analytics.debug && window.console) {
                window.console.log('SegmentAnalytics: ', Array.prototype.slice.call(arguments));
            }
        },

        track = function (eventType, data) {
            analytics.track(eventType, data);
            logger('Track', eventType, data);
        },

        reset = function () {
            analytics.reset();
            logger('Reset');
        },

        identify = function (userId, data) {
            analytics.identify(userId, data);
            logger('Identify', userId, data);
        },

        page = function (payload) {
            if (_.isUndefined(payload)) {
                analytics.page();
            } else if (payload.category) {
                analytics.page(payload.category, payload.name);
            } else {
                analytics.page(payload.name);
            }

            logger('Page', payload);
        };

  return {
      track: track,
      page: page,
      reset: reset,
      identify: identify
  };
}()));
