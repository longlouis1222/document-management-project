import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'topics' : `topics?${data}`)
  },
  create(data) {
    return Api().post('topics', data)
  },
  update(data) {
    return Api().put(`topics/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`topics/${id}`)
  },
  delete(id) {
    return Api().delete(`topics/${id}`)
  },
  getStatisticalScore() {
    return Api().get(`topics/statistical-score`)
  }
}
