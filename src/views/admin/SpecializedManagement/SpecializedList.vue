<script setup>
const tableData = [
  {
    name: 'Công nghệ thông tin',
    code: 'IT123',
    falcuty: 'Công nghệ thông tin',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.'
  },
  {
    name: 'Công nghệ thông tin',
    code: 'IT123',
    falcuty: 'Công nghệ thông tin',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.'
  },
  {
    name: 'Công nghệ thông tin',
    code: 'IT123',
    falcuty: 'Công nghệ thông tin',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.'
  },
  {
    name: 'Công nghệ thông tin',
    code: 'IT123',
    falcuty: 'Công nghệ thông tin',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.'
  },
  {
    name: 'Công nghệ thông tin',
    code: 'IT123',
    falcuty: 'Công nghệ thông tin',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate repellat voluptatibus, tempore tenetur rerum facere est vel rem quia fugiat blanditiis minima asperiores magnam illum dolor perferendis inventore ut odio.'
  },
]
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Danh sách thông tin chuyên ngành</span>
        </div>
      </template>
      <el-table :data="tableData" height="250" style="width: 100%">
        <el-table-column prop="name" label="Chuyên ngành" width="180" />
        <el-table-column prop="code" label="Mã chuyên ngành" width="140" />
        <el-table-column prop="falcuty" label="Khoa" />
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
