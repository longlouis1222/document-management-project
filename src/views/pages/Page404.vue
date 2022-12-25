<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const backToPrev = () => {
  router.go(-1)
}
</script>

<template>
  <div
    class="min-vh-100 d-flex flex-row align-items-center"
    style="background: #d8765d"
  >
    <CContainer>
      <div class="w-100 h-100 text-center">
        <img src="../../assets/gifs/404-doc.gif" alt="404" style="width: 80%" />
        <CInputGroup class="input-prepend" style="">
          <CButton @click="backToPrev"
            ><CIcon icon="cil-arrow-left" /> Go back</CButton
          >
        </CInputGroup>
      </div>
    </CContainer>
  </div>
</template>

<style scoped>
.input-group {
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
}

.input-prepend {
  background-color:#44c767;
	-moz-border-radius:16px;
	-webkit-border-radius:16px;
	border-radius:16px;
	border:4px solid #18ab29;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:arial;
	font-size:17px;
  width: 10vw;
	padding:18px 15px;
	text-decoration:none;
	text-shadow:1px 0px 8px #2f6627;
}

.input-prepend:hover {
  background-color:#5cbf2a;
}
</style>
