<script setup>
import MethodService from '@/service/MethodService'
import CategoryApi from '@/moduleApi/modules/CategoryApi'
import TopicApi from '@/moduleApi/modules/TopicApi'
import StudentApi from '@/moduleApi/modules/StudentApi'

import { ElMessageBox, ElMessage } from 'element-plus'

import { useRoute, useRouter } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeaderLanding from '@/components/AppHeaderLanding.vue'
import { ref, reactive, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

const visibledDialogIframe = ref(false)
const linkIframe = ref()
const textSearch = ref('')
const dialogCategory = ref(false)
const topicList = reactive({ value: [] })
const categoryList = reactive({ value: [] })
const allCategoryList = reactive({ value: [] })
const topic = ref(null)

const bannerList = [
  {
    id: 1,
    src: require('../../assets/banner/2.jpg'),
  },
  {
    id: 2,
    src: require('../../assets/banner/kien-2.jpg'),
  },
  {
    id: 3,
    src: require('../../assets/banner/19A09005-tckt-04.jpg'),
  },
]

const backToPrev = () => {
  router.go(-1)
}

const goToDashboard = () => {
  router.push({ name: 'Dashboard' })
}

const search = () => {
  console.log('Search...')
}

const getCategoryList = async (isAll) => {
  let dataFilter = {
    size: 9999999,
  }
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const categoryApiRes = await CategoryApi.list(isAll ? filter : '')
  if (categoryApiRes.status === 200 && !isAll) {
    categoryList.value = categoryApiRes.data.data.data
  } else if (categoryApiRes.status === 200 && isAll) {
    allCategoryList.value = categoryApiRes.data.data.data
  }
}

const getTopicList = async (categoryId) => {
  let dataFilter = {
    categoryId: categoryId ? categoryId : '',
    size: 9999999,
  }
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const res = await TopicApi.list(filter)
  if (res.status === 200) {
    topicList.value = res.data.data.data
  }
}

const getTopicById = async () => {
  const res = await TopicApi.findById(route.params.id)
  if (res.status === 200) {
    topic.value = res.data.data
    console.log('topic', topic.value)
  }
}

const openDialog = async () => {
  await getCategoryList(true)
  dialogCategory.value = true
}

const registerProject = async () => {
  try {
    const res = await StudentApi.registryTopic(route.params.id)
    if (res.status === 200) {
      ElMessage({
        type: 'success',
        message: `Đăng ký thành công`,
      })
      await getTopicById()
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: `${error}.`,
    })
  }
}
const viewFile = async (file) => {
  try {
    const res = await TopicApi.downloadFile(file.id)
    if (res.status === 200) {
      console.log(res.data)
      const blob = new Blob([res.data], {
        type: 'application/pdf',
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
  await getTopicById()
  getCategoryList()
  await getTopicList()
})
</script>

<template>
  <div class="min-vh-100">
    <AppHeaderLanding />

    <!-- Start Company recruitment BLock -->
    <CContainer xl class="mt-4 mb-4 company_recruitment_block">
      <b-row>
        <b-col md="8" v-if="topic">
          <CCard>
            <CCardHeader component="h5"
              >Chi tiết đồ án: {{ topic.name ? topic.name : '' }}</CCardHeader
            >
            <CCardBody>
              <p>Chủ đề: {{ topic.categoryName ? topic.categoryName : '' }}</p>
              <p>Mô tả: {{ topic.description ? topic.description : '' }}</p>
              <p>Sinh viên thực hiện: {{ topic.stdNumber ? topic.stdNumber : '' }}</p>
              <p>Giảng viên hướng dẫn: {{ topic.lecturerGuideDTO && topic.lecturerGuideDTO.fullName ? topic.lecturerGuideDTO.fullName : '' }}</p>
              <p>
                Giảng viên phản biện:
                {{ topic.lecturerCounterArgumentDTO && topic.lecturerCounterArgumentDTO.fullName ? topic.lecturerCounterArgumentDTO.fullName : '' }}
              </p>
              <p>Năm thực hiện: {{ topic.year ? new Date(topic.year).getFullYear() : '' }}</p>
              <p v-if="topic.fileDTOS && topic.fileDTOS.length > 0">Bản mềm:
                <ul class="p-0 list-file">
                  <li class="item-file"
                    v-for="(item, i) in topic.fileDTOS
                      ? topic.fileDTOS
                      : []"
                    :key="i"
                    @click="viewFile(item)">
                      {{ item.name }}
                  </li>
                </ul>
              </p>
              <p
                class="text-right"
                style="width: fit-content"
                @click="backToPrev"
              >
                <em> &lt;&lt; Quay lại</em>
              </p>
              <CButton
                color="info"
                size="sm"
                @click="registerProject"
                v-if="!topic.studentRegistry"
                >Chưa đăng ký đề tài</CButton
              >
              <CButton
                color="success"
                size="sm"
                @click="registerProject"
                :disabled="topic.studentRegistry"
                v-if="topic.studentRegistry"
                >Đã đăng ký đề tài</CButton
              >
            </CCardBody>
          </CCard>
          <CCard class="mt-3">
            <CCardHeader component="h5">Bình luận</CCardHeader>
            <CCardBody> </CCardBody>
          </CCard>
        </b-col>
        <b-col md="4">
          <h4>Tìm kiếm</h4>
          <el-divider />
          <el-input
            v-model="textSearch"
            autocomplete="off"
            @keyup.enter="search"
          />
          <el-divider />
          <h5>Chủ đề tiêu biểu</h5>
          <el-divider />
          <CListGroup class="mb-3">
            <CListGroupItem @click="backToPrev"> Tất cả chủ đề </CListGroupItem>
            <CListGroupItem
              v-for="item in categoryList.value"
              :key="item.id"
              component="a"
              @click="backToPrev"
              >{{ item.name }}</CListGroupItem
            >
          </CListGroup>
          <CLink @click="openDialog">Xem thêm</CLink>
        </b-col>
      </b-row>
    </CContainer>
    <!-- End Company recruitment BLock -->

    <AppFooter />

    <CModal
      :visible="dialogCategory"
      scrollable
      size="lg"
      @close="
        () => {
          dialogCategory = false
        }
      "
    >
      <CModalHeader>
        <CModalTitle>Danh sách chủ đề</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CListGroup class="mb-3">
          <CListGroupItem
            v-for="item in allCategoryList.value"
            :key="item.id"
            component="a"
            @click="backToPrev"
            >{{ item.name }}</CListGroupItem
          >
        </CListGroup>
      </CModalBody>
    </CModal>

    <el-dialog
      v-model="visibledDialogIframe"
      title="Xem chi tiết tài liệu"
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
.card {
  transition: 0.2s ease;
  box-shadow: 0 2px 3px 0px #bebebe;
}

.list-file {
  display: inline-flex;
}

.item-file {
  margin-left: 20px;
  padding: 5px 20px;
  background: #98bc9887;
  border-radius: 6px;
  width: 50%;
}
</style>
