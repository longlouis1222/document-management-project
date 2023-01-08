import Api from '../../moduleApi'

export default {
  getFileById(id) {
    return Api().get(`files/download/string/${id}`)
  },
}
