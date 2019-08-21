json.user_id current_user.try(:_id)
json.checkout_id current_order.id
if logged_in?
  json.user_name current_user.try(:name)
  json.user_email current_user.try(:email)
end
