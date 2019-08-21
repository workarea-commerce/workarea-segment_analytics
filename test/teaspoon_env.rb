require 'workarea/testing/teaspoon'

Teaspoon.configure do |config|
  config.root = Workarea::SegmentAnalytics::Engine.root
  Workarea::Teaspoon.apply(config)
end
