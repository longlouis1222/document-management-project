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
  },
  approveTopic(data) {
    return Api().get(`lecturers/approve-topic?${data}`)
  },
  getListTopicStudentAssign(data) {
    return Api().get(!data ? 'lecturers/get-list-topic' : `lecturers/get-list-topic?${data}`)
  },
  getListTopicCounter(data) {
    return Api().get(!data ? 'lecturers/get-list-topic-counter' : `lecturers/get-list-topic-counter?${data}`)
  },
  getListTopicGuide(data) {
    return Api().get(!data ? 'lecturers/get-list-topic-guide' : `lecturers/get-list-topic-guide?${data}`)
  },
  checkLectureByAssembly(id) {
    return Api().get(`lecturers/check-lecture-by-assembly?userId=${id}`)
  },
  getListTopicByAssembly(data) {
    return Api().get(!data ? 'lecturers/get-topic-by-assembly' : `lecturers/get-topic-by-assembly?${data}`)
  },
}
