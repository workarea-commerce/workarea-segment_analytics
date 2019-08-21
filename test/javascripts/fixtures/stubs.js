//= require workarea/storefront/spec_helper
/*eslint no-unused-vars: 0 */

var gettingUserData = WORKAREA.currentUser.gettingUserData;

function stubSegmentMethods() {
    // This is an aweful idea, but since WORKAREA.currentUser.gettingUserData
    // is a promise, not a function it can't be stubbed with sinon.
    var userData = {
        "logged_in":true,
        "cart_quantity":0,
        "admin":true,
        "user_id":"59b2f28fc254291234daf27b",
        "checkout_id":"E2E1096C6A",
        "user_name":"Ben Crouse",
        "user_email":"user@workarea.com"
    };

    WORKAREA.currentUser.gettingUserData = $.Deferred().resolve(userData);

    sinon.stub(WORKAREA.segmentAnalytics, 'page', function(payload) {
        window.testData.push({
            eventType: 'page',
            data: payload
        });
    });

    sinon.stub(WORKAREA.segmentAnalytics, 'track', function(eventType, data) {
        window.testData.push({
            eventType: eventType,
            data: data
        });
    });

    sinon.stub(WORKAREA.segmentAnalytics, 'identify', function(userId, data) {
        window.testData.push({
            eventType: 'identify',
            userId: userId,
            data: data
        });
    });

    sinon.stub(WORKAREA.segmentAnalytics, 'reset', function() {
        window.testData.push({
            eventType: 'reset'
        });
    });
}

function resetStubs() {
    WORKAREA.segmentAnalytics.page.reset();
    WORKAREA.segmentAnalytics.track.reset();
    WORKAREA.segmentAnalytics.identify.reset();
    WORKAREA.segmentAnalytics.reset.reset();
    WORKAREA.currentUser.gettingUserData = gettingUserData;
}
