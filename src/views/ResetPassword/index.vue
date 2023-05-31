<template>
  <div class="reset-container">
    <div></div>
    <div style="display: flex">
      <div class="reset-content">
        <div class="reset-title">Đặt lại mật khẩu</div>
        <div class="custom-form">
          <el-form :model="resetForm" ref="resetForm" :rules="resetRule">
            <el-form-item
              prop="password"
              label="Mật khẩu mới"
              :error="errors.password"
            >
              <el-input
                v-model="resetForm.password"
                @blur="handleChangePassword"
                :type="passwordType"
              >
              </el-input>
              <div class="show-pwd" @click="showPwd('passwordType')">
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

            <el-form-item
              prop="confirmPassword"
              label="Nhập lại mật khẩu"
              :error="errors.confirmPassword"
            >
              <el-input
                v-model="resetForm.confirmPassword"
                :type="confirmPasswordType"
              >
              </el-input>
              <div class="show-pwd" @click="showPwd('confirmPasswordType')">
                <Icon
                  width="20"
                  :icon="
                    confirmPasswordType === 'password'
                      ? 'lucide:eye-off'
                      : 'lucide:eye'
                  "
                />
              </div>
            </el-form-item>
            <div class="form-footer">
              <el-button
                :loading="loading"
                @click="handleSubmit"
                class="reset-btn"
                round
                >Xác nhận</el-button
              >
              <span @click="$router.push({ name: 'Login' })">Đăng nhập</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateRequired, validateConfirmed } from "@/utils/validate";
import { checkToken, resetPassword } from "@/api/auth";
import { Icon } from "@iconify/vue2";

export default {
  name: "ResetPage",
  components: {
    Icon,
  },
  data() {
    const validateConfirmPasswordInput = (rule, value, callback) => {
      validateRequired(rule, value, callback, false);
      validateConfirmed(rule, value, callback, true);
    };
    const validatePasswordInput = (rule, value, callback) => {
      validateRequired(rule, value, callback, true);
    };
    return {
      resetForm: {
        confirmPassword: null,
        password: null,
      },
      loading: false,
      passwordType: "password",
      confirmPasswordType: "password",
      resetRule: {
        confirmPassword: [
          {
            attr: "Mật khẩu xác nhận ",
            trigger: ["change", "blur"],
            condition: { confirmed: null },
            validator: validateConfirmPasswordInput,
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
  created() {
    this.checkToken();
  },
  methods: {
    showPwd(field) {
      this[field] = this[field] === "password" ? "text" : "password";
    },
    handleChangePassword() {
      this.resetRule.confirmPassword[0].condition.confirmed =
        this.resetForm.password;
    },
    checkToken() {
      const token = this.$route.params.token;
      checkToken({ token })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmit() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          const data = {
            token: this.$route.params.token,
            password: this.resetForm.password,
          };
          resetPassword(data)
            .then(() => {
              this.$router.push({ name: "Login" });
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>
<style lang="scss">
.reset-container {
  width: 100%;
  color: white;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-image: url("../../assets/img/bus-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  .reset-content {
    max-width: 500px;
    margin: auto;
    border: none;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    .reset-title {
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
        .reset-btn {
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