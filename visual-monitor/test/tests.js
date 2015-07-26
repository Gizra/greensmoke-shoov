'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'https://www.greensmoke.com';

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url(baseUrl)
      // Remove the not shipped notice
      .setCookie({name: 'notShippedNotice', value: 'yes'})
      // 18+ button.
      .click('.gsBtnRow .col-over18 a.btn-green')
      .webdrivercss(testName + '.homepage', {
        name: '1',
        exclude:
          [
            // The E-Cig Spotlight Blog.
            '.text-center img',
          ],
        remove:
          [
            // The E-Cig Spotlight Blog.
            '.text-center .caption',
            // Need a help
            '.fr_24557_59732',
            // Leave a feedback.
            '#qb-pfb-trigger',
            // Live chat.
            '.gs-chat',
          ],
        screenWidth: selectedCaps == 'chrome' ? [320, 640, 960, 1200] : undefined
      }, shoovWebdrivercss.processResults)
      .call(done);
  });

  it('should show the starter kits page',function(done) {
    client
      .url(baseUrl + '/electronic-cigarette-starter-kits/')
      // Wait for Need a help panel.
      .pause(2000)
      .webdrivercss(testName + '.starter-kits', {
        name: '1',
        exclude:
          [
            // Product img.
            '.cat-item img',
            // Product info.
            '.cat-item-title',
            '.cat-item-blurb',
            '.cat-item-price',
            '.cat-item-msrp',
            // compare chart table.
            '.compare_chart .cat-item-price',
          ],
        remove:
          [
            // 10% off link.
            '.bcx_outer',
            // Item rating.
            '.yotpo-stars',
            '.text-m',
            // Leave a feedback.
            '#qb-pfb-trigger',
            // Live chat.
            'div.gs-chat',
            // Text from comparison Chart table.
            'ul.clearfix li',
          ],
        screenWidth: selectedCaps == 'chrome' ? [320, 640, 960, 1200] : undefined
      }, shoovWebdrivercss.processResults)
      .call(done);
  });
});
