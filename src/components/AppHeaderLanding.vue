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
        <CNavItem>
          <CButton color="primary" @click="goToLogin" class="px-4"
            >Đăng nhập</CButton
          >
        </CNavItem>
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script setup>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/assets/brand/logo'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToLogin = () => {
  router.push({ name: 'Login'})
}
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
