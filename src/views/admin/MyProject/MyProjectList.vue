<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import TeacherApi from '@/moduleApi/modules/TeacherApi'
import TopicApi from '@/moduleApi/modules/TopicApi'
import CategoryApi from '@/moduleApi/modules/CategoryApi'
import StudentApi from '@/moduleApi/modules/StudentApi'
import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import modelData from './MyProjectModel'
import FileApi from '@/moduleApi/modules/FileApi'

const defaultFilter = DataService.defaultFilter

const router = useRouter()
const moduleName = 'Đề tài của tôi'
const ruleFormRef = ref(FormInstance)
const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const visibledDialogIframe = ref(false)
const linkIframe = ref()
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
const topicRegistryList = reactive({ value: [] })

const topicId = ref(null)
const fileList = ref([])

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
        await getListTopicRegistry()
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
        tableRules.filters = formSearchData.value
        tableRules.skip = 0
        tableRules.page = 1
        await getListTopicRegistry()
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const getListTopicRegistry = async () => {
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
  const res = await StudentApi.getListTopicRegistry(filter)
  if (res.status === 200) {
    tableRules.data = await changeData(res.data.data.data)
    tableRules.total = res.data.data.totalElements
  }
}

const changeData = (data) => {
  data.forEach((e) => {
    e.year = new Date(e.year).getFullYear()
    e.status = e.status == true ? 'Đạt' : 'Không đạt'
    e.statusTopic = e.statusTopic == 'APPROVED' ? 'Đã duyệt' : 'Chờ duyệt'
  })
  return data
}

const handle = async (type, rowData) => {
  viewMode.value = type
  if (type == 'upload') {
    // dialogModel.value = true
    // formData.value = rowData
    // formData.value.status = rowData.status == 'Đạt' ? true : false
    // formData.value.year = new Date().setFullYear(rowData.year)
    fileList.value = []
    topicId.value = rowData.id
    dialogModel.value = true
  } else if (type == 'delete') {
    viewMode.value = 'delete'
    deleteItem(rowData.id)
  } else if (type == 'view') {
    await getListFile(rowData.fileIds)
    topicId.value = rowData.id
    dialogModel.value = true
  }
}

