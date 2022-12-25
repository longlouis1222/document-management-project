import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  email: null,
  listRole: null,
  status: null,
}

// validation form
model.validForm = {
  email: [ValidService.required],
  listRole: [ValidService.required],
  status: [ValidService.required],
}

model.dataFormOther = {}

// validation các form khác
model.validFormOther = {}

model.statusList = [
  {
    label: 'Đã kích hoạt',
    value: '1'
  },
  {
    label: 'Chưa kích hoạt',
    value: '0'
  },
  {
    label: 'Khóa',
    value: '-1'
  },
]

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
      email: '',
      username: '',
      listRole: '',
      status: '',
    },
    valid: {
      email: [],
      username: [],
      listRole: [],
      status: [],
    },
    operator: {
      email: '',
      username: '',
      listRole: '',
      status: '',
    },
  },
}

export default model
