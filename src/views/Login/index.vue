<template>
  <div class="login-container">
    <div></div>
    <div style="display: flex">
      <div class="login-content">
        <div class="login-title">Đăng nhập</div>
        <div class="custom-form">
          <el-form :model="loginForm" :rules="loginRule">
            <el-form-item prop="email" label="Email" :error="errors.email">
              <el-input v-model="loginForm.email" type="text"></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              label="Mật khẩu"
              :error="errors.password"
            >
              <el-input v-model="loginForm.password" :type="passwordType">
              </el-input>
              <div class="show-pwd" @click="showPwd">
                <Icon
                  width="20"
                  :icon="
                    passwordType === 'password'
                      ? 'lucide:eye-off'
                      : 'lucide:eye'
                  "
                />
              </div>
            </el-form-item>
            <div class="form-footer">
              <el-button class="login-btn" round>Đăng nhập</el-button>
              <span>Quên mật khẩu?</span>
            </div>
            <div class="register">
              Chưa có tài khoản?
              <span @click="$router.push({ name: 'Register' })">Đăng ký</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateRequired, validateEmail } from "@/utils/validate";
import { Icon } from "@iconify/vue2";

export default {
  name: "LoginPage",
  components: {
    Icon,
  },
  data() {
    const validateEmailInput = (rule, value, callback) => {
      validateRequired(rule, value, callback, false);
      validateEmail(rule, value, callback, true);
    };
    const validatePasswordInput = (rule, value, callback) => {
      validateRequired(rule, value, callback, true);
    };
    return {
      loginForm: {
        email: null,
        password: null,
      },
      passwordType: "password",
      loginRule: {
        email: [
          {
            attr: "Email",
            trigger: ["change", "blur"],
            validator: validateEmailInput,
          },
        ],
        password: [
          {
            attr: "Mật khẩu",
            trigger: ["change", "blur"],
            validator: validatePasswordInput,
          },
        ],
      },
      errors: {},
    };
  },
  methods: {
    showPwd() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
  },
};
</script>

<style lang="scss">
.login-container {
  width: 100%;
  color: white;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-image: url("../../assets/img/bus-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  .login-content {
    max-width: 500px;
    margin: auto;
    border: none;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    .login-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .el-form {
      .el-form-item {
        &__label {
          color: white;
        }
        .el-input {
          width: 300px;
          input {
            background: inherit;
            border: none;
            border-bottom: 1px solid;
            border-radius: 0;
            color: white;
            border-color: #606266;
            &:focus {
              border-color: #2ec8a7;
            }
          }
        }
        .show-pwd {
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: 45px;
        }
      }
      .form-footer {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom: 20px;
        .login-btn {
          background: #2ec8a7;
          color: #606266;
          border: none;
          font-weight: 600;
        }
        & > span {
          font-size: 14px;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .register {
        font-size: 14px;
        & > span {
          color: #2ec8a7;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
</style>