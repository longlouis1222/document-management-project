import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  lecturerId: null,
  score: null,
  topicId: null,
}

// validation form
model.validForm = {
  lecturerId: [ValidService.requiredChange],
  score: [ValidService.required],
  topicId: [ValidService.requiredChange],
}

model.tableRules = {
  data: [],
  lengthMenu: [10, 20, 50, 100],
  allowPaging: true,
  allowSorting: true,
  allowSelect: false,
  showFormSearch: false,
  showUrl: true,
  total: 0,
  page: 1,
  limit: 10,
  skip: 0,
  sort: '',
  defaultSort: ['', 'ascending'],
  filters: '',
  recordSelected: [],
  dataSearch: {
    value: {
      code: '',
      name: '',
      facultyId: '',
      stdNumber: '',
    },
    valid: {
      code: [],
      name: [],
      facultyId: [],
      stdNumber: [],
    },
    operator: {
      code: '',
      name: '',
      facultyId: '',
      stdNumber: '',
    },
  },
}

export default model
