import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  nameClass: '',
  nameStudent: '',
  nameTopic: '',
  topicYear: '',
}

// validation form
model.validForm = {
  nameClass: [ValidService.required],
  nameStudent: [ValidService.required],
  nameTopic: [ValidService.required],
  topicYear: [ValidService.required]
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
      nameClass: '',
      nameStudent: '',
      nameTopic: '',
      topicYear: '',
    },
    valid: {
    },
    operator: {
      nameClass: '',
      nameStudent: '',
      nameTopic: '',
      topicYear: '',
    },
  },
}

export default model
