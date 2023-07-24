<template>
  <div class="forgot-container">
    <img src="../../assets/img/bus-bg.png" class="background" alt="" />
    <div style="display: flex">
      <div class="forgot-content">
        <div class="forgot-title">Quên mật khẩu</div>
        <div class="custom-form">
          <el-form
            :model="forgotForm"
            ref="forgotForm"
            :rules="forgotRules"
            @submit.native.prevent="handleSubmit"
          >
            <el-form-item prop="email" label="Email">
              <el-input v-model="forgotForm.email" type="text"></el-input>
              <div class="el-form-item__error">{{ errors.email }}</div>
            </el-form-item>
            <div class="form-footer">
              <el-button
                @click="handleSubmit"
                :loading="loading"
                class="forgot-btn"
                round
                >Gửi mail</el-button
              >
              <span @click="$router.push({ name: 'Login' })">Đăng nhập</span>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { validateEmail, validateRequired } from "@/utils/validate";
import { sendMailReset } from "@/api/auth";

export default {
  name: "ForgotPasswordPage",
  data() {
    const validateEmailInput = (rule, value, callback) => {
      validateRequired(rule, value, callback, false);
      validateEmail(rule, value, callback, true);
    };
    return {
      forgotForm: {
        email: null,
      },
      passwordType: "password",
      confirmPasswordType: "password",
      loading: false,
      errors: {},
      forgotRules: {
        email: [
          {
            attr: "Email",
            trigger: ["blur", "change"],
            validator: validateEmailInput,
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.forgotForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          sendMailReset(this.forgotForm)
            .then(() => {
              this.$router.push({ name: "Login" });
            })
            .catch((err) => {
              this.errors = err.error;
              this.$forceUpdate();
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
.forgot-container {
  width: 100%;
  color: white;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .background {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    transform: scaleX(-1);
  }
  .forgot-content {
    max-width: 400px;
    margin: auto;
    border: none;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px 30px;
    .forgot-title {
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
          width: 350px;
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
        .forgot-btn {
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
      .forgot {
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
