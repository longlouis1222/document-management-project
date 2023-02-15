import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  address: null,
  avatar: null,
  classId: null,
  codeStudent: null,
  dateOfBirth: null,
  fullName: null,
  gender: null,
  phoneNumber: null,
  stdPass: null,
  topicId: null,
  town: null,
}

// validation form
model.validForm = {
  address: [ValidService.required],
  avatar: [ValidService.required],
  classId: [ValidService.requiredChange],
  codeStudent: [ValidService.required],
  dateOfBirth: [ValidService.requiredChange],
  fullName: [ValidService.required],
  gender: [ValidService.requiredChange],
  phoneNumber: [ValidService.required],
  stdPass: [ValidService.required],
  topicId: [ValidService.required],
  town: [ValidService.required],
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
      address: '',
      avatar: '',
      classId: '',
      codeStudent: '',
      dateOfBirth: '',
      fullName: '',
      gender: '',
      phoneNumber: '',
      stdPass: '',
      topicId: '',
      town: '',
    },
    valid: {},
    operator: {
      address: '',
      avatar: '',
      classId: '',
      codeStudent: '',
      dateOfBirth: '',
      fullName: '',
      gender: '',
      phoneNumber: '',
      stdPass: '',
      topicId: '',
      town: '',
    },
  },
}

export default model
