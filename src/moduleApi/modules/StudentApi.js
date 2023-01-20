import Api from '../../moduleApi'

export default {
  list(data) {
    return Api().get(!data ? 'students' : `students?${data}`)
  },
  create(data) {
    return Api().post('students', data)
  },
  update(data) {
    return Api().put(`students/${data.id}`, data)
  },
  findById(id) {
    return Api().get(`students/${id}`)
  },
  delete(id) {
    return Api().delete(`students/${id}`)
  },
  getListTopicApproved(id) {
    return Api().get(`students/get-list-topic-approved`)
  },
  getListTopicRegistry() {
    return Api().get(`students/get-list-topic-registry`)
  },
  registryTopic(id) {
    return Api().get(`students/registry-topic?registry=true&topicId=${id}`)
  },
}
