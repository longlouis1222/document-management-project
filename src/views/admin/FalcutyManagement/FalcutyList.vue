<script setup>
import MethodService from '@/service/MethodService'
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { FormInstance } from 'element-plus'
import UserApi from '@/moduleApi/modules/UserApi'
import { useRouter } from 'vue-router'

import modelData from './FacultyModel'
import FacultyApi from '@/moduleApi/modules/FacultyApi'

const router = useRouter()
// const route = useRoute()
// const moduleName = 'Danh sách khoa'
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

const componentKey = ref(0)
const statusList = modelData.statusList
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
          const userApiRes = await FacultyApi.create(formData)
          if (userApiRes.status === 200) {
            console.log('create', userApiRes)
          }
        } else if (viewMode.value === 'update') {
          console.log('Update data', formData)
          const userApiRes = await FacultyApi.update(formData)
          if (userApiRes.status === 200) {
            console.log('Update', userApiRes)
            dialogModel.value = false
          }
        }
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
    name: 'Quản lý Khoa',
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
    e.status_name =
      e.status == 1 ? 'Đã kích hoạt' : e.status == 0 ? 'Chưa kích hoạt' : 'Khóa'
  })
  return data
}

const updateItem = async (rowData) => {
  viewMode.value = 'update'
  console.log('formData', formData)
  console.log(rowData)
  formData.id = rowData.id
  formData.name = rowData.name
  formData.code = rowData.code
  formData.specialization = rowData
  const userApiRes = await FacultyApi.update(formData)
  if (userApiRes.status === 200) {
    await getList()
    componentKey.value++
  }
}

const getItemById = async (rowData) => {
  console.log('rowData', rowData)
  const userApiRes = await FacultyApi.findById(rowData.id)
  if (userApiRes.status === 200) {
    console.log('getItemById', userApiRes)
  }
}

const deleteItem = async (rowData) => {
  console.log(rowData)
  ElMessageBox.alert('Bạn có chắc muốn xóa bản ghi này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    callback: async () => {
      const userApiRes = await FacultyApi.delete(rowData.id)
      if (userApiRes.status === 200) {
        await getList()
        console.log(userApiRes)
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

onMounted(async () => {
  // tableRules.total = tableData.length
  // console.log('tableRules.showFormSearch', tableRules.showFormSearch)
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
                <b-col md="4">
                  <el-form-item label="Têm khoa" prop="">
                    <el-input
                      v-model="formSearchData.name"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Mã khoa" prop="">
                    <el-input
                      v-model="formSearchData.code"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Chuyên ngành" prop="">
                    <el-input
                      v-model="formSearchData.specialization"
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
        <el-table-column prop="name" label="Tên khoa" />
        <el-table-column prop="code" label="Mã khoa" />
        <el-table-column prop="specialization" label="Chuyên ngành" />
        <el-table-column prop="address" label="Đơn vị" />
        <el-table-column
          fixed="right"
          align="center"
          label="Thao tác"
          width="180"
        >
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
            <el-form-item label="Tên khoa" prop="name">
              <el-input v-model="formData.name" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Mã khoa" prop="code">
              <el-input v-model="formData.code" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Chuyên ngành" prop="specialization">
              <el-input v-model="formData.specialization" autocomplete="off" />
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
