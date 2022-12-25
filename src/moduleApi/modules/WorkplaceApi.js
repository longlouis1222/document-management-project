import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(data == null ? 'workplaces' : `workplaces?${data}`)
  },
  create(data) {
    return Api().post('workplaces', data)
  },
  update(data) {
    return Api().put(`workplaces/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`workplaces/${id}`)
  },
  delete(id) {
    return Api().delete(`workplaces/${id}`)
  }
}
