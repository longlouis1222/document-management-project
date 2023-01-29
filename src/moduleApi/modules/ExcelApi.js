import Api from '../../moduleApi'

export default {
  exportAssembly() {
    return Api().get(`excels/assembly`)
  },
  exportCategory() {
    return Api().get(`excels/category`)
  },
  exportClass() {
    return Api().get(`excels/class`)
  },
  exportFaculty() {
    return Api().get(`excels/faculty`)
  },
  exportLecture() {
    return Api().get(`excels/lecture`)
  },
  exportStudent() {
    return Api().get(`excels/student`)
  },
  exportTopic() {
    return Api().get(`excels/topic`)
  },
  exportUser() {
    return Api().get(`excels/user`)
  },
  exportWorkplace() {
    return Api().get(`excels/workplace`)
  },
}
