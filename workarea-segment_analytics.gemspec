$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "workarea/segment_analytics/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "workarea-segment_analytics"
  s.version     = Workarea::SegmentAnalytics::VERSION
  s.authors     = ['Curt Howard']
  s.email       = ['choward@workarea.com']
  s.homepage    = "https://github.com/workarea-commerce/workarea-segment_analytics"
  s.summary     = "Integration with segment"
  s.description = "The last integration you’ll ever do."

  s.files = `git ls-files`.split("\n")

  s.license = 'Business Software License'

  s.add_dependency 'workarea', '~> 3.x'
end
