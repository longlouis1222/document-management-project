<script setup>
const tableData = [
  {
    account: 'Kết Nguyễn',
    password: '********',
    firstname: 'Kết',
    lastname: 'Nguyen',
    username: 'Nguyễn Viết Kết',
    dateOfbirth: '29/06/2000'
  },
  {
    account: 'Kết Nguyễn',
    password: '********',
    firstname: 'Kết',
    lastname: 'Nguyen',
    username: 'Nguyễn Viết Kết',
    dateOfbirth: '29/06/2000'
  },
  {
    account: 'Kết Nguyễn',
    password: '********',
    firstname: 'Kết',
    lastname: 'Nguyen',
    username: 'Nguyễn Viết Kết',
    dateOfbirth: '29/06/2000'
  },
  {
    account: 'Kết Nguyễn',
    password: '********',
    firstname: 'Kết',
    lastname: 'Nguyen',
    username: 'Nguyễn Viết Kết',
    dateOfbirth: '29/06/2000'
  },
  {
    account: 'Kết Nguyễn',
    password: '********',
    firstname: 'Kết',
    lastname: 'Nguyen',
    username: 'Nguyễn Viết Kết',
    dateOfbirth: '29/06/2000'
  },
]
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Danh sách thông tin người dùng</span>
        </div>
      </template>
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="account" label="Tài khoản" width="180" />
        <el-table-column prop="password" label="Mật khẩu" width="180" />
        <el-table-column prop="firstname" label="Tên" />
        <el-table-column prop="lastname" label="Họ" />
        <el-table-column prop="username" label="Tên đầy đủ" min-width="200"/>
        <el-table-column prop="dateOfbirth" label="Ngày sinh" min-width="100" />
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
