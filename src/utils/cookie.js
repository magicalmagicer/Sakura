import Cookie from 'js-cookie'

const handleCookies = function handleCookies(type, data = {}) {
  let cookies = [
    'token',
    'username',
    'user_id',
    'user_power',
    'email',
    'avatar',
    'nickname',
  ]
  if (type == 'set') {
    cookies.forEach(item => {
      Cookie.set(item, data[item])
    })
  } else if (type == 'remove'){
    cookies.forEach(item => {
      Cookie.remove(item)
    })
  }
}
export default handleCookies

