module Workarea
  module SegmentAnalytics
    class Engine < ::Rails::Engine
      include Workarea::Plugin
      isolate_namespace Workarea::SegmentAnalytics

      config.to_prepare do
        Workarea::Storefront::ApplicationController.helper(
          Workarea::Storefront::SegmentAnalyticsAnalyticsHelper
        )
      end
    end
  end
end
