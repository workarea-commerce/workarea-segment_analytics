require 'workarea'
require 'workarea/storefront'
require 'workarea/admin'

require 'workarea/segment_analytics/engine'
require 'workarea/segment_analytics/version'

module Workarea
  module SegmentAnalytics
    include ActiveSupport::Configurable
    config_accessor :write_key

    def self.configure_secrets
      if Rails.application.secrets.segment_analytics.present?
        secrets = Rails.application.secrets.segment_analytics.deep_symbolize_keys

        self.write_key = secrets[:write_key]
      else
        self.write_key = ''
      end
    end
  end
end
