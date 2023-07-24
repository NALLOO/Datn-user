<template>
  <div class="container-1">
    <div class="alert-card">
      <div class="content-card">
        <el-button class="icon-btn" type="success" circle>
          <i type="primary" class="el-icon-check"></i>
        </el-button>
      </div>
      <div class="header-card">
        <h2>Thanh toán thành công</h2>
        <p style="color: #b2b2b2">
          Bạn đã đặt vé thành công, hãy kiểm tra thông tin trong danh sách vé
          của bạn
        </p>
      </div>
      <div class="">
        <el-button class="btn" type="success" @click="gotoHome" round
          >Về trang chủ</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuccessPage",
  methods: {
    gotoHome() {
      this.$router.push({ name: "HomePage" });
    },
  },
};
</script>

<style>
.container-1 {
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alert-card {
  height: 700px;
  width: 32%;
  min-width: 350px;
  background-color: #fff;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.icon-btn {
  display: block;
  margin-top: 100px;
  color: #fff;
}
.el-icon-check {
  font-size: 60px;
}
.header-card {
  margin: 40px 10px 0;
  justify-content: center;
  flex-direction: column;
  display: grid;
}
.header-card h2 {
  margin-bottom: 20px;
  justify-self: center;
  color: #646464;
  text-transform: uppercase;
  font-weight: 450;
}
.btn {
  margin-top: 200px;
  width: 300px;
  padding: 20px !important;
  border-radius: 30px !important;
  font-weight: 700;
  font-size: 17px;
}
</style>
