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
  getListTopicApproved(data) {
    return Api().get(!data ? 'students/get-list-topic-approved' : `students/get-list-topic-approved?${data}`)
  },
  getListTopicRegistry(data) {
    return Api().get(!data ? `students/get-list-topic-registry` : `students/get-list-topic-registry?${data}`)
  },
  registryTopic(id) {
    return Api().get(`students/registry-topic?registry=true&topicId=${id}`)
  },
  createTopicSuggest(data) {
    return Api().post(`students/create-topic-suggest`, data)
  },
  getListTopicSuggest(data) {
    return Api().get(!data ? `students/get-list-topic-suggest` : `students/get-list-topic-suggest?${data}`)
  },
  adminApproveTopic(id) {
    return Api().get(`students/admin-approve-topic/topicId=${id}`)
  },
}
