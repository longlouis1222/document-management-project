<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import FacultyApi from '@/moduleApi/modules/FacultyApi'
import StudentApi from '@/moduleApi/modules/StudentApi'
import TopicApi from '@/moduleApi/modules/TopicApi'
import ClassApi from '@/moduleApi/modules/ClassApi'
import ExcelApi from '@/moduleApi/modules/ExcelApi'

import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './StudentModel'

const defaultFilter = DataService.defaultFilter

const router = useRouter()
const moduleName = 'Quản lý Sinh viên'
const ruleFormRef = ref(FormInstance)
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const formValid = modelData.validForm

const formSearchData = reactive({
  value: MethodService.copyObject(tableRules.dataSearch.value),
})
const formSearchValid = tableRules.dataSearch.valid

const genderList = DataService.genderList

const dialogModel = ref(false)
const viewMode = ref('create')

const facultyList = reactive({ value: [] })
const classList = reactive({ value: [] })
const topicList = reactive({ value: [] })

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
          const studentApiRes = await StudentApi.create(formData.value)
          if (studentApiRes.status === 200) {
            ElMessage({
              message: 'Thêm mới thành công.',
              type: 'success',
            })
            dialogModel.value = false
          }
        } else if (viewMode.value === 'update') {
          console.log('Update data', formData.value)
          const studentApiRes = await StudentApi.update(formData.value)
          if (studentApiRes.status === 200) {
            console.log('Update', studentApiRes)
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
  const studentApiRes = await StudentApi.list(filter)
  if (studentApiRes.status === 200) {
    tableRules.data = await changeData(studentApiRes.data.data.data)
    tableRules.total = studentApiRes.data.data.totalElements
    console.log('getList', studentApiRes)
  }
}

const changeData = (data) => {
  data.forEach((e) => {
    e.date_of_birth = MethodService.formatDate(
      e.userInfoDTO.dateOfBirth,
      'date',
    )
    e.gender =
      e.userInfoDTO.gender == 0
        ? 'Nam'
        : e.userInfoDTO.gender == 1
        ? 'Nữ'
        : 'Khác'
  })
  return data
}

const handle = (type, rowData) => {
  if (type == 'update') {
    viewMode.value = 'update'
    dialogModel.value = true
    formData.value = rowData
    formData.value.fullName = rowData.userInfoDTO.fullName
    formData.value.gender =
      rowData.userInfoDTO.gender == 'Nam'
        ? 0
        : rowData.userInfoDTO.gender == 'Nữ'
        ? 1
        : 2
    formData.value.dateOfBirth = rowData.userInfoDTO.dateOfBirth
    formData.value.phoneNumber = rowData.userInfoDTO.phoneNumber
    formData.value.address = rowData.userInfoDTO.address
    formData.value.town = rowData.userInfoDTO.town
  } else if (type == 'delete') {
    viewMode.value = 'delete'
    deleteItem(rowData.id)
  }
}

const getItemById = async (id) => {
  console.log('id', id)
  const studentApiRes = await StudentApi.findById(id)
  if (studentApiRes.status === 200) {
    console.log('getItemById', studentApiRes)
  }
}

const deleteItem = async (id) => {
  ElMessageBox.alert('Bạn có chắc muốn xóa bản ghi này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    callback: async () => {
      const studentApiRes = await StudentApi.delete(id)
      if (studentApiRes.status === 200) {
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

const getFacultyList = async () => {
  const facultyApiRes = await FacultyApi.list(defaultFilter)
  if (facultyApiRes.status === 200) {
    facultyList.value = facultyApiRes.data.data.data
  }
}

const getTopicList = async () => {
  const topicApiRes = await TopicApi.list(defaultFilter)
  if (topicApiRes.status === 200) {
    topicList.value = topicApiRes.data.data.data
  }
}

const getClassList = async () => {
  const classApiRes = await ClassApi.list(defaultFilter)
  if (classApiRes.status === 200) {
    classList.value = classApiRes.data.data.data
  }
}

const exportExcel = async () => {
  const a = document.createElement("a");
  const res = ExcelApi.exportExcelfile('student');
  a.href = res
  a.click();
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

onMounted(async () => {
  await getFacultyList()
  await getTopicList()
  await getClassList()
  await getList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Danh sách thông tin sinh viên</h4>
            <div>
              <CButton color="primary" class="me-2" @click="toggleSearchBox"
                ><CIcon icon="cilSearch" class="me-2" />Tra cứu</CButton
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
              :model="formSearchData.value"
              :rules="formSearchValid"
              label-width="140px"
              label-position="top"
              class="demo-ruleForm"
              status-icon
              @submit.prevent="submitFormSearch(ruleFormRef)"
            >
              <b-row>
                <b-col md="3">
                  <el-form-item label="Mã sinh viên" prop="codeStudent">
                    <el-input
                      v-model="formSearchData.value.codeStudent"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Họ và tên" prop="fullName">
                    <el-input
                      v-model="formSearchData.value.fullName"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Giới tính" prop="gender">
                    <el-select
                      v-model="formSearchData.value.gender"
                      placeholder="chọn"
                      filterable
                    >
                      <el-option
                        v-for="item in genderList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Ngày sinh" prop="dateOfBirth">
                    <el-date-picker
                      v-model="formSearchData.value.dateOfBirth"
                      type="date"
                      placeholder="Chọn"
                    />
                  </el-form-item>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="3">
                  <el-form-item label="Số điện thoại" prop="phoneNumber">
                    <el-input
                      v-model="formSearchData.value.phoneNumber"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Địa chỉ" prop="address">
                    <el-input
                      v-model="formSearchData.value.address"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Quê quán" prop="town">
                    <el-input
                      v-model="formSearchData.value.town"
                      autocomplete="off"
                    />
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
        <el-table-column
          prop="codeStudent"
          label="Mã sinh viên"
          min-width="150"
        />
        <el-table-column
          prop="userInfoDTO.fullName"
          label="Họ và tên"
          min-width="150"
        />
        <el-table-column prop="gender" label="Giới tính" min-width="80" />
        <el-table-column
          prop="date_of_birth"
          label="Ngày sinh"
          min-width="150"
        />
        <el-table-column
          prop="userInfoDTO.address"
          label="Địa chỉ"
          min-width="150"
        />
        <el-table-column
          prop="userInfoDTO.town"
          label="Quê quán"
          min-width="150"
        />
        <el-table-column prop="classDTO.name" label="Lớp" min-width="150" />
        <el-table-column prop="topicDTO.name" label="Đề tài" min-width="150" />

        <el-table-column
          fixed="right"
          align="center"
          label="Thao tác"
          width="120"
        >
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
      title="Thêm mới sinh viên"
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
          <b-col md="4">
            <el-form-item label="Mã sinh viên" prop="codeStudent">
              <el-input
                v-model="formData.value.codeStudent"
                autocomplete="off"
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Họ và tên" prop="fullName">
              <el-input v-model="formData.value.fullName" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Giới tính" prop="gender">
              <el-select
                v-model="formData.value.gender"
                placeholder="chọn"
                filterable
              >
                <el-option
                  v-for="item in genderList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Ngày sinh" prop="dateOfBirth">
              <el-date-picker
                v-model="formData.value.dateOfBirth"
                type="date"
                placeholder="Chọn"
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Số điện thoại" prop="phoneNumber">
              <el-input
                v-model="formData.value.phoneNumber"
                autocomplete="off"
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Địa chỉ" prop="address">
              <el-input v-model="formData.value.address" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Quê quán" prop="town">
              <el-input v-model="formData.value.town" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Lớp" prop="classId">
              <el-select
                v-model="formData.value.classId"
                placeholder="chọn"
                filterable
              >
                <el-option
                  v-for="item in classList.value"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Đề tài" prop="topicId">
              <el-select
                v-model="formData.value.topicId"
                placeholder="chọn"
                filterable
              >
                <el-option
                  v-for="item in topicList.value"
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
  </div>
</template>

<style lang="scss" scoped>
</style>
