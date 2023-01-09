<script setup>
import { useRouter } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeaderLanding from '@/components/AppHeaderLanding.vue'
// import AppFooterLanding from '@/components/AppFooterLanding.vue'
import { onMounted } from 'vue'

const router = useRouter()

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

onMounted(() => {
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
                  ? 'object-position: bottom 190px right 0px;'
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
          <h4>Danh sách đồ án</h4>
          <b-row>
            <b-col md="4">
              <CCard>
                <CCardBody>
                  <CCardTitle>Đồ án 01</CCardTitle>
                  <CCardText>Đề tài: Quản lý đồ án Đại học Kiến Trúc Hà Nội.</CCardText>
                  <CButton color="light" size="sm" href="#">Xem chi tiết</CButton>
                </CCardBody>
              </CCard>
            </b-col>
            <b-col md="4">
              <CCard>
                <CCardBody>
                  <CCardTitle>Đồ án 01</CCardTitle>
                  <CCardText>Đề tài: Quản lý đồ án Đại học Kiến Trúc Hà Nội.</CCardText>
                  <CButton color="light" size="sm">Xem chi tiết</CButton>
                </CCardBody>
              </CCard>
            </b-col>
            <b-col md="4">
              <CCard>
                <CCardBody>
                  <CCardTitle>Đồ án 01</CCardTitle>
                  <CCardText>Đề tài: Quản lý đồ án Đại học Kiến Trúc Hà Nội.</CCardText>
                  <CButton color="light" size="sm">Xem chi tiết</CButton>
                </CCardBody>
              </CCard>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col md="4">
              <CCard>
                <CCardBody>
                  <CCardTitle>Đồ án 01</CCardTitle>
                  <CCardText>Đề tài: Quản lý đồ án Đại học Kiến Trúc Hà Nội.</CCardText>
                  <CButton color="light" size="sm">Xem chi tiết</CButton>
                </CCardBody>
              </CCard>
            </b-col>
            <b-col md="4">
              <CCard>
                <CCardBody>
                  <CCardTitle>Đồ án 01</CCardTitle>
                  <CCardText>Đề tài: Quản lý đồ án Đại học Kiến Trúc Hà Nội.</CCardText>
                  <CButton color="light" size="sm">Xem chi tiết</CButton>
                </CCardBody>
              </CCard>
            </b-col>
            <b-col md="4">
              <CCard>
                <CCardBody>
                  <CCardTitle>Đồ án 01</CCardTitle>
                  <CCardText>Đề tài: Quản lý đồ án Đại học Kiến Trúc Hà Nội.</CCardText>
                  <CButton color="light" size="sm">Xem chi tiết</CButton>
                </CCardBody>
              </CCard>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col md="4">
              <CCard>
                <CCardBody>
                  <CCardTitle>Đồ án 01</CCardTitle>
                  <CCardText>Đề tài: Quản lý đồ án Đại học Kiến Trúc Hà Nội.</CCardText>
                  <CButton color="light" size="sm">Xem chi tiết</CButton>
                </CCardBody>
              </CCard>
            </b-col>
            <b-col md="4">
              <CCard>
                <CCardBody>
                  <CCardTitle>Đồ án 01</CCardTitle>
                  <CCardText>Đề tài: Quản lý đồ án Đại học Kiến Trúc Hà Nội.</CCardText>
                  <CButton color="light" size="sm">Xem chi tiết</CButton>
                </CCardBody>
              </CCard>
            </b-col>
            <b-col md="4">
              <CCard>
                <CCardBody>
                  <CCardTitle>Đồ án 01</CCardTitle>
                  <CCardText>Đề tài: Quản lý đồ án Đại học Kiến Trúc Hà Nội.</CCardText>
                  <CButton color="light" size="sm">Xem chi tiết</CButton>
                </CCardBody>
              </CCard>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="4">
          <h4>Tìm kiếm</h4>
        </b-col>
      </b-row>
    </CContainer>
    <!-- End Company recruitment BLock -->

    <!-- <AppFooter /> -->
  </div>
</template>

<style lang="scss" scoped>
.card {
  transition: .2s ease;
  &:hover {
    border: 1px solid #15234775;
    box-shadow: 0 2px 3px 0px #bebebe;
  }
}
</style>
