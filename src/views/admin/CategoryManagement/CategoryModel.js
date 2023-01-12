import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  code: null,
  name: null,
}

// validation form
model.validForm = {
  code: [ValidService.required],
  name: [ValidService.required],
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
    },
    valid: {
      code: [],
      name: [],
    },
    operator: {
      code: '',
      name: '',
    },
  },
}

export default model
