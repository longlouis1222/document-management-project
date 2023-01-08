import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  idLectures: null,
  nameAssembly: null,
  score: null,
  topicId: null,
}

// validation form
model.validForm = {
  idLectures: [ValidService.requiredChange],
  nameAssembly: [ValidService.required],
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
      idLectures: '',
      nameAssembly: '',
      score: '',
      topicId: '',
    },
    valid: {},
    operator: {
      idLectures: '',
      nameAssembly: '',
      score: '',
      topicId: '',
    },
  },
}

export default model
