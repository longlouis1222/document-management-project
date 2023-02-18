import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  topicName: null,
  year: null,
  description: null
}

// validation form
model.validForm = {
  description: [ValidService.required],
  year: [ValidService.requiredChange],
  topicName: [ValidService.required],
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
      description: '',
      lecturerGuideId: '',
      lecturerCounterArgumentId: '',
      name: '',
      status: '',
      year: '',
      scoreProcessOne: '',
      scoreProcessTwo: '',
      categoryId: '',
    },
    valid: {
    },
    operator: {
      description: '',
      lecturerGuideId: '',
      lecturerCounterArgumentId: '',
      name: '',
      status: '',
      year: '',
      scoreProcessOne: '',
      scoreProcessTwo: '',
      categoryId: '',
    },
  },
}

export default model
