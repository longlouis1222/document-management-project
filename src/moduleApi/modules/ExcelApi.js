import Api from '../../moduleApi'

export default {
  exportExcelfile(file) {
    return process.env.VUE_APP_API + `excels/${file}`;
  }
}
