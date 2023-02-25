<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import FacultyApi from '@/moduleApi/modules/FacultyApi'
import WorkplaceApi from '@/moduleApi/modules/WorkplaceApi'
import ExcelApi from '@/moduleApi/modules/ExcelApi'

import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './FacultyModel'
import axios from 'axios'

const dialogUpload = ref(false)
const fileList = ref([])

const defaultFilter = DataService.defaultFilter

const router = useRouter()
const moduleName = 'Quản lý Khoa'
const ruleFormRef = ref(FormInstance)
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const formValid = reactive(MethodService.copyObject(modelData.validForm))
const formSearchData = reactive({
  value: MethodService.copyObject(tableRules.dataSearch.value),
})
const formSearchValid = tableRules.dataSearch.valid

const componentKey = ref(0)
const dialogModel = ref(false)
const viewMode = ref('create')
const workplaceList = reactive({ value: [] })

const toggleSearchBox = () => {
  tableRules.showFormSearch = !tableRules.showFormSearch
}

const openDialogAddItem = () => {
  dialogModel.value = true
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        if (viewMode.value === 'create') {
          const userApiRes = await FacultyApi.create(formData.value)
          if (userApiRes.status === 200) {
            ElMessage({
              message: 'Thêm mới thành công.',
              type: 'success',
            })
            dialogModel.value = false
          }
        } else if (viewMode.value === 'update') {
          console.log('Update data', formData.value)
          const userApiRes = await FacultyApi.update(formData.value)
          if (userApiRes.status === 200) {
            console.log('Update', userApiRes)
            ElMessage({
              message: 'Cập nhật thành công.',
              type: 'success',
            })
            dialogModel.value = false
          }
        }
        resetForm(formEl)
        await getList()
      } catch (error) {
        console.log(error)
        if (
          error.response &&
          error.response.data &&
          error.response.data.errorMessage
        ) {
          ElMessage({
            type: 'error',
            message: `${error.response.data.errorMessage}`,
          })
          return
        }
        ElMessage({
          type: 'error',
          message: `Có lỗi xảy ra.`,
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  viewMode.value = 'create'
}

const submitFormSearch = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        tableRules.filters = formSearchData.value
        console.log('tableRules.filters', tableRules.filters)
        tableRules.skip = 0
        tableRules.page = 1
        await getList()
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const getList = async () => {
  let dataFilter = {
    limit: tableRules.limit,
    skip: tableRules.skip,
    page: tableRules.page > 0 ? tableRules.page - 1 : tableRules.page,
    // sort: tableRules.sort,
    ...tableRules.filters,
  }
  router.replace({
    name: moduleName,
    query: {
      ...dataFilter,
    },
  })
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const userApiRes = await FacultyApi.list(filter)
  if (userApiRes.status === 200) {
    tableRules.data = await changeData(userApiRes.data.data.data)
    tableRules.total = userApiRes.data.data.totalElements
    console.log('getList', userApiRes)
  }
}

const changeData = (data) => {
  data.forEach((e) => {
    if (e.workplaceId) {
      const o = workplaceList.value.find((w) => w.id == e.workplaceId)
      e.workplaceName = o ? o.name : ''
    }
  })
  return data
}

const handle = (type, rowData) => {
  viewMode.value = type
  if (type == 'update') {
    dialogModel.value = true
    getItemById(rowData.id)
  } else if (type == 'delete') {
    deleteItem(rowData.id)
  }
}

const getItemById = async (id) => {
  try {
    const facultyApiRes = await FacultyApi.findById(id)
    if (facultyApiRes.status === 200) {
      console.log('getItemById', facultyApiRes)
      formData.value = facultyApiRes.data.data
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errorMessage
    ) {
      ElMessage({
        type: 'error',
        message: `${error.response.data.errorMessage}`,
      })
      return
    }
    ElMessage({
      type: 'error',
      message: `Có lỗi xảy ra.`,
    })
  }
}

const deleteItem = async (id) => {
  console.log('deleteItem', id)
  ElMessageBox.alert('Bạn có chắc muốn xóa bản ghi này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    callback: async () => {
      const userApiRes = await FacultyApi.delete(id)
      if (userApiRes.status === 200) {
        ElMessage({
          type: 'success',
          message: `Xóa thành công`,
        })
        await getList()
        viewMode.value = 'create'
      }
    },
  })
}

