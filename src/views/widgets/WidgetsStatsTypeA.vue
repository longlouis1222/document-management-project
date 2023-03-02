<script setup>
import DashboardApi from '@/moduleApi/modules/DashboardApi'
import { ref, reactive, onMounted } from 'vue'

const dataCount = reactive({ value: [] })
const getList = async () => {
  const res = await DashboardApi.list()
  if (res.status == 200) {
    dataCount.value = res.data.data
  }
}

onMounted(() => {
  getList()
})
</script>

<template>
  <CRow>
    <CRow>
      <CCol :xs="4">
        <CWidgetStatsC
          class="mb-3"
          inverse
          color="primary"
          :progress="{ value: dataCount.value.qtyAssembly }"
          title="Hội đồng"
        >
          <template #icon>
            <div class="d-flex justify-content-between">
              <h1>{{ dataCount.value.qtyAssembly }}</h1>
              <CIcon icon="cilObjectGroup" height="36" />
            </div>
          </template>
        </CWidgetStatsC>
      </CCol>
      <CCol :xs="4">
        <CWidgetStatsC
          class="mb-3"
          inverse
          color="secondary"
          :progress="{ value: dataCount.value.qtyClass }"
          title="Lớp"
        >
          <template #icon>
            <div class="d-flex justify-content-between">
              <h1>{{ dataCount.value.qtyClass }}</h1>
              <CIcon icon="cilWc" height="36" /></div
          ></template>
        </CWidgetStatsC>
      </CCol>
      <CCol :xs="4">
        <CWidgetStatsC
          class="mb-3"
          inverse
          color="success"
          :progress="{ value: dataCount.value.qtyFaculty }"
          title="Khoa"
        >
          <template #icon>
            <div class="d-flex justify-content-between">
              <h1>{{ dataCount.value.qtyFaculty }}</h1>
              <CIcon icon="cilHouse" height="36" />
            </div>
          </template>
        </CWidgetStatsC>
      </CCol>
      <CCol :xs="4">
        <CWidgetStatsC
          class="mb-3"
          inverse
          color="danger"
          :progress="{ value: dataCount.value.qtyLecturer }"
          title="Giáo viên"
        >
          <template #icon
            ><div class="d-flex justify-content-between">
              <h1>{{ dataCount.value.qtyLecturer }}</h1>
              <CIcon icon="cilUser" height="36" /></div
          ></template>
        </CWidgetStatsC>
      </CCol>
      <CCol :xs="4">
        <CWidgetStatsC
          class="mb-3"
          inverse
          color="warning"
          :progress="{ value: dataCount.value.qtyStudent }"
          title="Sinh viên"
        >
          <template #icon>
            <div class="d-flex justify-content-between">
              <h1>{{ dataCount.value.qtyStudent }}</h1>
              <CIcon icon="cilMoodGood" height="36" />
            </div>
          </template>
        </CWidgetStatsC>
      </CCol>
      <!-- <CCol :xs="4">
        <CWidgetStatsC
          class="mb-3"
          inverse
          color="info"
          :progress="{ value: dataCount.value.qtyStudentNotPass }"
          title="Sinh viên không đạt"
        >
          <template #icon>
            <div class="d-flex justify-content-between">
              <h1>{{ dataCount.value.qtyStudentNotPass }}</h1>
              <CIcon icon="cilMoodBad" height="36" />
            </div>
          </template>
        </CWidgetStatsC>
      </CCol>
      <CCol :xs="4">
        <CWidgetStatsC
          class="mb-3"
          inverse
          color="dark"
          :progress="{ value: dataCount.value.qtyStudentPass }"
          title="Sinh viên đạt"
        >
          <template #icon>
            <div class="d-flex justify-content-between">
              <h1>{{ dataCount.value.qtyStudentPass }}</h1>
              <CIcon icon="cilMoodGood" height="36" />
            </div>
          </template>
        </CWidgetStatsC>
      </CCol> -->
      <CCol :xs="4">
        <CWidgetStatsC
          class="mb-3"
          inverse
          color="info"
          :progress="{ value: dataCount.value.qtyTopic }"
          title="Đề tài"
        >
          <template #icon>
            <div class="d-flex justify-content-between">
              <h1>{{ dataCount.value.qtyTopic }}</h1>
              <CIcon icon="cilNewspaper" height="36" />
            </div>
          </template>
        </CWidgetStatsC>
      </CCol>
      <!-- <CCol :xs="4">
        <CWidgetStatsC
          class="mb-3"
          inverse
          color="primary"
          :progress="{ value: dataCount.value.qtyTopicNotPass }"
          title="Đề tài không duyệt"
        >
          <template #icon>
            <div class="d-flex justify-content-between">
              <h1>{{ dataCount.value.qtyTopicNotPass }}</h1>
              <CIcon icon="cilReportSlash" height="36" />
            </div>
          </template>
        </CWidgetStatsC>
      </CCol>
      <CCol :xs="4">
        <CWidgetStatsC
          class="mb-3"
          inverse
          color="warning"
          :progress="{ value: dataCount.value.qtyTopicPass }"
          title="Đề tài đã duyệt"
        >
          <template #icon>
            <div class="d-flex justify-content-between">
              <h1>{{ dataCount.value.qtyTopicPass }}</h1>
              <CIcon icon="cilShareBoxed" height="36" />
            </div>
          </template>
        </CWidgetStatsC>
      </CCol> -->
    </CRow>
  </CRow>
</template>
