import axios from 'axios';

const http = window.axios;
const url = '/books';

export default {

  getById(id) {
    return http({
      method: 'GET',
      url: url + '/' + id,
    })
  },

  search(searchTerm, categories) {
    const url = '/elastic/books/search?' +
      (!!searchTerm ? '&searchTerm=' + searchTerm : '') +
      (categories && categories.length > 0 ? '&categories=' + categories.join() : '');
    return http({
      method: 'GET',
      url,
    });
  },

  download(bookId) {
    return http({
      url: url + `/${bookId}/download`, //your url
      method: 'GET',
      responseType: 'blob', // important
    });
  },

  uploadBookPdf(file) {
    const formData = new FormData();
    formData.append('file', file);

    return http({
      method: 'POST',
      url: url + '/file',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  },

  create(request) {
    return http({
      method: 'POST',
      url,
      data: request,
    })
  },

  update(id, request) {
    return http({
      method: 'PUT',
      url: url + '/' + id,
      data: request,
    })
  },

  delete(id) {
    return http({
      method: 'DELETE',
      url: url + '/' + id,
    })
  },

}
