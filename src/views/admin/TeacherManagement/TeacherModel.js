import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  address: null,
  avatar: null,
  codeLecture: null,
  dateOfBirth: null,
  degree: null,
  facultyId: null,
  fullName: null,
  gender: null,
  phoneNumber: null,
  regency: null,
  town: null,
}

// validation form
model.validForm = {
  address: [ValidService.required],
  avatar: [ValidService.required],
  codeLecture: [ValidService.required],
  dateOfBirth: [ValidService.required],
  degree: [ValidService.required],
  facultyId: [ValidService.requiredChange],
  fullName: [ValidService.required],
  gender: [ValidService.required],
  phoneNumber: [ValidService.required],
  regency: [ValidService.required],
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
      codeLecture: '',
      dateOfBirth: '',
      degree: '',
      facultyId: '',
      fullName: '',
      gender: '',
      phoneNumber: '',
      regency: '',
      town: '',
    },
    valid: {},
    operator: {
      address: '',
      codeLecture: '',
      dateOfBirth: '',
      degree: '',
      facultyId: '',
      fullName: '',
      gender: '',
      phoneNumber: '',
      regency: '',
      town: '',
    },
  },
}

export default model
