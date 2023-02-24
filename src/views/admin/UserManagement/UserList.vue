<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'

import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import UserApi from '@/moduleApi/modules/UserApi'
import StudentApi from '@/moduleApi/modules/StudentApi'
import TeacherApi from '@/moduleApi/modules/TeacherApi'
import ExcelApi from '@/moduleApi/modules/ExcelApi'

import { FormInstance } from 'element-plus'

import modelData from './UserModel'
import { fill } from 'lodash'

const defaultFilter = DataService.defaultFilter
const router = useRouter()
const moduleName = 'Danh sách Quản lý'
const ruleFormRef = ref(FormInstance)
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const formValid = reactive(MethodService.copyObject(modelData.validForm))
const formSearchData = reactive(
  MethodService.copyObject(tableRules.dataSearch.value),
)
const formSearchValid = reactive(
  MethodService.copyObject(tableRules.dataSearch.valid),
)

const componentKey = ref(0)
const statusList = modelData.statusList
const typeUserList = DataService.typeUserList
const dialogModel = ref(false)
const viewMode = ref('create')

const dynamicList = reactive({ value: [] })

const toggleSearchBox = () => {
  tableRules.showFormSearch = !tableRules.showFormSearch
}

const openDialogAddItem = () => {
  dialogModel.value = true
  setTimeout(() => {
    formData.value.username = ''
    formData.value.password = ''
  }, 1700)
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  viewMode.value = 'create'
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        if (viewMode.value === 'create') {
          const userApiRes = await UserApi.create(formData.value)
          if (userApiRes.status === 200) {
            console.log('create', userApiRes)
            dialogModel.value = false
            ElMessage({
              message: 'Thêm mới thành công.',
              type: 'success',
            })
          }
        } else if (viewMode.value === 'update') {
          console.log('Update data', formData.value)
          const userApiRes = await UserApi.update(formData.value)
          if (userApiRes.status === 200) {
            console.log('Update', userApiRes)
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

const submitFormSearch = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        tableRules.filters = formSearchData
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
  const userApiRes = await UserApi.list(filter)
  if (userApiRes.status === 200) {
    tableRules.data = await changeData(userApiRes.data.data.data)
    tableRules.total = userApiRes.data.data.totalElements
  }
}

const changeData = (data) => {
  data.forEach((e) => {
    e.status_name =
      e.status == 1 ? 'Đã kích hoạt' : e.status == 0 ? 'Chưa kích hoạt' : 'Khóa'
  })
  return data
}

const updateItem = async (rowData) => {
  viewMode.value = 'update'
  formData.id = rowData.id
  formData.username = rowData.username
  formData.email = rowData.email
  formData.status = formData.status == 1 ? -1 : 1

  try {
    const userApiRes = await UserApi.update(formData.value)
    if (userApiRes.status === 200) {
      ElMessage({
        type: 'success',
        message: `Cập nhật thành công`,
      })

      await getList()
      componentKey.value++
      viewMode.value = 'create'
    }
  } catch (response) {
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
      message: `${response.message}`,
      type: 'error',
    })
  }
}

const getItemById = async (rowData) => {
  try {
    const userApiRes = await UserApi.findById(rowData.id)
    if (userApiRes.status === 200) {
      console.log('getItemById', userApiRes)
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

const deleteItem = async (rowData) => {
  console.log(rowData)
  ElMessageBox.alert('Bạn có chắc muốn xóa bản ghi này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    callback: async () => {
      try {
        const userApiRes = await UserApi.delete(rowData.id)
        if (userApiRes.status === 200) {
          await getList()
          console.log(userApiRes)
        }

        ElMessage({
          type: 'success',
          message: `Xóa thành công`,
        })
      } catch (response) {
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
          message: `${response.message}`,
          type: 'error',
        })
      }
    },
  })
}

const exportExcel = async () => {
  const a = document.createElement('a')
  let dataFilter = {
    ...tableRules.filters,
  }
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const res = ExcelApi.exportExcelfile('user', filter)
  a.href = res
  a.click()
}

