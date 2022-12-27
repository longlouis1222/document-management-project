import ValidService from '@/service/ValidService'
let model = {}

// dữ liệu form
model.dataForm = {
    name: null,
    specialization: null,
    code: null,
    address: null,
}

// validation form
model.validForm = {
    name: [ValidService.required],
    specialization: [ValidService.required],
    code: [ValidService.required],
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
            specialization: '',
            code: '',
            address: '',
        },
        valid: {
            name: [],
            specialization: [],
            code: [],
            address: [],
        },
        operator: {
            name: '',
            specialization: '',
            code: '',
            address: '',
        },
    },
}

export default model
