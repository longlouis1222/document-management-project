import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'classes' : `classes?${data}`)
  },
  create(data) {
    return Api().post('classes', data)
  },
  update(data) {
    return Api().put(`classes/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`classes/${id}`)
  },
  delete(id) {
    return Api().delete(`classes/${id}`)
  }
}