const fillStudentCodeOrLectureCode = () => {
  console.log(formData.value.studentOrLectureId)
  console.log(
    'test >>',
    formData.value.type == 'LECTURE' ? 'Giáo viên' : 'Sinh viên',
  )

  const o = dynamicList.value.find(
    (item) => item.id == formData.value.studentOrLectureId,
  )
  if (formData.value.type == 'LECTURE') {
    formData.value.username = o && o.codeLecture ? o.codeLecture : ''
  } else {
    formData.value.username = o && o.codeStudent ? o.codeStudent : ''
  }
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
const getListTeacher = async () => {
  const teacherApiRes = await TeacherApi.list(defaultFilter)
  if (teacherApiRes.status === 200) {
    // teacherList.value = teacherApiRes.data.data.data
    dynamicList.value = teacherApiRes.data.data.data
  }
}

const getStudentTeacher = async () => {
  const studentApiRes = await StudentApi.list(defaultFilter)
  if (studentApiRes.status === 200) {
    // studentList.value = studentApiRes.data.data.data
    dynamicList.value = studentApiRes.data.data.data
  }
}
const changeType = () => {
  if (formData.value.type == 'LECTURE') {
    getListTeacher()
  } else {
    getStudentTeacher()
  }
}

const changeAccountStatus = async (rowData) => {
  try {
    const dataUpdate = {
      id: rowData.id,
      status: rowData.status == 1 ? false : true,
    }
    const userApiRes = await UserApi.inactiveAccount(dataUpdate)
    if (userApiRes.status == 200) {
      ElMessage({
        message: 'Cập nhật thành công.',
        type: 'success',
      })
      await getList()
      componentKey.value++
      viewMode.value = 'create'
    }
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
      message: `${error.message}`,
      type: 'error',
    })
  }
}

onMounted(async () => {
  await getList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Danh sách Quản lý</h4>
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
            >
              <b-row>
                <b-col md="3">
                  <el-form-item label="Email" prop="">
                    <el-input v-model="formSearchData.email" clearable />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Tên người dùng" prop="">
                    <el-input v-model="formSearchData.username" clearable />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Loại tài khoản" prop="">
                    <el-select
                      v-model="formSearchData.type"
                      placeholder="chọn"
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in typeUserList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Trạng thái" prop="">
                    <el-select
                      v-model="formSearchData.status"
                      placeholder="chọn"
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
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
        <el-table-column prop="username" label="Tên người dùng" />
        <el-table-column prop="email" label="Email" min-width="160px" />
        <!-- <el-table-column prop="listRole" label="Quyền hạn" /> -->
        <el-table-column prop="status_name" label="Trạng thái" align="center">
          <template #default="scope">
            <span
              :class="{
                'bold fw-medium': true,
                'text-success': scope.row.status_name == 'Đã kích hoạt',
                'text-danger': scope.row.status_name == 'Khóa',
              }"
              >{{ scope.row.status_name }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="type" label="Loại tài khoản" align="center">
          <template #default="scope">
            {{
              scope.row.type == 'LECTURE'
                ? 'Giáo viên'
                : scope.row.type == 'STUDENT'
                ? 'Sinh viên'
                : 'Quản trị viên'
            }}
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" align="center">
          <template #default="scope">
            <div>
              <!-- <CButton color="secondary" variant="outline" class="me-2"
                ><CIcon icon="cilFindInPage"
              /></CButton> -->
              <CButton
                color="info"
                variant="outline"
                class="me-2"
                size="sm"
                @click="changeAccountStatus(scope.row)"
                v-if="
                  scope.row.status_name == 'Đã kích hoạt' ||
                  scope.row.status_name == 'Khóa'
                "
                :key="componentKey"
              >
                <CIcon
                  :icon="
                    scope.row.status_name == 'Đã kích hoạt'
                      ? 'cilLockLocked'
                      : 'cilLockUnlocked'
                  "
                />
              </CButton>
              <CButton
                color="danger"
                variant="outline"
                size="sm"
                @click="deleteItem(scope.row)"
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
      title="Thêm mới người dùng"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      width="35%"
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
          <b-col md="12">
            <el-form-item label="Loại tài khoản" prop="type">
              <el-select
                v-model="formData.value.type"
                placeholder="chọn"
                filterable
                @change="changeType"
              >
                <el-option
                  v-for="item in typeUserList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="12" v-if="formData.value.type !== 'OTHER'">
            <el-form-item
              :label="
                formData.value.type == 'LECTURE' ? 'Giáo viên' : 'Sinh viên'
              "
              prop="studentOrLectureId"
            >
              <el-select
                v-model="formData.value.studentOrLectureId"
                placeholder="chọn"
                filterable
                @change="fillStudentCodeOrLectureCode()"
              >
                <el-option
                  v-for="item in dynamicList.value"
                  :key="item.id"
                  :label="item.userInfoDTO.fullName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="12">
            <el-form-item label="Email" prop="email">
              <el-input v-model="formData.value.email" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="12">
            <el-form-item label="Tên người dùng" prop="username">
              <el-input v-model="formData.value.username" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="12">
            <el-form-item label="Mật khẩu" prop="password">
              <el-input
                type="password"
                v-model="formData.value.password"
                autocomplete="off"
              />
            </el-form-item>
          </b-col>
          <b-col md="12">
            <el-form-item label="Nhập lại mật khẩu" prop="confirmPassword">
              <el-input
                type="password"
                v-model="formData.value.confirmPassword"
                autocomplete="off"
              />
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
