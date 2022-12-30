<script setup>
import MethodService from '@/service/MethodService'
import WorkplaceApi from '@/moduleApi/modules/WorkplaceApi'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './WorkplaceModel'

const router = useRouter()
const route = useRoute()

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
          const workplaceApiRes = await WorkplaceApi.create(formData)
          if (workplaceApiRes.status === 200) {
            console.log('create', workplaceApiRes)
          }
        } else if (viewMode.value === 'update') {
          console.log('Update data', formData)
          const workplaceApiRes = await WorkplaceApi.update(formData)
          if (workplaceApiRes.status === 200) {
            console.log('Update', workplaceApiRes)
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
    name: 'Quản lý đơn vị',
    query: {
      ...dataFilter,
    },
  })
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const workplaceApiRes = await WorkplaceApi.list(filter)
  if (workplaceApiRes.status === 200) {
    tableRules.data = workplaceApiRes.data.data.data
    tableRules.total = workplaceApiRes.data.data.totalElements
    console.log('getList', workplaceApiRes)
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
  console.log('rowData', rowData)
  const workplaceApiRes = await WorkplaceApi.findById(rowData.id)
  if (workplaceApiRes.status === 200) {
    console.log('getItemById', workplaceApiRes)
  }
}

const deleteItem = async (rowData) => {
  console.log(rowData)
  ElMessageBox.alert('Bạn có chắc muốn xóa bản ghi này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    callback: async () => {
      const workplaceApiRes = await WorkplaceApi.delete(rowData.id)
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
            <h4>Danh sách đơn vị</h4>
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
        <el-table-column prop="name" label="Nơi làm việc" width="180" />
        <el-table-column prop="email" label="Email" width="150" />
        <el-table-column prop="phoneNumber" label="Số điện thoại" />
        <el-table-column prop="address" label="Địa chỉ" />
        <el-table-column
          align="center"
          label="Thao tác"
          width="180"
        >
          <template #default="scope">
            <div class="">
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
      title="Thêm mới đơn vị"
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
