import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(data == null ? 'faculties' : `faculties?${data}`)
  },
  create(data) {
    return Api().post('faculties', data)
  },
  update(data) {
    return Api().put(`faculties/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`faculties/${id}`)
  },
  delete(id) {
    return Api().delete(`faculties/${id}`)
  }
}
