<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import TeacherApi from '@/moduleApi/modules/TeacherApi'
import TopicApi from '@/moduleApi/modules/TopicApi'
import CategoryApi from '@/moduleApi/modules/CategoryApi'

import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './TopicOfLectureModel'

const defaultFilter = DataService.defaultFilter

const router = useRouter()
const moduleName = 'Đề tài sinh viên đăng ký'
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

const topicStatusList = DataService.topicStatusList

const dialogModel = ref(false)
const viewMode = ref('create')
const teacherList = reactive({ value: [] })
const categoryList = reactive({ value: [] })

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
        await resetForm(formEl)
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
  formData.value = MethodService.copyObject(modelData.dataForm)
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
  const topicApiRes = await TeacherApi.getListTopicStudentAssign(filter)
  if (topicApiRes.status === 200) {
    tableRules.data = await changeData(topicApiRes.data.data.data)
    tableRules.total = topicApiRes.data.data.totalElements
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
  approveTopic(rowData)
}

const approveTopic = async (rowData) => {
  if (!rowData) return
  try {
    const dataApprove = {
      studentId: rowData.studentId,
      topicId: rowData.topicId,
    }
    const dataParams = MethodService.filterTable(JSON.stringify(dataApprove))
    const res = await TeacherApi.approveTopic(dataParams)
    if (res.status === 200) {
      ElMessage({
        type: 'success',
        message: `Duyệt đề tài thành công.`,
      })
      await getList()
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
  try {
    const teacherApiRes = await TeacherApi.list(defaultFilter)
    if (teacherApiRes.status === 200) {
      teacherList.value = teacherApiRes.data.data.data
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errorMessage) {
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

const getListCategory = async () => {
  try {
    const categoryApiRes = await CategoryApi.list(defaultFilter)
    if (categoryApiRes.status === 200) {
      categoryList.value = categoryApiRes.data.data.data
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errorMessage) {
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
            <h4>Danh sách đề tài sinh viên đăng ký</h4>
            <div>
              <CButton color="primary" class="me-2" @click="toggleSearchBox"
                ><CIcon icon="cilSearch" class="me-2" />Tra cứu</CButton
              >
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
              :model="formSearchData.value"
              :rules="formSearchValid"
              label-width="140px"
              label-position="top"
              class="demo-ruleForm"
              status-icon
              @submit.prevent="submitFormSearch(ruleFormRef)"
            >
              <b-row>
                <b-col md="6">
                  <el-form-item label="Tên đề tài" prop="topicName">
                    <el-input
                      v-model="formSearchData.value.topicName"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>

                <b-col md="6">
                  <el-form-item label="Tên sinh viên" prop="studentName">
                    <el-input
                      v-model="formSearchData.value.studentName"
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
        <el-table-column prop="topicName" label="Tên đề tài" min-width="150" />
        <el-table-column prop="studentName" label="Sinh viên" min-width="120" />
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
                @click="handle('', scope.row)"
                :disabled="scope.row.statusApprove"
                ><CIcon icon="cilCheck"
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
            <el-form-item label="Tên đồ án" prop="name">
              <el-input
                v-model="formData.value.name"
                autocomplete="off"
                disabled
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Điểm phản biện" prop="scoreCounterArgument">
              <el-input
                v-model="formData.value.scoreCounterArgument"
                autocomplete="off"
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Điểm hướng dẫn" prop="scoreGuide">
              <el-input
                v-model="formData.value.scoreGuide"
                autocomplete="off"
                disabled
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Trạng thái" prop="status">
              <el-select
                v-model="formData.value.status"
                placeholder="chọn"
                filterable
                disabled
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
                v-model="formData.value.stdNumber"
                autocomplete="off"
                disabled
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Giáo viên hướng dẫn" prop="lecturerGuideId">
              <el-select
                v-model="formData.value.lecturerGuideId"
                placeholder="chọn"
                filterable
                disabled
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
            <el-form-item
              label="Giáo viên phản biện"
              prop="lecturerCounterArgumentId"
            >
              <el-select
                v-model="formData.value.lecturerCounterArgumentId"
                placeholder="chọn"
                filterable
                disabled
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
                disabled
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Chủ đề" prop="categoryId">
              <el-select
                v-model="formData.value.categoryId"
                placeholder="chọn"
                filterable
                disabled
              >
                <el-option
                  v-for="item in categoryList.value"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item
              label="Điểm kiểm tra tiến độ lần 1"
              prop="scoreProcessOne"
            >
              <el-input
                v-model="formData.value.scoreProcessOne"
                type="text"
                placeholder=""
                disabled
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item
              label="Điểm kiểm tra tiến độ lần 2"
              prop="scoreProcessTwo"
            >
              <el-input
                v-model="formData.value.scoreProcessTwo"
                type="text"
                placeholder=""
                disabled
              />
            </el-form-item>
          </b-col>
          <b-col md="4">
            <el-form-item label="Mô tả" prop="description">
              <el-input
                v-model="formData.value.description"
                autocomplete="off"
                disabled
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
