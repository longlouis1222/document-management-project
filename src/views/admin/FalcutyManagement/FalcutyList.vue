<script setup>
const tableData = [
  {
    name: 'Khoa công nghệ thông tin',
    code: 'HAU123',
    established_date: '29/06/2000',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
  },
  {
    name: 'Khoa công nghệ thông tin',
    code: 'HAU123',
    established_date: '29/06/2000',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
  },
  {
    name: 'Khoa công nghệ thông tin',
    code: 'HAU123',
    established_date: '29/06/2000',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
  },
  {
    name: 'Khoa công nghệ thông tin',
    code: 'HAU123',
    established_date: '29/06/2000',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
  },
  {
    name: 'Khoa công nghệ thông tin',
    code: 'HAU123',
    established_date: '29/06/2000',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
  },
  {
    name: 'Khoa công nghệ thông tin',
    code: 'HAU123',
    established_date: '29/06/2000',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.',
  },
]
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Danh sách thông tin khoa</span>
        </div>
      </template>
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="name" label="Tên Khoa" width="220" />
        <el-table-column prop="code" label="Mã khoa" width="120" />
        <el-table-column prop="established_date" label="Ngày thành lập" />
        <el-table-column prop="description" label="Mô tả" />
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
