<script setup>
const tableData = [
  {
    name: 'Phần mềm quản lý đồ án',
    reviewer_teacher: 'Nguyễn Viết Kết, Nguyễn Huy Long',
    username: 'Nguyễn Hi Hi',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.'
  },
  {
    name: 'Phần mềm quản lý đồ án',
    reviewer_teacher: 'Nguyễn Viết Kết, Nguyễn Huy Long',
    username: 'Nguyễn Hi Hi',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.'
  },
  {
    name: 'Phần mềm quản lý đồ án',
    reviewer_teacher: 'Nguyễn Viết Kết, Nguyễn Huy Long',
    username: 'Nguyễn Hi Hi',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.'
  },
  {
    name: 'Phần mềm quản lý đồ án',
    reviewer_teacher: 'Nguyễn Viết Kết, Nguyễn Huy Long',
    username: 'Nguyễn Hi Hi',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.'
  },
  {
    name: 'Phần mềm quản lý đồ án',
    reviewer_teacher: 'Nguyễn Viết Kết, Nguyễn Huy Long',
    username: 'Nguyễn Hi Hi',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.'
  },
  {
    name: 'Phần mềm quản lý đồ án',
    reviewer_teacher: 'Nguyễn Viết Kết, Nguyễn Huy Long',
    username: 'Nguyễn Hi Hi',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.'
  },
]
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Danh sách thông tin đồ án</span>
        </div>
      </template>
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="name" label="Tên đề tài" width="180" />
        <el-table-column prop="reviewer_teacher" label="Gv.Phản biện & Hội đồng" width="190" />
        <el-table-column prop="username" label="Người thực hiện" min-width="140"/>
        <el-table-column prop="info" label="Thông tin" min-width="200" />
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
