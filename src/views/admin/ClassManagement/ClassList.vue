<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import FacultyApi from '@/moduleApi/modules/FacultyApi'
import ClassApi from '@/moduleApi/modules/ClassApi'

import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './ClassModel'

const router = useRouter()
// const route = useRoute()
const moduleName = 'Quản lý Lớp'
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
          const classApiRes = await ClassApi.create(formData.value)
          if (classApiRes.status === 200) {
            ElMessage({
              message: 'Thêm mới thành công.',
              type: 'success',
            })
            dialogModel.value = false
          }
        } else if (viewMode.value === 'update') {
          console.log('Update data', formData.value)
          const classApiRes = await ClassApi.update(formData.value)
          if (classApiRes.status === 200) {
            console.log('Update', classApiRes)
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
  const classApiRes = await ClassApi.list(filter)
  if (classApiRes.status === 200) {
    tableRules.data = await changeData(classApiRes.data.data.data)
    tableRules.total = classApiRes.data.data.totalElements
    console.log('getList', classApiRes)
  }
}

const changeData = (data) => {
  data.forEach((e) => {})
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
  const classApiRes = await ClassApi.findById(id)
  if (classApiRes.status === 200) {
    formData.value = classApiRes.data.data
  }
}

const deleteItem = async (id) => {
  ElMessageBox.alert('Bạn có chắc muốn xóa bản ghi này ?', 'Cảnh báo', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'Đồng ý',
    callback: async () => {
      const classApiRes = await ClassApi.delete(id)
      if (classApiRes.status === 200) {
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
        <div class="d-flex justify-content-between">
          <h4>Danh sách thông tin lớp</h4>
          <div>
            <CButton color="primary" class="me-2" @click="toggleSearchBox"
              ><CIcon icon="cilSearch" class="me-2" />Tra cứu</CButton
            >
            <CButton color="primary" @click="openDialogAddItem"
              >Thêm mới</CButton
            >
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
                  <el-form-item label="Mã lớp" prop="">
                    <el-input
                      v-model="formSearchData.value.code"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Tên lớp" prop="">
                    <el-input
                      v-model="formSearchData.value.name"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="3">
                  <el-form-item label="Khoa" prop="facultyId">
                    <el-select
                      v-model="formData.value.facultyId"
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
                  <el-form-item label="Số lượng" prop="">
                    <el-input
                      v-model="formSearchData.value.stdNumber"
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
        <el-table-column prop="code" label="Mã lớp" />
        <el-table-column prop="name" label="Tên lớp" min-width="180" />
        <el-table-column prop="facultyDTO.name" label="Khoa" min-width="120" />
        <el-table-column prop="stdNumber" label="Số lượng" min-width="120" />
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
      title="Thêm mới Lớp"
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
            <el-form-item label="Mã lớp" prop="code">
              <el-input v-model="formData.value.code" autocomplete="off" />
            </el-form-item>
          </b-col>
          <b-col md="3">
            <el-form-item label="Tên lớp" prop="name">
              <el-input v-model="formData.value.name" autocomplete="off" />
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
          <b-col md="3">
            <el-form-item label="Số lượng sinh viên" prop="stdNumber">
              <el-input v-model="formData.value.stdNumber" autocomplete="off" />
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
