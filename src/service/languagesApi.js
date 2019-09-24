const http = window.axios;
const url = '/languages';
export default {
  getAll: () => {
    return http({ url });
  }
}
