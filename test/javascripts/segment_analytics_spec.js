//= require workarea/storefront/spec_helper

/*global
orderPayload productListPayload
stubSegmentMethods resetStubs
*/

(function () {
    'use strict';

    before(function(){
        window.testData = [];
    });

    function teardown() {
        window.testData = [];
    }

    afterEach(teardown);

    after(resetStubs);

    describe('WORKAREA.segmentAnalyticsAdapter', function () {
        stubSegmentMethods();

        describe.skip('categoryView', function () {
            beforeEach(function(){
                WORKAREA.analytics.fireCallback('categoryView',
                    {
                        "name" : "Games",
                        "sort" : "top_sellers",
                        "page" : 1,
                        "filters" : {}
                    }
                );
            });

            it('creates a page view event', function () {
                //This should be true if isTest worked
                expect(window.testData[0].eventType).to.eq('page');
            });

            it('adds the payload to segment', function () {
                expect(window.testData[1].data.name).to.eq('Games');
                expect(window.testData[1].data.sort).to.eq('top_sellers');
                expect(window.testData[1].data.page).to.eq(1);
            });
        });

        describe('justLoggedOut', function () {
            before(function(){
                WORKAREA.analytics.fireCallback('justLoggedOut');
            });

            it('fires the reset event', function () {
                //This should be true if isTest worked
                expect(window.testData[0].eventType).to.eq('reset');
            });
        });

        describe('productList', function () {
            before(function(){
                WORKAREA.analytics.fireCallback('productList', productListPayload());
            });

            it('tacks a Product List Viewed event in segment', function () {
                var payload = window.testData[0].data;
                expect(window.testData[0].eventType).to.eq('Product List Viewed');
                expect(payload.list_id).to.eq('Electronics');
                expect(payload.products.length).to.eq(20);
            });
        });

        describe('productClick', function () {
            before(function(){
                WORKAREA.analytics.fireCallback('productClick',
                    {
                        'category' : "Automotive",
                        'id' : "4AF99AB7C8",
                        'list' : "Movies & Shoes",
                        'name' : "Heavy Duty Iron Bag",
                        'position' : 0,
                        'price' : 19.77,
                        'sale' : false,
                        'sku' : "288457637-1"
                    }
                );
            });

            it('announces a product click event to segment', function () {
                var payload = window.testData[0].data;
                expect(window.testData[0].eventType).to.eq('Product Clicked');

                expect(payload.category).to.eq('Automotive');
                expect(payload.name).to.eq('Heavy Duty Iron Bag');
                expect(payload.position).to.eq(0);
                expect(payload.price).to.eq(19.77);
                expect(payload.product_id).to.eq('4AF99AB7C8');
                expect(payload.variant).to.eq('288457637-1');

                expect(window.testData[0].data.quantity).to.be.an('undefined');
            });
        });

        describe('searchResultsView', function () {
            before(function(){
                WORKAREA.analytics.fireCallback('searchResultsView',
                    {
                        "terms" : "query string",
                        "sort" : "relevance",
                        "page" : 1,
                    }
                );
            });

            it('tracks a Products Searched event in segment', function () {
                expect(window.testData[0].eventType).to.eq('Products Searched');
                expect(window.testData[0].data.query).to.eq('query string');
            });
        });

        describe.skip('productView', function () {
            before(function(){
                WORKAREA.analytics.fireCallback('productView',
                    {
                        'category' : 'Automotive',
                        'id' : '4AF99AB7C8',
                        'name' : 'Heavy Duty Iron Bag',
                        'price' : 80.76,
                        'quantity' : '1',
                        'sale' : false,
                        'sku' : '288457637-1'
                    }
                );
            });

            it('creates a page view event', function () {
                //This should be true if isTest worked
                expect(window.testData[0].eventType).to.eq('page');
            });

            it('announces the products details in the ecommerce event', function () {
                var product = window.testData[1].data;
                expect(product.name).to.eq('Heavy Duty Iron Bag');
                expect(product.product_id).to.eq('4AF99AB7C8');
                expect(product.price).to.eq(80.76);
                expect(product.category).to.eq('Automotive');
                expect(product.variant).to.eq('288457637-1');
            });
        });

        describe('addToCart', function () {
            before(function(){
                WORKAREA.analytics.fireCallback('addToCart',
                    {
                        'category' : 'Automotive',
                        'id' : '4AF99AB7C8',
                        'name' : 'Heavy Duty Iron Bag',
                        'price' : 80.76,
                        'quantity' : '1',
                        'sale' : false,
                        'sku' : '288457637-1'
                    }
                );
            });

            it('tracks the product added event in segment', function () {
                var product = window.testData[0].data;
                expect(window.testData[0].eventType).to.eq('Product Added');

                expect(product.category).to.eq('Automotive');
                expect(product.name).to.eq('Heavy Duty Iron Bag');
                expect(product.product_id).to.eq('4AF99AB7C8');
                expect(product.price).to.eq(80.76);
                expect(product.quantity).to.eq('1');
                expect(product.variant).to.eq('288457637-1');
            });
        });

        describe('removeFromCart', function () {
            before(function(){
                WORKAREA.analytics.fireCallback('removeFromCart',
                    {
                        'category' : 'Automotive',
                        'id' : '4AF99AB7C8',
                        'name' : 'Heavy Duty Iron Bag',
                        'price' : 80.76,
                        'quantity' : '1',
                        'sale' : false,
                        'sku' : '288457637-1'
                    }
                );
            });

            it('tracks the Product Removed event in segment', function () {
                var product = window.testData[0].data;
                expect(window.testData[0].eventType).to.eq('Product Removed');

                expect(product.category).to.eq('Automotive');
                expect(product.name).to.eq('Heavy Duty Iron Bag');
                expect(product.product_id).to.eq('4AF99AB7C8');
                expect(product.price).to.eq(80.76);
                expect(product.quantity).to.eq('1');
                expect(product.variant).to.eq('288457637-1');
            });
        });

        describe('cartView', function () {
            beforeEach(function(){
                WORKAREA.analytics.fireCallback('cartView', orderPayload());
            });

            it('tracks a Cart Viewed event in segment', function () {
                expect(window.testData[0].eventType).to.eq('Cart Viewed');
            });

            it('tracks a Checkout step 1 event in segment', function () {
                var payload = window.testData[1].data;
                expect(window.testData[1].eventType).to.eq('Viewed Checkout Step');
                expect(payload.step).to.eq(1);
            });
        });

        describe('checkoutAddressesView', function () {
            beforeEach(function(){
                WORKAREA.analytics.fireCallback('checkoutAddressesView', orderPayload());
            });

            it('tracks a Checkout Step Completed event in segment', function () {
                expect(window.testData[0].eventType).to.eq('Checkout Step Completed');
                expect(window.testData[0].data.step).to.eq(1);
            });

            it('tracks step 2 of checkout in segment', function () {
                expect(window.testData[1].eventType).to.eq('Checkout Step Viewed');
                expect(window.testData[1].data.step).to.eq(2);
            });
        });

        describe('checkoutShippingView', function () {
            beforeEach(function(){
                WORKAREA.analytics.fireCallback('checkoutShippingView', orderPayload());
            });

            it('tracks Checkout Step 2 Completed event in segment', function () {
                expect(window.testData[0].eventType).to.eq('Checkout Step Completed');
                expect(window.testData[0].data.step).to.eq(2);
            });

            it('announces step 3 of checkout in segment', function () {
            expect(window.testData[1].eventType).to.eq('Checkout Step Viewed');
            expect(window.testData[1].data.step).to.eq(3);
            });
        });

        describe('checkoutPaymentView', function() {
            beforeEach(function(){
                WORKAREA.analytics.fireCallback('checkoutPaymentView',orderPayload());
            });

            it('tracks Checkout Step 3 Completed event in segment', function () {
                expect(window.testData[0].eventType).to.eq('Checkout Step Completed');
                expect(window.testData[0].data.step).to.eq(3);
            });

            it('announces step 4 of checkout in segment', function () {
                expect(window.testData[1].eventType).to.eq('Checkout Step Viewed');
                expect(window.testData[1].data.step).to.eq(4);
            });
        });

        describe('checkoutPaymentSelected', function () {
            before(function(){
                WORKAREA.analytics.fireCallback('checkoutPaymentSelected',
                    {
                        "type" : "new_card"
                    }
                );
            });

            it('announces a Payment Info Entered event in segment', function () {
                expect(window.testData[0].eventType).to.eq('Payment Info Entered');
                expect(window.testData[0].data.step).to.eq(4);
            });
        });

        describe('checkoutOrderPlaced', function () {
            beforeEach(function(){
                WORKAREA.analytics.fireCallback('checkoutOrderPlaced', orderPayload());
            });

            it('tracks Checkout Step 4 Completed event in segment', function () {
                expect(window.testData[0].eventType).to.eq('Checkout Step Completed');
                expect(window.testData[0].data.step).to.eq(4);
            });

            it('tracks Order Completed event in segment', function() {
                var payload = window.testData[1].data;
                expect(window.testData[1].eventType).to.eq('Order Completed');

                expect(payload.affiliation).to.eq('Dummy App');
                expect(payload.checkout_id).to.eq('6705E78231');
                expect(payload.discount).to.eq('promo_1,promo_2');
                expect(payload.payment_method).to.eq('Visa');
                expect(payload.revenue).to.eq(152.92);
                expect(payload.shipping).to.eq(7.00);
                expect(payload.tax).to.eq(1.00);
            });
        });
    });
}());
