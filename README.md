Workarea Segment Analytics
================================================================================

Segment plugin for the Workarea platform.

Integration with segment https://segment.com/
API docs: https://segment.com/docs/sources/

This plugin implements segment's client side tracking API via their 'analytics.js' script.
Before installing and configuring this plugin you should set up & configure your segment account with a Website / Javascript source.

Configuration
--------------------------------------------------------------------------------

To configure segment in your application you must add the segment write key to your application secrets.
You can find the write key by logging in to the segment admin and visiting this URL https://segment.com/weblinc/sources/javascript/settings/keys

    segment_analytics:
      write_key: alongstringgoeshere

You will also need to update your application views to include an additional analytics payload for checkout started. To do this add the checkoutStarted event & payload to any links to checkout_path, for example in your cart/show.html.haml view.

snippet to add:
    data: { analytics:  checkout_started_analytics_data(@cart).to_json

#### Compatability with other plugins

If you are using the workarea-share plugin you should also add the following to your share links in workarea/storefront/shares/_share_buttons.html.haml

     data: { analytics: share_analytics_data('*share service name goes here*', share_url, message).to_json }

example:

     data: { analytics: share_analytics_data('facebook', share_url, message).to_json }
     
Testing and debugging
--------------------------------------------------------------------------------
To confirm this plugin is functioning you should check the JS console in development mode, the
adapter for this plugin includes a logger which should show multiple console logs in your browser's JS console.
All segment logger events begin with 'Segment:'

Once you have verified there are events firing in the console you should confirm that the data received by segment is error-free.
Segment provide an excellent debugger via their admin console, log in and visit this URL: https://segment.com/weblinc/sources/javascript/debugger


Getting Started
--------------------------------------------------------------------------------

This gem contains a rails engine that must be mounted onto a host Rails application.

To access Workarea gems and source code, you must be an employee of WebLinc or a licensed retailer or partner.

Workarea gems are hosted privately at https://gems.weblinc.com/.
You must have individual or team credentials to install gems from this server. Add your gems server credentials to Bundler:

    bundle config gems.weblinc.com my_username:my_password

Or set the appropriate environment variable in a shell startup file:

    export BUNDLE_GEMS__WEBLINC__COM='my_username:my_password'

Then add the gem to your application's Gemfile specifying the source:

    # ...
    gem 'workarea-segment', source: 'https://gems.weblinc.com'
    # ...

Or use a source block:

    # ...
    source 'https://gems.weblinc.com' do
      gem 'workarea-segment'
    end
    # ...

Update your application's bundle.

    cd path/to/application
    bundle

Workarea Platform Documentation
--------------------------------------------------------------------------------

See [http://developer.weblinc.com](http://developer.weblinc.com) for Workarea platform documentation.

Copyright & Licensing
--------------------------------------------------------------------------------

Copyright WebLinc 2017. All rights reserved.

For licensing, contact sales@workarea.com.
