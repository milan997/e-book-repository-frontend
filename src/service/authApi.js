const http = window.axios;
const url = '/auth';

export default {

  signIn(request) {
    return http({
      method: 'POST',
      url: url + '/sign-in',
      data: request,
    })
  },

  signUp(request) {
    return http({
      method: 'POST',
      url: url + '/sign-up',
      data: request,
    })
  },

  forgotPassword(request) {
    return http({
      method: 'POST',
      url: url + '/forgot-password',
      data: request,
    })
  },

}
