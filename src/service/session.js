import VueJwtDecode from 'vue-jwt-decode';

export default {

  signIn(request) {
    this.setAccessToken(request.token);
    this.setUserInfo(request.token);
  },

  getAccessToken() {
    return localStorage.getItem('ACCESS_TOKEN');
  },

  setAccessToken(token) {
    localStorage.setItem('ACCESS_TOKEN', 'Bearer ' + token);
  },

  getUserInfo() {
    return JSON.parse(localStorage.getItem('USER_INFO'));
  },

  setUserInfo(token) {
    const payload = VueJwtDecode.decode(token);
    localStorage.setItem('USER_INFO', JSON.stringify(payload));
  },

  userLoggedIn() {
    return !!localStorage.getItem('ACCESS_TOKEN');
  },

  admin() {
    const userInfo = this.getUserInfo();
    return userInfo && userInfo.role === 'ADMIN';
  },

  subsCategories() {
    return this.getUserInfo().categories;
  },

  categoryAccess(categoryId) {
    return this.admin() || this.subsCategories().includes(categoryId)
  },

  destroy() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ACCESS_TOKEN_EXP_TIME');
    localStorage.removeItem('REFRESH_TOKEN');
    localStorage.removeItem('USER_INFO');
  },

}
