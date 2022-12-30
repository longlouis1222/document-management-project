import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
  code: null,
  name: null,
  specialization: null,
  workplaceId: null,
}

// validation form
model.validForm = {
  code: [ValidService.required],
  name: [ValidService.required],
  specialization: [ValidService.required],
  workplaceId: [ValidService.requiredChange],
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
          code: '',
          name: '',
          specialization: '',
          workplaceId: '',
        },
        valid: {
          code: [],
          name: [],
          specialization: [],
          workplaceId: [],
        },
        operator: {
          code: '',
          name: '',
          specialization: '',
          workplaceId: '',
        },
    },
}

export default model
