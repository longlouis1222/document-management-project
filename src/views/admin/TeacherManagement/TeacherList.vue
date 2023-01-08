<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import FacultyApi from '@/moduleApi/modules/FacultyApi'
import TeacherApi from '@/moduleApi/modules/TeacherApi'

import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './TeacherModel'

const defaultFilter = DataService.defaultFilter

const router = useRouter()
const moduleName = 'Quản lý Giáo viên'
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

const genderList = DataService.genderList
const certificationList = DataService.certificationList

const dialogModel = ref(false)
const viewMode = ref('create')
const facultyList = reactive({ value: [] })

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
          const teacherApiRes = await TeacherApi.create(formData.value)
          if (teacherApiRes.status === 200) {
            ElMessage({
              message: 'Thêm mới thành công.',
              type: 'success',
            })
            dialogModel.value = false
          }
        } else if (viewMode.value === 'update') {
          console.log('Update data', formData.value)
          const teacherApiRes = await TeacherApi.update(formData.value)
          if (teacherApiRes.status === 200) {
            console.log('Update', teacherApiRes)
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
      try {
        tableRules.filters = formSearchData.value
        console.log('tableRules.filters', tableRules.filters)
        tableRules.skip = 0
        tableRules.page = 1
        await getList()
      } catch (error) {
        console.log(error)
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
  const teacherApiRes = await TeacherApi.list(filter)
  if (teacherApiRes.status === 200) {
    tableRules.data = await changeData(teacherApiRes.data.data.data)
    tableRules.total = teacherApiRes.data.data.totalElements
    console.log('getList', teacherApiRes)
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
  viewMode.value = type
  if (type == 'update') {
    dialogModel.value = true
    getItemById(rowData.id)
  } else if (type == 'delete') {
    deleteItem(rowData.id)
  }
}

const getItemById = async (id) => {
  console.log('id', id)
  const teacherApiRes = await TeacherApi.findById(id)
  if (teacherApiRes.status === 200) {
    dialogModel.value = true
    let res = teacherApiRes.data.data
    formData.value = res
    formData.value.fullName = res.userInfoDTO.fullName
    formData.value.gender =
      res.userInfoDTO.gender == 'Nam'
        ? 0
        : res.userInfoDTO.gender == 'Nữ'
        ? 1
        : 2
    formData.value.dateOfBirth = res.userInfoDTO.dateOfBirth
    formData.value.phoneNumber = res.userInfoDTO.phoneNumber
    formData.value.address = res.userInfoDTO.address
    formData.value.town = res.userInfoDTO.town
  }
}

const deleteItem = async (id) => {
  console.log('deleteItem', id)
  ElMessageBox.alert('Bạn có chắc muốn xóa bản ghi này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    callback: async () => {
      const teacherApiRes = await TeacherApi.delete(id)
      if (teacherApiRes.status === 200) {
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

const getListFaculty = async () => {
  const facultyApiRes = await FacultyApi.list()
  if (facultyApiRes.status === 200) {
    facultyList.value = facultyApiRes.data.data.data
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

onMounted(async () => {
  await getListFaculty()
  await getList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Danh sách giáo viên</h4>
            <div>
              <CButton color="primary" class="me-2" @click="toggleSearchBox"
                ><CIcon icon="cilSearch" class="me-2" />Tra cứu</CButton
              >
              <CButton color="primary" @click="openDialogAddItem"
                >Thêm mới</CButton
              >
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
                  <el-form-item label="Mã giáo viên" prop="">
                    <el-input
                      v-model="formSearchData.value.codeLecture"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Họ và tên" prop="">
                    <el-input
                      v-model="formSearchData.value.fullName"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Giới tính" prop="">
                    <el-select
                      v-model="formSearchData.value.gender"
                      placeholder="chọn"
                      filterable
                      clearable
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
                  <el-form-item label="Ngày sinh" prop="">
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
                  <el-form-item label="Địa chỉ" prop="">
                    <el-input
                      v-model="formSearchData.value.address"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Bằng cấp" prop="">
                    <el-select
                      v-model="formSearchData.value.degree"
                      placeholder="chọn"
                      filterable
                      clearable
                    >
                      <el-option
                        v-for="item in certificationList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Đơn vị" prop="">
                    <el-select
                      v-model="formSearchData.value.facultyId"
                      placeholder="chọn"
                      filterable
                      clearable
                    >
                      <el-option
                        v-for="item in facultyList.value"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Quê quán" prop="">
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
          prop="codeLecture"
          label="Mã giáo viên"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="userInfoDTO.fullName"
          label="Họ và tên"
          min-width="150"
        />
        <el-table-column
          prop="userInfoDTO.gender"
          label="Giới tính"
          min-width="80"
          align="center"
        >
          <template #default="scope">
            {{
              scope.row.userInfoDTO.gender == 0
                ? 'Nam'
                : scope.row.userInfoDTO.gender == 1
                ? 'Nữ'
                : 'Khác'
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="date_of_birth"
          label="Ngày sinh"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="userInfoDTO.address"
          label="Địa chỉ"
          min-width="150"
        />
        <el-table-column prop="degree" label="Bằng cấp" min-width="150" />
        <el-table-column
          prop="facultyDTO.name"
          label="Đơn vị"
          min-width="150"
        />
        <el-table-column prop="regency" label="Chức vụ" min-width="150" />
        <el-table-column
          prop="userInfoDTO.town"
          label="Quê quán"
          min-width="150"
        />
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
      title="Thêm mới giáo viên"
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
            <el-form-item label="Mã giáo viên" prop="codeLecture">
              <el-input
                v-model="formData.value.codeLecture"
                autocomplete="off"
              />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Họ và tên" prop="fullName">
              <el-input v-model="formData.value.fullName" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
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
          <b-col md="3">
            <el-form-item label="Ngày sinh" prop="dateOfBirth">
              <el-date-picker
                v-model="formData.value.dateOfBirth"
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
                v-model="formData.value.phoneNumber"
                autocomplete="off"
              />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Địa chỉ" prop="address">
              <el-input v-model="formData.value.address" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Bằng cấp" prop="degree">
              <el-select
                v-model="formData.value.degree"
                placeholder="chọn"
                filterable
              >
                <el-option
                  v-for="item in certificationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Đơn vị" prop="facultyId">
              <el-select
                v-model="formData.value.facultyId"
                placeholder="chọn"
                filterable
              >
                <el-option
                  v-for="item in facultyList.value"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <el-form-item label="Chức vụ" prop="regency">
              <el-input v-model="formData.value.regency" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="6">
            <el-form-item label="Quê quán" prop="town">
              <el-input v-model="formData.value.town" autocomplete="off" />
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
