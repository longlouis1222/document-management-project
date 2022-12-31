import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'lecturers' : `lecturers?${data}`)
  },
  create(data) {
    return Api().post('lecturers', data)
  },
  update(data) {
    return Api().put(`lecturers/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`lecturers/${id}`)
  },
  delete(id) {
    return Api().delete(`lecturers/${id}`)
  }
}
