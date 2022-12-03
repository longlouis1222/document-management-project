<script setup>
const tableData = [
  {
    name: 'Hội đồng 1',
    chairman: 'Kết Nguyễn',
    secretary: 'Nguyễn Long',
    commissioner: 'Đinh Linh',
    review_teacher: 'Hữu Lộc',
  },
  {
    name: 'Hội đồng 1',
    chairman: 'Kết Nguyễn',
    secretary: 'Nguyễn Long',
    commissioner: 'Đinh Linh',
    review_teacher: 'Hữu Lộc',
  },
  {
    name: 'Hội đồng 1',
    chairman: 'Kết Nguyễn',
    secretary: 'Nguyễn Long',
    commissioner: 'Đinh Linh',
    review_teacher: 'Hữu Lộc',
  },
  {
    name: 'Hội đồng 1',
    chairman: 'Kết Nguyễn',
    secretary: 'Nguyễn Long',
    commissioner: 'Đinh Linh',
    review_teacher: 'Hữu Lộc',
  },
  {
    name: 'Hội đồng 1',
    chairman: 'Kết Nguyễn',
    secretary: 'Nguyễn Long',
    commissioner: 'Đinh Linh',
    review_teacher: 'Hữu Lộc',
  },
  {
    name: 'Hội đồng 1',
    chairman: 'Kết Nguyễn',
    secretary: 'Nguyễn Long',
    commissioner: 'Đinh Linh',
    review_teacher: 'Hữu Lộc',
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
        <el-table-column prop="name" label="Tên hội đồng" min-width="120" />
        <el-table-column prop="chairman" label="Chủ tịch" min-width="120" />
        <el-table-column prop="secretary" label="Thư ký" min-width="120"/>
        <el-table-column prop="commissioner" label="Ủy viên" />
        <el-table-column prop="review_teacher" label="Gv.Phản biện" />
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