const getListWorkplace = async () => {
  try {
    const workplaceApiRes = await WorkplaceApi.list(defaultFilter)
    if (workplaceApiRes.status === 200) {
      workplaceList.value = workplaceApiRes.data.data.data
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errorMessage
    ) {
      ElMessage({
        type: 'error',
        message: `${error.response.data.errorMessage}`,
      })
      return
    }
    ElMessage({
      type: 'error',
      message: `Có lỗi xảy ra.`,
    })
  }
}

const exportExcel = async () => {
  const a = document.createElement('a')
  let dataFilter = {
    ...tableRules.filters,
  }
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const res = ExcelApi.exportExcelfile('faculty', filter)
  a.href = res
  a.click()
}

const fn_tableSizeChange = (limit) => {
  tableRules.limit = limit
  fn_tableChangeskip(1)
}
const fn_tableCurentChange = (page) => {
  fn_tableChangeskip(page)
}
const fn_tablePrevClick = () => {
  // fn_tableChangeskip(page);
}
const fn_tableNextClick = () => {
  // fn_tableChangeskip(page);
}
const fn_tableChangeskip = (page) => {
  tableRules.page = page
  tableRules.skip = (tableRules.page - 1) * tableRules.limit
  getList()
}
const fn_tableSortChange = (column, tableSort) => {
  tableSort = tableRules
  MethodService.tableSortChange(column, tableSort)
  // getService();
}

const importExcel = async () => {
  fileList.value = []
  dialogUpload.value = true
}

const uploadFileToDb = async () => {
  if (!fileList.value || (fileList.value && fileList.value.length == 0)) {
    ElMessage.warning(`Vui lòng tải lên ít nhất 1 file.`)
    return
  }
  let fd = new FormData()

  for (let i = 0; i < fileList.value.length; i++) {
    fd.append('fileUpload', fileList.value[i].raw, fileList.value[i].raw.name)
  }

  axios({
    method: 'post',
    url: 'http://localhost:8084/api/v1/import-excel/faculty',
    data: fd,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization:
        localStorage.getItem('Token') && localStorage.getItem('uid')
          ? 'Bearer ' + localStorage.getItem('Token')
          : '',
    },
  })
    .then(async (response) => {
      //handle success
      console.log('success', response)

      dialogUpload.value = false
      fileList.value = []
      await getList()
      ElMessage.success(`Tải lên file thành công.`)
    })
    .catch((response) => {
      //handle error
      console.log('error', response)
      if (
        response.response &&
        response.response.data &&
        response.response.data.errorMessage
      ) {
        ElMessage({
          type: 'error',
          message: `${response.response.data.errorMessage}`,
        })
        return
      }
      ElMessage({
        type: 'error',
        message: `Có lỗi xảy ra.`,
      })
    })
}

