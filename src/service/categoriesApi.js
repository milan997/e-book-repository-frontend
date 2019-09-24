const http = window.axios;

const url = '/categories';

export default {
  getAll() {
    return http({
      method: 'GET',
      url,
    });
  },

  update(categoryId, request) {
    return http({
      method: 'PUT',
      url: url + '/' + categoryId,
      data: request,
    });
  },

  delete(categoryId) {
    return http({
      method: 'DELETE',
      url: url + '/' + categoryId,
    });
  },
}
