/**
 * @namespace WORKAREA.loginEvents
 */
WORKAREA.registerModule('loginEvents', (function () {
    'use strict';

    var userStateIsSet = function () {
            return !_.isEmpty(window.sessionStorage.getItem('segmentAnalyticsLoginState'));
        },

        setUserState = function (userData) {
            window.sessionStorage.setItem('segmentAnalyticsLoginState', userData.logged_in);
        },

        compare = function (userData) {
            if (userData.logged_in.toString() !== window.sessionStorage.getItem('segmentAnalyticsLoginState')) {
                if ( userData.logged_in ) {
                    WORKAREA.analytics.fireCallback('justLoggedIn');
                } else {
                    WORKAREA.analytics.fireCallback('justLoggedOut');
                }

                setUserState(userData);
            }
        },

        setupCallbacks = function () {
            if ( userStateIsSet() ) {
                WORKAREA.currentUser.gettingUserData.done(compare);
            } else {
                WORKAREA.currentUser.gettingUserData.done(setUserState);
            }
        },

        init = _.once(setupCallbacks);

    return {
        init: init
    };
}()));
