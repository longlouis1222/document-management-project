import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'categories' : `categories?${data}`)
  },
  create(data) {
    return Api().post('categories', data)
  },
  update(data) {
    return Api().put(`categories/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`categories/${id}`)
  },
  delete(id) {
    return Api().delete(`categories/${id}`)
  }
}
