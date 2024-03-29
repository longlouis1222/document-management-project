import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  description: null,
  fileId: null,
  name: null,
  scoreCounterArgument: null,
  scoreGuide: null,
  status: null,
  stdNumber: null,
  year: null,
  scoreProcessOne: null,
  scoreProcessTwo: null,
  categoryId: null,
}

// validation form
model.validForm = {
  description: [ValidService.required],
  fileId: [ValidService.requiredChange],
  lecturerId: [ValidService.requiredChange],
  name: [ValidService.required],
  scoreCounterArgument: [ValidService.required],
  scoreGuide: [ValidService.required],
  status: [ValidService.requiredChange],
  stdNumber: [ValidService.required],
  year: [ValidService.requiredChange],
  scoreProcessOne: [ValidService.required],
  scoreProcessTwo: [ValidService.required],
}

model.tableRules = {
  data: [],
  lengthMenu: [9, 18, 27, 36],
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
