Workarea Segment Analytics
================================================================================

Segment plugin for the Workarea platform.

Integration with segment https://segment.com/
API docs: https://segment.com/docs/sources/

This plugin implements segment's client side tracking API via their `analytics.js` script. Before installing and configuring this plugin you should set up & configure your segment account with a Website / Javascript source.

Getting Started
--------------------------------------------------------------------------------

Add the gem to your application's Gemfile:

```ruby
# ...
gem 'workarea-segment-analytics'
# ...
```

Update your application's bundle.

```bash
cd path/to/application
bundle
```

Configuration
--------------------------------------------------------------------------------

To configure segment in your application you must add the segment write key to your application secrets.
You can find the write key by logging in to the segment admin and visiting this URL https://segment.com/weblinc/sources/javascript/settings/keys

    segment_analytics:
      write_key: alongstringgoeshere

You will also need to update your application views to include an additional analytics payload for checkout started. To do this add the checkoutStarted event & payload to any links to checkout_path, for example in your cart/show.html.haml view.

snippet to add:

```ruby
data: { analytics:  checkout_started_analytics_data(@cart).to_json
```

Compatability with other plugins
--------------------------------------------------------------------------------

If you are using the workarea-share plugin you should also add the following to your share links in workarea/storefront/shares/\_share_buttons.html.haml

```ruby
data: { analytics: share_analytics_data('*share service name goes here*', share_url, message).to_json }
```

example:

```ruby
data: { analytics: share_analytics_data('facebook', share_url, message).to_json }
```

Testing and debugging
--------------------------------------------------------------------------------
To confirm this plugin is functioning you should check the JS console in development mode, the adapter for this plugin includes a logger which should show multiple console logs in your browser's JS console. All segment logger events begin with 'Segment:'

Once you have verified there are events firing in the console you should confirm that the data received by segment is error-free. Segment provide an excellent debugger via their admin console, log in and visit this URL: https://segment.com/weblinc/sources/javascript/debugger

Workarea Commerce Documentation
--------------------------------------------------------------------------------

See [https://developer.workarea.com](https://developer.workarea.com) for Workarea Commerce documentation.

License
--------------------------------------------------------------------------------

Workarea Segment Analytics is released under the [Business Software License](LICENSE)
