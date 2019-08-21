module Workarea
  module Storefront
    module SegmentAnalyticsAnalyticsHelper
      def checkout_started_analytics_data(order)
        {
          event: 'checkoutStarted',
          domEvent: 'click',
          payload: order_analytics_data(order)
        }
      end

      # Overrides helper method from Workarea::Storefront::AnalyticsHelper
      def checkout_order_placed_analytics_data(order)
        result = super
        result[:payload].merge!(email: order.email, name: order_name(order))
        result
      end

      # Share analytics helper method
      # to be used in conjunction with workarea-share
      def share_analytics_data(type, url, message)
        {
          event: 'share',
          domEvent: 'click',
          payload: {
            message: message,
            type: type,
            url: url
          }
        }
      end

      private

      def order_name(order)
        "#{order.billing_address.first_name} #{order.billing_address.last_name}"
      end
    end
  end
end
