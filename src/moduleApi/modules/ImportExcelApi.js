import Api from '../../moduleApi'

export default {
  exportExcelfile(file, data) {
    return process.env.VUE_APP_API + `import-excel/${file}`;
  }
}