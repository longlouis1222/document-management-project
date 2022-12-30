import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'dashboards' : `dashboards?${data}`)
  },
  create(data) {
    return Api().post('dashboards', data)
  },
  update(data) {
    return Api().put(`dashboards/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`dashboards/${id}`)
  },
  delete(id) {
    return Api().delete(`dashboards/${id}`)
  }
}
