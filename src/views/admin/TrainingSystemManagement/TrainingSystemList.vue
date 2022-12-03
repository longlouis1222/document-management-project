<script setup>
const tableData = [
  {
    name: 'Đại học',
    code: 'MA123',
  },
  {
    name: 'Đại học',
    code: 'MA123',
  },
  {
    name: 'Đại học',
    code: 'MA123',
  },
  {
    name: 'Đại học',
    code: 'MA123',
  },
  {
    name: 'Đại học',
    code: 'MA123',
  },
]
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Danh sách thông tin hệ đào tạo</span>
        </div>
      </template>
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="name" label="Tên hệ đào tạo" min-width="180" />
        <el-table-column prop="code" label="Mã hệ đào tạo" min-width="180" align="center" />
        <el-table-column fixed="right" align="center" label="Thao tác" width="180">
          <template #default>
            <div class="d-flex">
              <CButton color="secondary" variant="outline" class="me-2"
                ><CIcon icon="cilFindInPage"
              /></CButton>
              <CButton color="info" variant="outline" class="me-2"
                ><CIcon icon="cilPencil"
              /></CButton>
              <CButton color="danger" variant="outline"
                ><CIcon icon="cilTrash"
              /></CButton>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
</style>
