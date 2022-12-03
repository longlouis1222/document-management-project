<script setup>
const tableData = [
  {
    name: '2018CN3',
    code: 'CN3',
    falcuty: 'Công nghệ thông tin',
    specialized: 'Công nghệ thông tin',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
  },
  {
    name: '2018CN3',
    code: 'CN3',
    falcuty: 'Công nghệ thông tin',
    specialized: 'Công nghệ thông tin',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
  },
  {
    name: '2018CN3',
    code: 'CN3',
    falcuty: 'Công nghệ thông tin',
    specialized: 'Công nghệ thông tin',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
  },
  {
    name: '2018CN3',
    code: 'CN3',
    falcuty: 'Công nghệ thông tin',
    specialized: 'Công nghệ thông tin',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
  },
  {
    name: '2018CN3',
    code: 'CN3',
    falcuty: 'Công nghệ thông tin',
    specialized: 'Công nghệ thông tin',
    info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
  },
]
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Danh sách thông tin lớp</span>
        </div>
      </template>
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="name" label="Tên lớp" min-width="80" />
        <el-table-column prop="code" label="Mã lớp" min-width="80" />
        <el-table-column prop="falcuty" label="Khoa" min-width="120" />
        <el-table-column prop="specialized" label="Chuyên ngành" min-width="120" />
        <el-table-column prop="info" label="Thông tin" min-width="200"/>
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
