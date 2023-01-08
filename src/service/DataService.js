let DataService = {}

DataService.defaultFilter = "limit=99999&page=0"

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

DataService.workPlaceList = [
  {
    label: 'Hà Nội',
    value: 'Hà Nội',
  },
  {
    label: 'TP.HCM',
    value: 'TP.HCM',
  },
  {
    label: 'An Giang',
    value: 'An Giang',
  },
  {
    label: 'Bà Rịa - Vũng Tàu',
    value: 'Bà Rịa - Vũng Tàu',
  },
  {
    label: 'Bắc Cạn - Bắc Giang',
    value: 'Bắc Cạn - Bắc Giang',
  },
  {
    label: 'Bạc Liêu',
    value: 'Bạc Liêu',
  },
  {
    label: 'Bắc Ninh',
    value: 'Bắc Ninh',
  },
  {
    label: 'Bến Tre',
    value: 'Bến Tre',
  },
  {
    label: 'Bình Dương',
    value: 'Bình Dương',
  },
  {
    label: 'Bình Phước',
    value: 'Bình Phước',
  },
  {
    label: 'Bình Thuận',
    value: 'Bình Thuận',
  },
  {
    label: 'Bình Định',
    value: 'Bình Định',
  },
  {
    label: 'Cà Mau',
    value: 'Cà Mau',
  },
  {
    label: 'Cần Thơ',
    value: 'Cần Thơ',
  },
]
export default DataService;
