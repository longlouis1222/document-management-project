<template>
  <CHeader position="sticky" class="mb-1">
    <CContainer fluid>
      <!-- <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler> -->
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <img
            src="../assets/images/logo-KT.png"
            alt="logo-KT.png"
            class="logo-KT"
          />
        </CNavItem>
        <CNavItem>
          <div class="d-flex flex-column justify-content-start text-white mt-4">
            <h2>TRƯỜNG ĐẠI HỌC KIẾN TRÚC HÀ NỘI</h2>
            <h4>HANOI ARCHITECTURAL UNIVERSITY</h4>
          </div>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <CNavItem v-if="!isLogin">
          <CButton color="primary" @click="goToLogin" class="px-4"
            >Đăng nhập</CButton
          >
        </CNavItem>

        <CNavItem v-if="isLogin" @click="goToMyProject" class="text-white fw-bold mt-2 me-3">
          Đề xuất đề tài
        </CNavItem>
        <CNavItem v-if="isLogin" @click="goToMyProject" class="text-white fw-bold mt-2 me-3">
          Đề tài của tôi
        </CNavItem>
        <CNavItem v-if="isLogin" @click="goToProjectList" class="text-white fw-bold mt-2 me-3">
          Đề tài đăng ký
        </CNavItem>
        <div class="d-flex align-items-center" style="border: 1px solid #fff; border-radius: 8px; background-color: #fff; padding: 4px; margin-top: -4px;">
          <p class="mb-0 ms-2 fw-bold" style="color: #152347;" v-if="userInfo"> {{ userInfo.fullName ? userInfo.fullName : '' }}</p>
          <AppHeaderDropdownAccnt v-if="isLogin" />
        </div>
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script setup>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/assets/brand/logo'
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted, computed } from 'vue'
import auth from '@/moduleApi/modules/auth'
// import { useStore } from 'vuex'
// const store = useStore()

const router = useRouter()
const userInfo = ref(null)
const isLogin = localStorage.getItem('uid')

const goToLogin = () => {
  router.push({ name: 'Login' })
}

const goToMyProject = () => {
  router.push({ name: 'Đề tài của tôi' })
}

const goToProjectList = () => {
  router.push({ name: 'Đề tài đăng ký' })
}

const getUserInfo = async () => {
  if (!localStorage.getItem('uid')) return
  const res = await auth.getAccount()
  if (res.status == 200) {
    userInfo.value = res.data.data
  }
}
onMounted(async () => {
  await getUserInfo()
})

</script>
<style lang="scss" scoped>
.logo-KT {
  width: 55%;
  border-radius: 15px;
}
.header {
  background: #152347;
}
</style>
