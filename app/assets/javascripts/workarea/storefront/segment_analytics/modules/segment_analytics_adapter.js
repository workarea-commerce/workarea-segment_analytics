/**
 * @namespace WORKAREA.segmentAnalytics
 * @requires WORKAREA.currentUser
 *
 *    1. userData.checkout_id and order.id are the same number from
 *       different sources.  interchangable with cart_id in workarea
 *
 *    2.  analytics_helper refers to these differently depending on whether
 *        order_item_analytics_data or product_analytics_data is used.
 */
WORKAREA.analytics.registerAdapter('segmentAnalyticsAdapter', function () {
    'use strict';

    var pageViewSent = false,

        /**
         *  PageView event functions
         */

        isLoaded = function () {
            var scripts = _.toArray(document.scripts),

            loaded = _.some(scripts, function (script) {
                return script.src.match(/segment\.com.+analytics.+\.js/i);
            });

            return loaded;
        },

        tryPageView = function (payload) {
            if (pageViewSent) { return; }

            if (isLoaded()) {
                WORKAREA.segmentAnalytics.page(payload);
                pageViewSent = true;
            } else {
                window.setTimeout(tryPageView(payload), 500);
            }
        },

        /**
         *  Data manipulation functions
         */

        productData = function(product) {
            var data = {
                category: product.category,
                name: product.name || product.product_name, /* [2] */
                position: product.position,
                price: product.price,
                product_id: product.product_id || product.id, /* [2] */
                quantity: product.quantity,
                variant: product.sku
            };

            return _.omit(data, _.isEmpty);
        },

        joinPromoCodes = function(promo_codes) {
            if (Array.isArray(promo_codes)){
                return promo_codes.join(',');
            }
            return promo_codes;
        },

        orderData = function (order) {
            var data = {
                affiliation: order.site_name,
                checkout_id: order.id, /* [1] */
                discount: joinPromoCodes(order.promo_codes),
                payment_method: order.tenders,
                revenue: order.total_price,
                shipping: order.shipping_total,
                tax: order.tax_total
            };


            if ( !_.isEmpty(order.items) ) {  /* [2] */
                data.products = _.map(order.items, productData);
            } else if ( !_.isEmpty(order.products) ) {  /* [2] */
                data.products = _.map(order.products, productData);
            }

            return _.omit(data, _.isEmpty);
        };

    return {
        'pageView': tryPageView,

        'categoryView': function (payload) {
            // Send pageview with additional payload data
            tryPageView({
                category: payload.name
            });

            WORKAREA.segmentAnalytics.track('Product Category Viewed', {
                filters: payload.filters,
                name: payload.name,
                page: payload.page,
                sort: payload.sort
            });
        },

        'searchResultsView': function (payload) {
            WORKAREA.segmentAnalytics.track('Products Searched', {
                query: payload.terms
            });
        },

        'productList': function (payload) {
            var data = {
                list_id: payload.name,
                products: _.map(payload.impressions, productData)
            };

            WORKAREA.segmentAnalytics.track('Product List Viewed', data);
        },

        'productClick': function (payload) {
            WORKAREA.segmentAnalytics.track('Product Clicked', productData(payload));
        },

        'productView': function (payload) {
            // Send pageview with additional payload data
            tryPageView({
                category: payload.category
            });

            WORKAREA.segmentAnalytics.track('Product Viewed', productData(payload));
        },

        'addToCart': function (payload) {
            WORKAREA.currentUser.gettingUserData.done(function(userData){
                var data = {
                    cart_id: userData.checkout_id /* [1] */
                };

                _.assign(data, productData(payload));

                WORKAREA.segmentAnalytics.track('Product Added', data);
            });
        },

        'removeFromCart': function (payload) {
            WORKAREA.currentUser.gettingUserData.done(function(userData){
                var data = {
                    cart_id: userData.checkout_id /* [1] */
                };

                _.assign(data, productData(payload));

                WORKAREA.segmentAnalytics.track('Product Removed', data);
            });
        },

        'cartView': function (payload) {
            WORKAREA.currentUser.gettingUserData.done(function(userData){
                var data = {
                    cart_id: userData.checkout_id, /* [1] */
                    products: _.map(payload.items, productData)
                };

                WORKAREA.segmentAnalytics.track('Cart Viewed', data);
                WORKAREA.segmentAnalytics.track('Viewed Checkout Step', _.assign({ step: 1 }, data));
            });
        },

        'checkoutStarted': function (payload) {
            var data = orderData(payload);

            WORKAREA.segmentAnalytics.track('Checkout Started', data);
        },

        'checkoutAddressesView': function (payload) {
            var data = orderData(payload);

            WORKAREA.segmentAnalytics.track('Checkout Step Completed', _.assign({ step: 1 }, data));
            WORKAREA.segmentAnalytics.track('Checkout Step Viewed', _.assign({ step: 2 }, data));
        },

        'checkoutShippingView': function (payload) {
            var data = orderData(payload);

            WORKAREA.segmentAnalytics.track('Checkout Step Completed', _.assign({ step: 2 }, data));
            WORKAREA.segmentAnalytics.track('Checkout Step Viewed', _.assign({ step: 3 }, data));
        },

        'checkoutPaymentView': function (payload) {
            var data = orderData(payload);

            WORKAREA.segmentAnalytics.track('Checkout Step Completed', _.assign({ step: 3 }, data));
            WORKAREA.segmentAnalytics.track('Checkout Step Viewed', _.assign({ step: 4 }, data));
        },

        'checkoutPaymentSelected': function (payload) {
            var data = orderData(payload);

            WORKAREA.segmentAnalytics.track('Payment Info Entered', _.assign({ step: 4 }, data));
        },

        'checkoutOrderPlaced': function (payload) {
            var data = orderData(payload);

            WORKAREA.segmentAnalytics.track('Checkout Step Completed', _.assign({ step: 4 }, data));
            WORKAREA.segmentAnalytics.track('Order Completed', data);
        },

        'justLoggedOut': function () {
            WORKAREA.segmentAnalytics.reset();
        },

        'justLoggedIn': function () {
            WORKAREA.currentUser.gettingUserData.done(function (userData){
                var data = {
                    email: userData.user_email,
                    name: userData.user_name
                };

                WORKAREA.segmentAnalytics.identify(userData.user_id, data);
            });
        },

        'share': function (payload) {
            var data = {
                recipient: payload.recipient,
                share_via: payload.type,
                share_message: payload.message
            };

            _.assign(data, productData(payload));

            WORKAREA.segmentAnalytics.track('Product Shared', data);
        }
    };
});
