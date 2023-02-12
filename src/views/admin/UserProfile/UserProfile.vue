<script setup>
import MethodService from '@/service/MethodService'
import DataService from '@/service/DataService'
import auth from '@/moduleApi/modules/auth'
import FileApi from '@/moduleApi/modules/FileApi'

import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'

import { useStore } from 'vuex'

import modelData from './UserProfileModel'
import UserApi from '@/moduleApi/modules/UserApi'

const workPlaceList = DataService.workPlaceList

const ruleFormRef = ref(FormInstance)
const formData = reactive({
  value: MethodService.copyObject(modelData.dataForm),
})
const validForm = modelData.validForm

const userProfile = reactive({})

const store = useStore()

const userInfo = computed(() => store.state.user)

const imageUrl = ref('')

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const loadImage = ref(false)
const imgSrc = ref('')

const handleRemove = (file) => {
  console.log(file)
  formData.value.avatar = []
}

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const beforeAvatarUpload = (rawFile, file) => {
  console.log('rawFile', rawFile)
  console.log('file', file)
  // if (rawFile.type !== 'image/jpg' || rawFile.type !== 'image/jpeg' || rawFile.type !== 'image/png') {
  //   ElMessage({
  //     title: 'Info',
  //     message: 'Ảnh phải có định dạng là .jpg, .jpeg, .png',
  //     type: 'info',
  //     duration: 3000,
  //   })
  //   return false
  // }
  //  else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error('Avatar picture size can not exceed 2MB!')
  //   return false
  // }
  return true
}

const handleAvatarSuccess = async (response, uploadFile) => {
  console.log('ZOO')
  console.log('response', response)
  console.log('uploadFile', uploadFile)
  // imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // let fd = new FormData()
  // fd.append('image', uploadFile[0].raw, uploadFile[0].raw.name)
  // console.log(fd)
  // const fileApiRes = await FileApi.uploadFile(fd)
  // console.log(fileApiRes)
}

const c = async () => {
  console.log('formData.value.avatar', formData.value.avatar[0].raw.name)
  let fd = new FormData()
  // fd.append(
  //   'filePath',
  //   'https://drive.google.com/drive/folders/1Evc0_Wr5g0ehP9nRPyiSYM_DFXxoHuMm?usp=share_link',
  // )
  // fd.append(
  //   'fileUpload',
  //   formData.value.avatar[0].raw,
  //   formData.value.avatar[0].raw.name,
  // )
  // fd.append('shared', true)

  fd.append(
    'file',
    formData.value.avatar[0].raw,
    formData.value.avatar[0].raw.name,
  )

  axios({
    method: 'post',
    url: 'http://localhost:8084/api/v1/users/upload-avatar',
    data: fd,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization:
        localStorage.getItem('Token') && localStorage.getItem('uid')
          ? 'Bearer ' + localStorage.getItem('Token')
          : '',
    },
  })
    .then(function (response) {
      //handle success
      console.log('success', response)
      // loadImage.value = true
    })
    .catch(function (response) {
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

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const userProfileApiRes = await auth.editUserInfo(formData.value)
        if (userProfileApiRes.status == 200) {
          ElMessage({
            message: 'Cập nhật thành công.',
            type: 'success',
          })
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
    } else {
      console.log('error submit!', fields)
      return
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  viewMode.value = 'create'
}

const _arrayBufferToBase64 = (buffer) => {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

const save = (name, data, type, isBinary = true) => {
  if (isBinary) {
    var bytes = new Array(data.length)
    for (var i = 0; i < data.length; i++) {
      bytes[i] = data.charCodeAt(i)
    }
    data = new Uint8Array(bytes)
  }

  var blob = new Blob([data], { type: type })
  let objectURL = window.URL.createObjectURL(blob)
  let anchor = document.createElement('a')

  anchor.href = objectURL
  anchor.download = name
  anchor.click()

  URL.revokeObjectURL(objectURL)
}

const hexToBase64 = (str) => {
  return window.btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, '')
        .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
        .replace(/ +$/, '')
        .split(' '),
    ),
  )
}

const getUserInfo = async () => {
  try {
    const userProfileApiRes = await auth.getAccount()
    if (userProfileApiRes.status == 200) {
      userProfile.value = userProfileApiRes.data.data
      formData.value = { ...userProfile.value }
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

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h4>Thông tin tài khoản</h4>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="formData.value"
        :rules="validForm"
        label-width="150px"
        label-position="left"
        class="demo-ruleForm"
        status-icon
      >
        <b-row>
          <b-col md="6">
            <el-form-item label="Địa chỉ email" prop="">
              <el-input v-model="formData.value.email" disabled />
            </el-form-item>
            <!-- <el-form-item label="Mật khẩu" prop="password">
              <el-input
                type="password"
                v-model="formData.value.password"
                disabled
              />
            </el-form-item> -->
            <el-form-item label="Số điện thoại" prop="phoneNumber">
              <el-input v-model="formData.value.phoneNumber" />
            </el-form-item>
            <el-form-item label="Họ và tên" prop="fullName">
              <el-input v-model="formData.value.fullName" />
            </el-form-item>
            <el-form-item label="Ngày sinh" prop="dateOfBirth">
              <el-date-picker
                v-model="formData.value.dateOfBirth"
                type="date"
                placeholder="Chọn"
              />
            </el-form-item>
            <el-form-item label="Quê quán" prop="town">
              <el-select v-model="formData.value.town" placeholder="Chọn">
                <el-option
                  v-for="item in workPlaceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Địa chỉ nhà riêng" prop="address">
              <el-input v-model="formData.value.address" type="text" />
            </el-form-item>
            <el-form-item label="Giới tính" prop="gender">
              <el-radio-group v-model="formData.value.gender" class="ml-4">
                <el-radio :label="0" size="large">Nam</el-radio>
                <el-radio :label="1" size="large">Nữ</el-radio>
                <el-radio :label="2" size="large">Khác</el-radio>
              </el-radio-group>
            </el-form-item>
          </b-col>
          <b-col md="6" class="mb-3">
            <!-- <img :src="imgSrc" alt="" class="avatar__image me-4" /> -->
            <!-- <div class="d-flex flex-row align-items-center">
              <el-upload
                v-model:file-list="formData.value.avatar"
                action
                list-type="picture-card"
                limit="1"
                accept=".jpg,.jpeg,.png"
                :auto-upload="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-change="handleAvatarSuccess"
              >
                <el-icon><Plus /></el-icon>

                <template #file="{ file }">
                  <div>
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <el-icon><zoom-in /></el-icon>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <el-icon><Delete /></el-icon>
                      </span>
                    </span>
                  </div>
                </template>
              </el-upload>

              <div class="el-upload__tip ms-3">
                Dạng file .jpg, .jpeg, .png <br />
                dung lượng tối đa là 300KB <br />
                và kích thước tối thiểu 300x300 pixel.
              </div>
            </div>

            <el-button
              v-if="formData.value.avatar && formData.value.avatar.length > 0"
              class="mt-3"
              type="primary"
              @click="c()"
              >Cập nhật ảnh đại diện</el-button
            >

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog> -->
          </b-col>
        </b-row>

        <div class="text-center">
          <CButton color="primary" @click="submitForm(ruleFormRef)">
            Lưu thông tin
          </CButton>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.1s ease;
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
