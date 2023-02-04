<script setup>
import MethodService from '@/service/MethodService'
import CategoryApi from '@/moduleApi/modules/CategoryApi'
import TopicApi from '@/moduleApi/modules/TopicApi'
import { useRouter } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeaderLanding from '@/components/AppHeaderLanding.vue'
import { ref, reactive, onMounted } from 'vue'
import modelData from '../admin/GraduationProjectManagement/GraduationProjectModel'

const router = useRouter()

const tableRules = reactive(MethodService.copyObject(modelData.tableRules))
const textSearch = ref('')
const dialogCategory = ref(false)
const categoryList = reactive({ value: [] })
const allCategoryList = reactive({ value: [] })
const topicList = reactive({ value: [] })

const bannerList = [
  {
    id: 1,
    src: require('../../assets/banner/Baner50namkXD2022.jpeg'),
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

const search = async () => {
  try {
    console.log('Search...',tableRules.dataSearch.value.name)
    tableRules.filters = { name: tableRules.dataSearch.value.name}
    tableRules.skip = 0
    tableRules.page = 1
    await getTopicList()
  } catch (error) {
    console.log(error)
  }
}

const getTopicList = async (categoryId) => {
  let dataFilter = {
    limit: tableRules.limit,
    skip: tableRules.skip,
    page: tableRules.page > 0 ? tableRules.page - 1 : tableRules.page,
    categoryId: categoryId ? categoryId : '',
    ...tableRules.filters,
  }
  router.replace({
    name: 'Landing page',
    query: {
      ...dataFilter,
    },
  })
  const filter = MethodService.filterTable(JSON.stringify(dataFilter))
  const res = await TopicApi.list(filter)
  if (res.status === 200) {
    topicList.value = res.data.data.data
    tableRules.total = res.data.data.totalElements
  }
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

const openDialog = async () => {
  await getCategoryList(true)
  dialogCategory.value = true
}

const goToDetail = (id) => {
  router.push({ name: 'Project detail', params: { id: id } })
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
  getTopicList()
}
onMounted(() => {
  getTopicList()
  getCategoryList()
})
</script>

<template>
  <div class="min-vh-100">
    <AppHeaderLanding />
    <!-- Start Carousel -->
    <CContainer xxl>
      <div class="block text-center">
        <el-carousel height="475px">
          <el-carousel-item
            v-for="item in bannerList"
            :key="item.id"
            class="banner"
          >
            <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
            <img
              :src="item.src"
              :alt="item.src"
              class="banner__img"
              :style="
                item.id == 1 || item.id == 5
                  ? 'object-position: bottom 0px right 0px;'
                  : item.id == 3
                  ? 'object-position: bottom 100px right 0px;'
                  : item.id == 4
                  ? 'object-position: bottom 500px right 0px;'
                  : ''
              "
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </CContainer>
    <!-- End Carousel -->

    <!-- Start Company recruitment BLock -->
    <CContainer xl class="mt-4 company_recruitment_block">
      <b-row>
        <b-col md="8">
          <h4 class="mb-3">Danh sách đồ án</h4>
          <el-divider />
          <b-row>
            <b-col
              class="mb-4"
              md="4"
              v-for="(item, i) in topicList.value"
              :key="item.id"
            >
              <CCard>
                <CCardBody>
                  <CCardTitle>{{ i + 1 }}. {{ item.name }}</CCardTitle>
                  <CCardText>Mô tả: {{ item.description }}.</CCardText>
                  <CButton color="light" size="sm" @click="goToDetail(item.id)"
                    >Xem chi tiết</CButton
                  >
                  <CButton class="btn-registry" color="success" size="sm" v-if="item.studentRegistry">Đã đăng ký</CButton>
                  <CButton class="btn-registry" color="primary" size="sm" v-if="!item.studentRegistry">Chưa đăng ký</CButton>
                </CCardBody>
              </CCard>
            </b-col>
          </b-row>
          <div class="d-flex justify-content-center mt-3 mb-3">
            <el-pagination
              small
              v-model:currentPage="tableRules.page"
              v-model:pageSize="tableRules.limit"
              :page-sizes="tableRules.lengthMenu"
              background
              layout="sizes, prev, pager, next, total"
              :total="Number(tableRules.total)"
              @size-change="fn_tableSizeChange"
              @current-change="fn_tableCurentChange"
              @prev-click="fn_tablePrevClick"
              @next-click="fn_tableNextClick"
            />
          </div>
        </b-col>
        <b-col md="4">
          <h4>Tìm kiếm</h4>
          <el-divider />
          <el-input
            v-model="tableRules.dataSearch.value.name"
            autocomplete="off"
            @keyup.enter="search"
            placeholder="Nhập tên đề tài rồi Enter để tìm kiếm"
          />
          <el-divider />
          <h5>Chủ đề tiêu biểu</h5>
          <el-divider />
          <CListGroup class="mb-3">
            <CListGroupItem @click="getTopicList()">
              Tất cả chủ đề
            </CListGroupItem>

            <CListGroupItem
              v-for="item in categoryList.value"
              :key="item.id"
              component="a"
              @click="getTopicList(item.id)"
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
            @click="getTopicList(item.id)"
            >{{ item.name }}</CListGroupItem
          >
        </CListGroup>
      </CModalBody>
    </CModal>
  </div>
</template>

<style lang="scss" scoped>
.btn-registry {
  margin-left: 5px;
}
.card {
  transition: 0.2s ease;
  &:hover {
    border: 1px solid #15234775;
    box-shadow: 0 2px 3px 0px #bebebe;
  }
}
</style>
