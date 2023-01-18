import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  name: null,
  email: null,
  phoneNumber: null,
  address: null,
}

// validation form
model.validForm = {
  name: [ValidService.required],
  email: [ValidService.required, ValidService.checkEmail],
  phoneNumber: [ValidService.required],
  address: [ValidService.required],
}

model.dataFormOther = {}

// validation các form khác
model.validFormOther = {}

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
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
    },
    valid: {
      name: [],
      email: [],
      phoneNumber: [],
      address: [],
    },
    operator: {
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
    },
  },
}

export default model
