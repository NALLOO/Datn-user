<template>
  <div class="app-layout">
    <div class="navbar">
      <div class="navbar-content">
        <div class="logo"><img src="../assets/img/bus.jpg" alt="" /></div>
        <div class="dropdown">
            <div @click="$router.push({name: 'Login'})">Đăng nhập</div>
        </div>
      </div>
    </div>
    <slot />
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
};
</script>

<style lang="scss" scoped>
.app-layout {
  min-height: 100vh;
  padding-top: 74px;
  .navbar {
    position: fixed;
    padding: 0 20px;
    top: 0;
    width: 100%;
    margin: 0 auto;
    width: 100%;
    background: white;
    box-shadow: 0 0 5px gray;
    &-content {
      display: flex;
      justify-content: space-between;
      max-width: 1400px;
      margin: 0 auto;
    }
    .logo {
      img {
        height: 70px;
      }
    }
    .dropdown{
        display: flex;
        align-items: center;
        cursor: pointer;
    }
  }
}
</style>