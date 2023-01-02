let DataService = {}

DataService.genderList = [
  {
    label: 'Nam',
    value: '0'
  },
  {
    label: 'Nữ',
    value: 1
  },
  {
    label: 'Khác',
    value: 2
  },
]

DataService.typeUserList = [
  {
    label: 'Giảng viên',
    value: 'LECTURE'
  },
  {
    label: 'Sinh viên',
    value: 'STUDENT'
  },
  {
    label: 'Khác',
    value: 'OTHER'
  },
]

DataService.certificationList = [
  {
    label: 'Thạc sỹ',
    value: 'Thạc sỹ'
  },
  {
    label: 'Tiến Sỹ',
    value: 'Tiến Sỹ'
  },
]

DataService.topicStatusList = [
  {
    label: 'Đạt',
    value: true
  },
  {
    label: 'Không đạt',
    value: false
  },
]

export default DataService;
