<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import WorkplaceApi from '@/moduleApi/modules/WorkplaceApi'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './WorkplaceModel'

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
    name: 'Qu???n l?? ????n v???',
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
  ElMessageBox.alert('B???n c?? ch???c mu???n x??a b???n ghi n??y ?', 'C???nh b??o', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '?????ng ??',
    callback: async () => {
      const workplaceApiRes = await WorkplaceApi.delete(rowData.id)
      if (workplaceApiRes.status === 200) {
        await getList()
        console.log(workplaceApiRes)
      }

      ElMessage({
        type: 'success',
        message: `X??a th??nh c??ng`,
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
  await getList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Danh s??ch ????n v???</h4>
            <div>
              <CButton color="primary" class="me-2" @click="toggleSearchBox"
                ><CIcon icon="cilSearch" class="me-2" /> Tra c???u</CButton
              >
              <CButton color="primary" @click="openDialogAddItem"
                >Th??m m???i</CButton
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
                  <el-form-item label="T??n ????n v???" prop="name">
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
                  <el-form-item label="S??? ??i???n tho???i" prop="phoneNumber">
                    <el-input
                      v-model="formSearchData.phoneNumber"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="?????a ch???" prop="address">
                    <el-input
                      v-model="formSearchData.address"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
              </b-row>
              <div class="text-center">
                <CButton color="primary" @click="submitFormSearch(ruleFormRef)"
                  >T??m ki???m</CButton
                >
              </div>
            </el-form>
          </el-card>
        </b-collapse>
      </div>

      <el-table :data="tableRules.data">
        <el-table-column prop="name" label="N??i l??m vi???c" width="180" />
        <el-table-column prop="email" label="Email" width="150" />
        <el-table-column prop="phoneNumber" label="S??? ??i???n tho???i" />
        <el-table-column prop="address" label="?????a ch???" />
        <el-table-column
          align="center"
          label="Thao t??c"
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
      title="Th??m m???i ????n v???"
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
            <el-form-item label="T??n ????n v???" prop="name">
              <el-input v-model="formData.name" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Email" prop="email">
              <el-input v-model="formData.email" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="S??? ??i???n tho???i" prop="phoneNumber">
              <el-input v-model="formData.phoneNumber" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="?????a ch???" prop="address">
              <el-input v-model="formData.address" autocomplete="off" />
            </el-form-item>
          </b-col>
        </b-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <CButton color="primary" @click="submitForm(ruleFormRef)">{{
            viewMode === 'create' ? 'Th??m m???i' : 'C???p nh???t'
          }}</CButton>
        </span>
      </template>
    </el-dialog>
    <!-- End dialog -->
  </div>
</template>

<style lang="scss" scoped>
</style>
