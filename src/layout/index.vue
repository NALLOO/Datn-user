<template>
  <div class="app-layout">
    <div class="navbar">
      <div class="navbar-content">
        <div class="logo">
          <router-link to="/">
            <span>NALLOO BUS</span>
          </router-link>
          <!-- <img src="../assets/img/bus.jpg" alt="" /> -->
        </div>
        <div class="dropdown">
          <div v-if="!user" @click="$router.push({ name: 'Login' })">
            Đăng nhập
          </div>
          <el-dropdown @command="handleCommand" v-else>
            <span class="el-dropdown-link">
              {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile"> Hồ sơ </el-dropdown-item>
              <el-dropdown-item command="logout">Đăng xuất </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("REMOVE_USER");
      this.$store.dispatch("REMOVE_TOKEN");
      localStorage.removeItem("access_token");
    },
    onGotoProfile() {
      this.$router.push({ name: "Profile" });
    },
    handleCommand(command) {
      switch (command) {
        case "profile":
          this.onGotoProfile();
          break;
        case "logout":
          this.handleLogout();
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-layout {
  min-height: 100vh;
  padding-top: 74px;
  .navbar {
    z-index: 10;
    position: fixed;
    padding: 0 20px;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(9, 9, 121, 1) 23%,
      rgba(0, 212, 255, 1) 100%
    );
    top: 0;
    width: 100%;
    margin: 0 auto;
    width: 100%;
    height: 64px;
    box-shadow: 0 0 5px gray;
    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1400px;
      height: 100%;
      margin: 0 auto;
    }
    .logo {
      img {
        height: 70px;
      }
      span {
        font-weight: 700;
        font-size: 20px;
        color: rgba(0, 212, 255, 1);
      }
    }
    .dropdown {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: 600;
    }
  }
}
</style>
