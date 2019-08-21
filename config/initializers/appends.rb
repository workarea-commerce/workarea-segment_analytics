module Workarea
  Plugin.append_javascripts(
    'storefront.head',
    'workarea/storefront/segment_analytics/dependencies/analytics'
  )

  Plugin.append_javascripts(
    'storefront.modules',
    'workarea/storefront/segment_analytics/modules/segment_analytics',
    'workarea/storefront/segment_analytics/modules/login_events',
    'workarea/storefront/segment_analytics/modules/segment_analytics_adapter'
  )

  Plugin.append_partials(
    'storefront.current_user',
    'workarea/storefront/users/current_user_segment_analytics'
  )
end
