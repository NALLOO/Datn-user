<template>
  <div class="container-1">
    <div class="alert-card">
      <div class="content-card">
        <i type="primary" class="el-icon-warning-outline icon"></i>
      </div>
      <div class="header-card">
        <h2>{{ $t("TEXT0313") }}</h2>
        <p style="color: #b2b2b2">{{ $t("TEXT0315") }}</p>
      </div>
      <div class="">
        <el-button class="btn" type="primary" @click="gotoHome" round>{{
          $t("TEXT0311")
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FailedPage",
  methods: {
    gotoHome(){
      this.$router.push({name: "HomePage"})
    }
  } 
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
.icon {
  font-size: 60px;
  color: #44bcff;
}
</style>