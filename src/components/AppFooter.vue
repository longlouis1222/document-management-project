<template>
  <div class="footer mt-3 p-3">
    <!-- <div>
      <a href="https://coreui.io" target="_blank">CoreUI</a>
      <span class="ms-1"
        >&copy; {{ new Date().getFullYear() }} creativeLabs.</span
      >
    </div>
    <div class="ms-auto">
      <span class="me-1" target="_blank">Powered by</span>
      <a href="https://coreui.io/vue">CoreUI for Vue</a>
    </div> -->
    <b-row>
      <b-col md="5">
        <div class="d-flex flex-column align-items-center">
          <img
            src="../assets/images/logo-KT.png"
            alt="logo-KT.png"
            class="logo-KT float-end mb-3"
          />
          <h5>Trường Đại học Kiến trúc Hà Nội</h5>
        </div>
      </b-col>
      <b-col md="7">
        <h6>Liên hệ</h6>
        <el-divider />
        <div class="card__subtitle">
          <span class="text-black-50 me-1"
            ><CIcon icon="cilPhone" size="lg"/></span>
          <span>024 3854 1616</span>
        </div>
        <div class="card__subtitle">
          <span class="text-black-50 me-1"
            ><CIcon icon="cilLocationPin" size="lg"/></span>
          <span
            >số 18 Lũy Bán Bích, Phường Tân Thới Hòa, Quận Tân Phú, TP.HCM</span
          >
        </div>
        <div class="card__subtitle">
          <span class="text-black-50 me-1"
            ><CIcon icon="cilEnvelopeClosed" size="lg"/></span>
          <span>Email: ketmax121@gmail.com</span>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style lang="scss" scoped>
.footer {
  display: block !important;
}
.logo-KT {
  width: 20%;
  border-radius: 15px;
}
</style>
