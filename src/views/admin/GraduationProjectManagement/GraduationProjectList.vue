<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import TeacherApi from '@/moduleApi/modules/TeacherApi'
import TopicApi from '@/moduleApi/modules/TopicApi'

import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './GraduationProjectModel'

const router = useRouter()
// const route = useRoute()
const moduleName = 'Quản lý Đồ án'
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

const topicStatusList = DataService.topicStatusList

const dialogModel = ref(false)
const viewMode = ref('create')
const teacherList = reactive({ value: [] })

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
          const topicApiRes = await TopicApi.create(formData.value)
          if (topicApiRes.status === 200) {
            ElMessage({
              message: 'Thêm mới thành công.',
              type: 'success',
            })
            dialogModel.value = false
          }
        } else if (viewMode.value === 'update') {
          console.log('Update data', formData.value)
          const topicApiRes = await TopicApi.update(formData.value)
          if (topicApiRes.status === 200) {
            console.log('Update', topicApiRes)
            ElMessage({
              message: 'Cập nhật thành công.',
              type: 'success',
            })
            dialogModel.value = false
          }
        }
        resetForm(formEl)
        viewMode.value = 'create'
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
}

const submitFormSearch = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        tableRules.filters = formSearchData
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
  const topicApiRes = await TopicApi.list(filter)
  if (topicApiRes.status === 200) {
    tableRules.data = await changeData(topicApiRes.data.data.data)
    tableRules.total = topicApiRes.data.data.totalElements
    console.log('getList', topicApiRes)
  }
}

const changeData = (data) => {
  data.forEach((e) => {
    e.year = new Date(e.year).getFullYear()
    e.status = e.status == true ? 'Đạt' : 'Không đạt'
  })
  return data
}

const handle = (type, rowData) => {
  if (type == 'update') {
    viewMode.value = 'update'
    dialogModel.value = true
    formData.value = rowData
    formData.value.status = rowData.status == 'Đạt' ? true : false
    formData.value.year = new Date().setFullYear(rowData.year)
  } else if (type == 'delete') {
    viewMode.value = 'delete'
    deleteItem(rowData.id)
  }
}

const getItemById = async (id) => {
  const topicApiRes = await TopicApi.findById(id)
  if (topicApiRes.status === 200) {
  }
}

const deleteItem = async (id) => {
  ElMessageBox.alert('Bạn có chắc muốn xóa bản ghi này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    callback: async () => {
      const topicApiRes = await TopicApi.delete(id)
      if (topicApiRes.status === 200) {
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

const getListTeacher = async () => {
  const teacherApiRes = await TeacherApi.list()
  if (teacherApiRes.status === 200) {
    teacherList.value = teacherApiRes.data.data.data
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
  await getListTeacher()
  await getList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Danh sách thông tin đồ án</h4>
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
              :model="formSearchData"
              :rules="formSearchValid"
              label-width="140px"
              label-position="top"
              class="demo-ruleForm"
              status-icon
              @submit.prevent="submitFormSearch(ruleFormRef)"
            >
              <b-row>
                <b-col md="4">
                  <el-form-item label="Tên đồ án" prop="name">
                    <el-input
                      v-model="formSearchData.name"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Điểm" prop="score">
                    <el-input
                      v-model="formSearchData.score"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Trạng thái" prop="status">
                    <el-select
                      v-model="formSearchData.status"
                      placeholder="chọn"
                      filterable
                    >
                      <el-option
                        v-for="item in topicStatusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Số lượng sinh viên" prop="stdNumber">
                    <el-input
                      v-model="formSearchData.stdNumber"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Giáo viên" prop="lecturerId">
                    <el-select
                      v-model="formSearchData.lecturerId"
                      placeholder="chọn"
                      filterable
                    >
                      <el-option
                        v-for="item in teacherList.value"
                        :key="item.id"
                        :label="item.userInfoDTO.fullName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Năm" prop="year">
                    <el-date-picker
                      v-model="formSearchData.year"
                      type="year"
                      format="YYYY"
                      placeholder="Chọn"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="12">
                  <el-form-item label="Mô tả" prop="description">
                    <el-input
                      v-model="formSearchData.description"
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
        <el-table-column prop="name" label="Tên đề tài" width="150" />
        <el-table-column prop="lecturerId" label="Giáo viên" width="120" />
        <el-table-column prop="score" label="Điểm" min-width="60" />
        <el-table-column prop="status" label="Trạng thái" min-width="100" />
        <el-table-column
          prop="stdNumber"
          label="Số lượng sinh viên"
          min-width="150"
        />
        <el-table-column prop="year" label="Năm" min-width="80" />
        <el-table-column prop="description" label="Thông tin" min-width="200" />
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
      title="Thêm mới đồ án"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      width="80%"
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
            <el-form-item label="Tên đồ án" prop="name">
              <el-input v-model="formData.value.name" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Điểm" prop="score">
              <el-input v-model="formData.value.score" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Trạng thái" prop="status">
              <el-select
                v-model="formData.value.status"
                placeholder="chọn"
                filterable
              >
                <el-option
                  v-for="item in topicStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Số lượng sinh viên" prop="stdNumber">
              <el-input v-model="formData.value.stdNumber" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Giáo viên" prop="lecturerId">
              <el-select
                v-model="formData.value.lecturerId"
                placeholder="chọn"
                filterable
              >
                <el-option
                  v-for="item in teacherList.value"
                  :key="item.id"
                  :label="item.userInfoDTO.fullName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Năm" prop="year">
              <el-date-picker
                v-model="formData.value.year"
                type="year"
                format="YYYY"
                placeholder="Chọn"
              />
            </el-form-item>
          </b-col>
          <b-col md="12">
            <el-form-item label="Mô tả" prop="description">
              <el-input
                v-model="formData.value.description"
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
