// Teaspoon includes some support files, but you can use anything from your own support path too.
// require support/expect
//= require support/sinon
//= require support/chai
//= require support/sinon-chai
//= require fixtures/stubs
//= require fixtures/payloads

window.expect = chai.expect;

document.documentElement.className =
    document.documentElement.className + ' js';
