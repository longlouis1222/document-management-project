import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'assemblies' : `assemblies?${data}`)
  },
  create(data) {
    return Api().post('assemblies', data)
  },
  update(data) {
    return Api().put(`assemblies/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`assemblies/${id}`)
  },
  delete(id) {
    return Api().delete(`assemblies/${id}`)
  }
}
