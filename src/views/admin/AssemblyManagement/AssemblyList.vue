<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import AssemblyApi from '@/moduleApi/modules/AssemblyApi'
import TeacherApi from '@/moduleApi/modules/TeacherApi'
import TopicApi from '@/moduleApi/modules/TopicApi'
import ExcelApi from '@/moduleApi/modules/ExcelApi'

import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './AssemblyModel'

const route = useRoute()
const router = useRouter()
const moduleName = 'Quản lý Hội đồng'

const defaultFilter = DataService.defaultFilter

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

const dialogModel = ref(false)
const viewMode = ref('create')

const lectureList = reactive({ value: [] })
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
          const assemblyApiRes = await AssemblyApi.create(formData.value)
          if (assemblyApiRes.status === 200) {
            ElMessage({
              message: 'Thêm mới thành công.',
              type: 'success',
            })
            dialogModel.value = false
          }
        } else if (viewMode.value === 'update') {
          const assemblyApiRes = await AssemblyApi.update(formData.value)
          if (assemblyApiRes.status === 200) {
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
    ...tableRules.filters,
  }
  router.replace({
    name: moduleName,
    query: {
      ...dataFilter,
    },
  })
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const assemblyApiRes = await AssemblyApi.list(filter)
  if (assemblyApiRes.status === 200) {
    tableRules.data = await changeData(assemblyApiRes.data.data.data)
    tableRules.total = assemblyApiRes.data.data.totalElements
  }
}

const changeData = (data) => {
  data.forEach((e) => {
    if (e.lecturerDTOS && e.lecturerDTOS.length > 0) {
      let a = []
      e.lecturerDTOS.forEach((l) => {
        a.push(l.fullName)
      })
      e.lecture_name = a.join(', ')
    }

    if (e.topicNames && e.topicNames.length > 0) {
      let a = []
      e.topicNames.forEach((l) => {
        a.push(l)
      })
      e.topic_name = a.join(', ')
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
    const facultyApiRes = await AssemblyApi.findById(id)
    if (facultyApiRes.status === 200) {
      // console.log('getItemById', facultyApiRes)
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
      const assemblyApiRes = await AssemblyApi.delete(id)
      if (assemblyApiRes.status === 200) {
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

const getLectureList = async () => {
  try {
    const lectureApiRes = await TeacherApi.list(defaultFilter)
    if (lectureApiRes.status === 200) {
      lectureList.value = lectureApiRes.data.data.data
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

const getTopicList = async () => {
  try {
    const topicApiRes = await TopicApi.list(defaultFilter)
    if (topicApiRes.status === 200) {
      topicList.value = topicApiRes.data.data.data
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
  const res = ExcelApi.exportExcelfile('assembly')
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

onMounted(async () => {
  await getTopicList()
  await getLectureList()
  await getList()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="d-flex justify-content-between">
          <h4>Danh sách Hội đồng</h4>
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
                <b-col md="12">
                  <el-form-item label="Tên hội đồng" prop="nameAssembly">
                    <el-input
                      v-model="formSearchData.value.nameAssembly"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="6">
                  <el-form-item
                    label="Chủ tịch hội đồng"
                    prop="lecturePresidentId"
                  >
                    <el-select
                      v-model="formSearchData.value.lecturePresidentId"
                      placeholder="chọn"
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in lectureList.value"
                        :key="item.id"
                        :label="item.userInfoDTO.fullName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col md="6">
                  <el-form-item
                    label="Thư ký hội đồng"
                    prop="lectureSecretaryId"
                  >
                    <el-select
                      v-model="formSearchData.value.lectureSecretaryId"
                      placeholder="chọn"
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in lectureList.value"
                        :key="item.id"
                        :label="item.userInfoDTO.fullName"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </b-col>
                <!-- <b-col md="4">
                  <el-form-item label="Điểm" prop="score">
                    <el-input
                      v-model="formSearchData.value.score"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col> -->
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
          prop="nameAssembly"
          label="Tên hội đồng"
          min-width="100"
        />
        <el-table-column
          prop="lecturePresidentName"
          label="Chủ tịch hội đồng"
          min-width="100"
        />
        <el-table-column
          prop="lectureSecretaryName"
          label="Thư ký hội đồng"
          min-width="100"
        />
        <el-table-column
          prop="lecture_name"
          label="Thành viên hội đồng"
          min-width="150"
        >
          <template #default="scope">
            <ul class="p-0">
              <li
                v-for="(item, i) in scope.row.lecturerDTOS
                  ? scope.row.lecturerDTOS
                  : []"
                :key="i"
              >
                - {{ item.fullName }}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column prop="topic_name" label="Đồ án" min-width="250">
          <template #default="scope">
            <ul class="p-0">
              <li
                v-for="(item, i) in scope.row.topicNames
                  ? scope.row.topicNames
                  : []"
                :key="i"
              >
                - {{ item }}
              </li>
            </ul>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="score" label="Điểm" /> -->
        <el-table-column align="center" label="Thao tác" width="120">
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
      title="Thêm mới Hội đồng"
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
        <b-row>
          <b-col md="12">
            <el-form-item label="Tên hội đồng" prop="nameAssembly">
              <el-input
                v-model="formData.value.nameAssembly"
                autocomplete="off"
              />
            </el-form-item>
          </b-col>
          <b-col md="12">
            <el-form-item label="Chủ tịch hội đồng" prop="lecturePresidentId">
              <el-select
                v-model="formData.value.lecturePresidentId"
                placeholder="chọn"
                clearable
                filterable
              >
                <el-option
                  v-for="item in lectureList.value"
                  :key="item.id"
                  :label="item.userInfoDTO.fullName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="12">
            <el-form-item label="Thư ký hội đồng" prop="lectureSecretaryId">
              <el-select
                v-model="formData.value.lectureSecretaryId"
                placeholder="chọn"
                clearable
                filterable
              >
                <el-option
                  v-for="item in lectureList.value"
                  :key="item.id"
                  :label="item.userInfoDTO.fullName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="12">
            <el-form-item label="Giáo viên" prop="idLectures">
              <el-select
                v-model="formData.value.idLectures"
                placeholder="chọn"
                multiple
                filterable
                clearable
              >
                <el-option
                  v-for="item in lectureList.value"
                  :key="item.id"
                  :label="item.userInfoDTO.fullName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="12">
            <el-form-item label="Đồ án" prop="idTopics">
              <el-select
                v-model="formData.value.idTopics"
                placeholder="chọn"
                multiple
                filterable
                clearable
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
          <!-- <b-col md="12">
            <el-form-item label="Điểm" prop="score">
              <el-input v-model="formData.value.score" autocomplete="off" />
            </el-form-item>
          </b-col> -->
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
