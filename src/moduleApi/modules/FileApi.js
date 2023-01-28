import Api from '../../moduleApi'

export default {
  getFileById(id) {
    return Api().get(`files/download/string/${id}`)
  },
  getFileByListId(data) {
    return Api().post(`google-driver/file/get-by-id`, data)
  },
}
