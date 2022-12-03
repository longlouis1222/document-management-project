<script setup>
const tableData = [
  {
    name: 'Kết Nguyễn',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
    board: 'Công nghệ thông tin',
    specialized: 'Công nghệ thông tin',
  },
  {
    name: 'Kết Nguyễn',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
    board: 'Công nghệ thông tin',
    specialized: 'Công nghệ thông tin',
  },
  {
    name: 'Kết Nguyễn',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
    board: 'Công nghệ thông tin',
    specialized: 'Công nghệ thông tin',
  },
  {
    name: 'Kết Nguyễn',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
    board: 'Công nghệ thông tin',
    specialized: 'Công nghệ thông tin',
  },
  {
    name: 'Kết Nguyễn',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
    board: 'Công nghệ thông tin',
    specialized: 'Công nghệ thông tin',
  },
  {
    name: 'Kết Nguyễn',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
    board: 'Công nghệ thông tin',
    specialized: 'Công nghệ thông tin',
  },
]
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Danh sách thông tin giáo viên</span>
        </div>
      </template>
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="name" label="Tên giáo viên" width="140" />
        <el-table-column prop="info" label="Thông tin" min-width="220" />
        <el-table-column prop="board" label="Khoa" min-width="150" />
        <el-table-column prop="specialized" label="Chuyên ngành" min-width="150" />
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
