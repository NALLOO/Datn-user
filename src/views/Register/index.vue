<template>
  <div class="register-container">
    <img src="../../assets/img/bus-bg.png" class="background" alt="" />
    <div style="display: flex">
      <div class="register-content">
        <div class="register-title">Đăng ký</div>
        <div class="custom-form">
          <el-form :model="registerForm" :rules="registerRules">
            <el-form-item prop="email" label="Email" :error="errors.email">
              <el-input v-model="registerForm.email" type="text"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="Tên">
              <el-input v-model="registerForm.name" type="text" :error="errors.name"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="Số điện thoại">
              <el-input v-model="registerForm.phone" type="text" :error="errors.phone"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="Mật khẩu" :error="errors.password">
              <el-input
                v-model="registerForm.password"
                @blur="handleChangePassword"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item prop="confirmPassword" label="Nhập lại mật khẩu " :error="errors.confirmPassword">
              <el-input
                v-model="registerForm.confirmPassword"
                type="password"
              ></el-input>
            </el-form-item>
            <div class="form-footer">
              <el-button class="register-btn" round>Đăng ký</el-button>
              <span>Quên mật khẩu?</span>
            </div>
            <div class="register">
              Đã có tài khoản?
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
import {validateEmail, validateRequired, validateConfirmed, validatePhoneNumber, validateSize} from "@/utils/validate"

export default {
  name: "RegisterPage",
  data() {
    const validateEmailInput = (rule, value, callback) => {
      validateRequired(rule, value, callback, false);
      validateEmail(rule, value, callback, true);
    };
    const validatePasswordInput = (rule, value, callback) => {
      validateRequired(rule, value, callback, true);
    };
    const validateNameInput = (rule, value, callback) => {
      validateRequired(rule, value, callback, false);
      validateSize(rule, value, callback, true);
    };
    const validateConfirmPasswordInput = (rule, value, callback) => {
      validateRequired(rule, value, callback, false);
      validateConfirmed(rule, value, callback, true)
    };
    const validatePhoneInput = (rule, value, callback) => {
      validateRequired(rule, value, callback, false);
      validatePhoneNumber(rule, value, callback, true);
    };
    return {
      registerForm: {
        email: null,
        name: null,
        phone: null,
        password: null,
        confirmPassword: null,
      },
      errors: {},
      registerRules: {
        email: [
          {
            attr: "Email",
            trigger: ["blur", "change"],
            validator: validateEmailInput,
          },
        ],
        name: [
          {
            attr: "Tên",
            trigger: ["blur", "change"],
            condition: {max : 255},
            validator: validateNameInput,
          },
        ],
        phone: [
          {
            attr: "Số điện thoại",
            trigger: ["blur", "change"],
            validator: validatePhoneInput,
          },
        ],
        password: [
          {
            attr: "Mật khẩu",
            trigger: ["blur", "change"],
            validator: validatePasswordInput,
          },
        ],
        confirmPassword: [
          {
            attr: "Mật khẩu xác nhận",
            trigger: ["blur", "change"],
            condition: {confirmed: null},
            validator: validateConfirmPasswordInput,
          },
        ],
      },
    };
  },
  methods: {
    handleChangePassword(){
      this.registerRules.confirmPassword[0].condition.confirmed = this.registerForm.password
    }
  }
};
</script>

<style lang="scss">
.register-container {
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
  // background-image: url("../../assets/img/bus-bg.png");
  // background-repeat: no-repeat;
  // background-size: cover;
  .register-content {
    max-width: 500px;
    margin: auto;
    border: none;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px 30px;
    .register-title {
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
          width: 400px;
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
      }
      .form-footer {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom: 20px;
        .register-btn {
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