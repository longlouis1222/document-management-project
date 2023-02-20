<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import TopicApi from '@/moduleApi/modules/TopicApi'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FormInstance } from 'element-plus'
import ExcelApi from '@/moduleApi/modules/ExcelApi'

import modelData from './StatisticalScoreModel'

const defaultFilter = DataService.defaultFilter

const router = useRouter()
const ruleFormRef = ref(FormInstance)
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive(MethodService.copyObject(modelData.dataForm))
const formValid = reactive(MethodService.copyObject(modelData.validForm))
const formSearchData = reactive(
  MethodService.copyObject(tableRules.dataSearch.value),
)
const formSearchValid = reactive(
  MethodService.copyObject(tableRules.dataSearch.valid),
)

const dialogModel = ref(false)
const viewMode = ref('create')

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
          const workplaceApiRes = await TopicApi.create(formData)
          if (workplaceApiRes.status === 200) {
            console.log('create', workplaceApiRes)
          }
        } else if (viewMode.value === 'update') {
          console.log('Update data', formData)
          const workplaceApiRes = await TopicApi.update(formData)
          if (workplaceApiRes.status === 200) {
            console.log('Update', workplaceApiRes)
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
    name: 'Quản lý Thống kê điểm',
    query: {
      ...dataFilter,
    },
  })
  // const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const topicApiRes = await TopicApi.getStatisticalScore()
  if (topicApiRes.status === 200) {
    tableRules.data = topicApiRes.data.data.data
    tableRules.total = topicApiRes.data.data.totalElements
    console.log('getList', topicApiRes)
  }
}

const updateItem = (rowData) => {
  viewMode.value = 'update'
  console.log('formData', formData)
  console.log(rowData)
  dialogModel.value = true
  formData.id = rowData.id
  formData.name = rowData.name
  formData.email = rowData.email
  formData.phoneNumber = rowData.phoneNumber
  formData.address = rowData.address
}

const getItemById = async (rowData) => {
  try {
    const workplaceApiRes = await TopicApi.findById(rowData.id)
    if (workplaceApiRes.status === 200) {
      console.log('getItemById', workplaceApiRes)
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
      const workplaceApiRes = await TopicApi.delete(rowData.id)
      if (workplaceApiRes.status === 200) {
        await getList()
        console.log(workplaceApiRes)
      }

      ElMessage({
        type: 'success',
        message: `Xóa thành công`,
      })
    },
  })
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

const exportExcel = async () => {
  const a = document.createElement('a')
  let dataFilter = {
    ...tableRules.filters
  }
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const res = ExcelApi.exportExcelfile('statistical', filter)
  a.href = res
  a.click()
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
            <h4>Danh sách Thống kê điểm</h4>
            <div>
              <CButton color="primary" class="me-2" @click="toggleSearchBox"
                ><CIcon icon="cilSearch" class="me-2" /> Tra cứu</CButton
              >
              <CButton
                color="info"
                variant="outline"
                class="ms-2"
                @click="exportExcel"
                ><CIcon icon="cilCloudDownload"
              /></CButton>
              <!-- <CButton color="primary" @click="openDialogAddItem"
                >Thêm mới</CButton
              > -->
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
                  <el-form-item label="Tên đơn vị" prop="name">
                    <el-input
                      v-model="formSearchData.name"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Email" prop="email">
                    <el-input
                      v-model="formSearchData.email"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Số điện thoại" prop="phoneNumber">
                    <el-input
                      v-model="formSearchData.phoneNumber"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Địa chỉ" prop="address">
                    <el-input
                      v-model="formSearchData.address"
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

      <el-table :data="tableRules.data">
        <el-table-column prop="nameClass" label="Lớp" width="180" />
        <el-table-column prop="nameStudent" label="Sinh viên" width="150" />
        <el-table-column prop="nameTopic" label="Tên đề tài" />
        <el-table-column prop="scoreAssembly" label="Điểm hội đồng" />
        <el-table-column prop="scoreCounterArgument" label="Điểm phản biện" />
        <el-table-column prop="scoreGuide" label="Điểm hướng dẫn" />
        <el-table-column
          prop="scoreProcessOne"
          label="Điểm kiểm tra tiến độ lần 1"
        />
        <el-table-column
          prop="scoreProcessTwo"
          label="Điểm kiểm tra tiến độ lần 2"
        />
        <el-table-column prop="scoreMedium" label="Điểm trung bình" />
        <el-table-column prop="topicYear" label="Năm thực hiện">
          <template #default="scope">
            {{ new Date(scope.row.topicYear).getFullYear() }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          label="Thao tác"
          width="180"
        >
          <template #default="scope">
            <div class=""> -->
        <!-- <CButton color="secondary" variant="outline" class="me-2"
                ><CIcon icon="cilFindInPage"
              /></CButton> -->
        <!-- <CButton
                color="info"
                variant="outline"
                class="me-2"
                size="sm"
                @click="updateItem(scope.row)"
                ><CIcon icon="cilPencil"
              /></CButton>
              <CButton
                color="danger"
                variant="outline"
                size="sm"
                @click="deleteItem(scope.row)"
                ><CIcon icon="cilTrash"
              /></CButton>
            </div>
          </template>
        </el-table-column> -->
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
      title="Thêm mới đơn vị"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      width="80%"
      @close="resetForm(ruleFormRef)"
    >
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="formValid"
        label-width="140px"
        label-position="top"
        class="demo-ruleForm"
        status-icon
      >
        <b-row>
          <b-col md="3">
            <el-form-item label="Tên đơn vị" prop="name">
              <el-input v-model="formData.name" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Email" prop="email">
              <el-input v-model="formData.email" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Số điện thoại" prop="phoneNumber">
              <el-input v-model="formData.phoneNumber" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Địa chỉ" prop="address">
              <el-input v-model="formData.address" autocomplete="off" />
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
