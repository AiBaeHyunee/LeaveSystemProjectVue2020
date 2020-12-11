import Cookies from 'js-cookie'

const TokenKey = 'digital_department_system_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


// export function getToken() {
//   return Cookies.get( TokenKey + sessionStorage.getItem( 'username' ) )
// }
//
// export function setToken( token, rememberMe, username ) {
//   // if ( rememberMe ) {
//   //   return Cookies.set( TokenKey + username, token, { expires: Config.tokenCookieExpires } )
//   // } else {
//   //   return Cookies.set( TokenKey + username, token )
//   // }
//   return Cookies.set( TokenKey + username, token )
// }
//
// export function removeToken( username ) {
//   return Cookies.remove( TokenKey + username )
// }