onMounted(async () => {
  await getListWorkplace()
  await getList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Danh sách khoa</h4>
            <div>
              <CButton color="primary" class="me-2" @click="toggleSearchBox"
                ><CIcon icon="cilSearch" class="me-2" /> Tra cứu</CButton
              >
              <CButton color="primary" @click="openDialogAddItem"
                >Thêm mới</CButton
              >
              <CButton
                color="info"
                variant="outline"
                class="ms-2"
                @click="exportExcel"
                ><CIcon icon="cilCloudDownload"
              /></CButton>
              <CButton
              color="info"
              variant="outline"
              class="ms-2"
              @click="importExcel"
              ><CIcon icon="cilCloudUpload"
            /></CButton>
            </div>
          </div>
        </div>
      </template>

      <div class="main-body-search mx-3 mb-3">
        <b-collapse
          v-model="tableRules.showFormSearch"
          id="myFormSearch"
          class=""
        >
          <el-card>
            <el-form
              ref="ruleFormRef"
              :model="formSearchData"
              :rules="formSearchValid"
              label-width="140px"
              label-position="top"
              class="demo-ruleForm"
              status-icon
              @submit.prevent="submitFormSearch(ruleFormRef)"
            >
              <b-row>
                <b-col md="3">
                  <el-form-item label="Mã khoa" prop="">
                    <el-input
                      v-model="formSearchData.value.code"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Tên khoa" prop="">
                    <el-input
                      v-model="formSearchData.value.name"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Chuyên ngành" prop="">
                    <el-input
                      v-model="formSearchData.value.specialization"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Đơn vị" prop="workplaceId">
                    <el-select
                      v-model="formSearchData.value.workplaceId"
                      placeholder="chọn"
                      clearable
                    >
                      <el-option
                        v-for="item in workplaceList.value"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
              </b-row>
              <div class="text-center">
                <CButton color="primary" @click="submitFormSearch(ruleFormRef)"
                  >Tìm kiếm</CButton
                >
              </div>
            </el-form>
          </el-card>
        </b-collapse>
      </div>

      <el-table :data="tableRules.data" style="width: 100%">
        <el-table-column prop="name" label="Tên khoa" />
        <el-table-column prop="code" label="Mã khoa" />
        <el-table-column prop="specialization" label="Chuyên ngành" />
        <el-table-column prop="workplaceName" label="Đơn vị" />
        <el-table-column align="center" label="Thao tác" width="180">
          <template #default="scope">
            <div>
              <CButton
                color="info"
                variant="outline"
                class="me-2"
                size="sm"
                @click="handle('update', scope.row)"
                ><CIcon icon="cilPencil"
              /></CButton>
              <CButton
                color="danger"
                variant="outline"
                size="sm"
                @click="handle('delete', scope.row)"
                ><CIcon icon="cilTrash"
              /></CButton>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="d-flex justify-content-center mt-3 mb-3">
        <el-pagination
          small
          v-model:currentPage="tableRules.page"
          v-model:pageSize="tableRules.limit"
          :page-sizes="tableRules.lengthMenu"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="Number(tableRules.total)"
          @size-change="fn_tableSizeChange"
          @current-change="fn_tableCurentChange"
          @prev-click="fn_tablePrevClick"
          @next-click="fn_tableNextClick"
        />
      </div>
    </el-card>

    <!-- Start dialog -->
    <el-dialog
      v-model="dialogModel"
      title="Thêm mới khoa"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      width="80%"
      @close="resetForm(ruleFormRef)"
    >
      <el-form
        ref="ruleFormRef"
        :model="formData.value"
        :rules="formValid"
        label-width="140px"
        label-position="top"
        class="demo-ruleForm"
        status-icon
      >
        <b-row>
          <b-col md="3">
            <el-form-item label="Tên khoa" prop="name">
              <el-input v-model="formData.value.name" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Mã khoa" prop="code">
              <el-input v-model="formData.value.code" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Chuyên ngành" prop="specialization">
              <el-input
                v-model="formData.value.specialization"
                autocomplete="off"
              />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Đơn vị" prop="workplaceId">
              <el-select
                v-model="formData.value.workplaceId"
                placeholder="chọn"
              >
                <el-option
                  v-for="item in workplaceList.value"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </b-col>
        </b-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <CButton color="primary" @click="submitForm(ruleFormRef)">{{
            viewMode === 'create' ? 'Thêm mới' : 'Cập nhật'
          }}</CButton>
        </span>
      </template>
    </el-dialog>
    <!-- End dialog -->

    <!-- Start dialog Upload -->
    <el-dialog
      v-model="dialogUpload"
      title="Thêm file đính kèm"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      width="30%"
      @close="resetForm(ruleFormRef)"
    >
      <el-form
        ref="ruleFormRef"
        :model="formData.value"
        :rules="formValid"
        label-width="140px"
        label-position="top"
        class="demo-ruleForm"
        status-icon
      >
        <div class="text-center">
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="5"
            :on-exceed="handleExceed"
            :auto-upload="false"
            accept=".xlsx"
          >
            <template #trigger>
              <CButton color="info">Tải file lên</CButton>
            </template>

            <template #tip>
              <div class="el-upload__tip">
                File tải lên có dung lượng tối đa 500kb
              </div>
            </template>
          </el-upload>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <CButton
            v-if="fileList && fileList.length > 0"
            color="primary"
            @click="uploadFileToDb"
            >Cập nhật</CButton
          >
        </span>
      </template>
    </el-dialog>
    <!-- End dialog upload -->
  </div>
</template>

<style lang="scss" scoped>
</style>