const getListFile = async (arrFileId) => {
  try {
    const res = await FileApi.getFileByListId({ fieldIds: arrFileId })
    if (res.status === 200) {
      fileList.value = res.data.data.map((file) => ({
        name: file.name,
        url: file.link,
      }))
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
        await getListTopicRegistry()
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

const getListCategory = async () => {
  try {
    const categoryApiRes = await CategoryApi.list(defaultFilter)
    if (categoryApiRes.status === 200) {
      categoryList.value = categoryApiRes.data.data.data
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
  getListTopicRegistry()
}
const fn_tableSortChange = (column, tableSort) => {
  tableSort = tableRules
  MethodService.tableSortChange(column, tableSort)
  // getService();
}

const backToPrev = () => {
  router.push({
    name: 'Landing page',
  })
}

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview = (uploadFile) => {
  console.log(uploadFile)
  window.open(uploadFile.url)
}

const handleExceed = (files, uploadFiles) => {
  ElMessage.warning(`Giới hạn file tải lên là ${files.length}`)
}

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Bạn có chắc chắn muốn xóa ${uploadFile.name} ?`,
  ).then(
    () => true,
    () => false,
  )
}

const uploadFileToDb = async () => {
  if (!fileList.value || (fileList.value && fileList.value.length == 0)) {
    ElMessage.warning(`Vui lòng tải lên ít nhất 1 file.`)
    return
  }
  let fd = new FormData()
  for (let i = 0; i < fileList.value.length; i++) {
    fd.append('fileUpload', fileList.value[i].raw, fileList.value[i].raw.name)
  }
  fd.append('topicId', topicId.value)

  console.log('fd', fd)
  // const fileApiRes = await FileApi.uploadFile(fd)
  // console.log(fileApiRes)

  axios({
    method: 'post',
    url: 'http://localhost:8084/api/v1/topics/upload-local',
    data: fd,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization:
        localStorage.getItem('Token') && localStorage.getItem('uid')
          ? 'Bearer ' + localStorage.getItem('Token')
          : '',
    },
  })
    .then(async (response) => {
      //handle success
      console.log('success', response)
      dialogModel.value = false
      fileList.value = []
      await getListTopicRegistry()
      ElMessage.success(`Tải lên file thành công.`)
    })
    .catch((response) => {
      //handle error
      console.log('error', response)
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
        type: 'error',
        message: `Có lỗi xảy ra.`,
      })
    })
}

const downloadFile = async (file) => {
  try {
    const res = await TopicApi.downloadFile(file.id)
    if (res.status === 200) {
      const a = document.createElement('a')
      const url = window.URL.createObjectURL(new Blob([res.data]))
      a.href = url
      a.download = file.name
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: `Có lỗi xảy ra.`,
    })
  }
}

const viewFile = async (file) => {
  try {
    const res = await TopicApi.downloadFile(file.id)
    if (res.status === 200) {
      console.log(res.data)
      const blob = new Blob([res.data], {
        type: 'application/pdf'
      })
      const url = URL.createObjectURL(blob)
      console.log(url)
      visibledDialogIframe.value = true
      linkIframe.value = url
    }
  } catch (error) {
    console.log(error)
    ElMessage({
      type: 'error',
      message: `Tệp không đúng định dạng`,
    })
  }
}

onMounted(async () => {
  await getListTeacher()
  await getListCategory()
  await getListTopicRegistry()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <h4>Danh sách đồ án của tôi</h4>
            <div>
              <CButton
                color="primary"
                variant="outline"
                class="me-2"
                @click="backToPrev"
                >Quay lại</CButton
              >
              <CButton color="primary" class="me-2" @click="toggleSearchBox"
                ><CIcon icon="cilSearch" class="me-2" />Tra cứu</CButton
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
                <b-col md="4">
                  <el-form-item label="Tên đồ án" prop="">
                    <el-input
                      v-model="formSearchData.value.topicName"
                      autocomplete="off"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item
                    label="Giáo viên phản biện"
                    prop="lecturerCounterArgumentId"
                  >
                    <el-select
                      v-model="formSearchData.value.lecturerCounterArgumentId"
                      placeholder="chọn"
                      filterable
                      clearable
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
                    label="Giáo viên hướng dẫn"
                    prop="lecturerGuideId"
                  >
                    <el-select
                      v-model="formSearchData.value.lecturerGuideId"
                      placeholder="chọn"
                      filterable
                      clearable
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
                      v-model="formSearchData.value.year"
                      type="year"
                      format="YYYY"
                      placeholder="Chọn"
                    />
                  </el-form-item>
                </b-col>
                <b-col md="4">
                  <el-form-item label="Chủ đề" prop="categoryId">
                    <el-select
                      v-model="formSearchData.value.categoryId"
                      placeholder="chọn"
                      filterable
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
                  <el-form-item label="Mô tả" prop="description">
                    <el-input
                      v-model="formSearchData.value.description"
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
        <el-table-column prop="categoryName" label="Chủ đề" width="120" />
        <el-table-column
          prop="lecturerCounterArgumentDTO.fullName"
          label="Giáo viên phản biện"
          width="120"
        />
        <el-table-column
          prop="lecturerGuideDTO.fullName"
          label="Giáo viên hướng dẫn"
          width="120"
        />
        <el-table-column
          prop="scoreAssembly"
          label="Điểm hội đồng"
          min-width="100"
        />
        <el-table-column
          prop="scoreCounterArgument"
          label="Điểm phản biện"
          min-width="100"
        />
        <el-table-column
          prop="scoreGuide"
          label="Điểm hướng dẫn"
          min-width="100"
        />
        <el-table-column
          prop="scoreProcessOne"
          label="Điểm kiểm tra tiến độ lần 1"
          min-width="120"
        />
        <el-table-column
          prop="scoreProcessTwo"
          label="Điểm kiểm tra tiến độ lần 2"
          min-width="120"
        />
        <!-- <el-table-column
          prop="statusTopic"
          label="Trạng thái"
          min-width="100"
        /> -->
        <el-table-column prop="year" label="Năm Thực hiện" min-width="120" />
        <el-table-column prop="description" label="Thông tin" min-width="200" />
        <el-table-column label="Tài liệu" min-width="200">
          <template #default="scope">
            <ul class="p-0">
              <li
                v-for="(item, i) in scope.row.fileDTOS
                  ? scope.row.fileDTOS
                  : []"
                :key="i"
                @click="downloadFile(item)"
              >
                - {{ item.name }}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="Xem tài liệu" min-width="200">
          <template #default="scope">
            <ul class="p-0">
              <li
                v-for="(item, i) in scope.row.fileDTOS
                  ? scope.row.fileDTOS
                  : []"
                :key="i"
                @click="viewFile(item)"
              >
                - {{ item.name }}
              </li>
            </ul>
          </template>
        </el-table-column>
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
                @click="handle('upload', scope.row)"
                ><CIcon icon="cilCloudUpload"
              /></CButton>
              <!-- <CButton
                color="info"
                variant="outline"
                size="sm"
                @click="handle('view', scope.row)"
                ><CIcon icon="cilPaperclip"
              /></CButton> -->
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
      title="Thêm file đính kèm"
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
        <div class="text-center">
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            action
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="5"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :disabled="viewMode !== 'upload'"
          >
            <template #trigger>
              <CButton v-if="viewMode == 'upload'" color="info"
                >Tải file lên</CButton
              >
            </template>

            <template #tip>
              <div class="el-upload__tip">
                File tải lên có dung lượng tối đa 500kb
              </div>
            </template>
          </el-upload>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <CButton
            v-if="viewMode == 'upload'"
            color="primary"
            @click="uploadFileToDb"
            >Cập nhật</CButton
          >
        </span>
      </template>
    </el-dialog>
    <!-- End dialog -->

    <el-dialog
      v-model="visibledDialogIframe"
      title="Xem tải liệu đề tài"
      width="60%"
      top="2vh"
    >
      <iframe
        :src="linkIframe"
        frameborder="0"
        width="100%"
        height="800px"
      ></iframe>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
</style>
