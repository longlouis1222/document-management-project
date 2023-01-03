import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  address: null,
  authorities: [],
  avatar: null,
  dateOfBirth: null,
  email: null,
  fullName: null,
  gender: null,
  marriageStatus: null,
  phoneNumber: null,
  status: null,
  town: null,
  type: null,
  username: null,
}

// validation form
model.validForm = {
  address: [ValidService.required],
  authorities: [],
  avatar: [ValidService.requiredChange],
  dateOfBirth: [ValidService.requiredChange],
  email: [ValidService.required, ValidService.checkEmail],
  fullName: [ValidService.required],
  gender: [ValidService.required],
  marriageStatus: [ValidService.required],
  phoneNumber: [ValidService.required],
  status: [ValidService.required],
  town: [ValidService.requiredChange],
  username: [ValidService.required],
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
  defaultSort: ['status_order', 'ascending'],
  filters: '',
  recordSelected: [],
  dataSearch: {
    value: {},
    valid: {},
    operator: {},
  },
}

export default model
