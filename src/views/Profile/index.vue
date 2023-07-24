<template>
  <AppLayout>
    <div
      v-if="this.$store.state.user?.id"
      v-loading="loading"
      class="profile-container"
    >
      <div class="profile-content">
        <div class="user-info">
          <h3>Thông tin người dùng</h3>
          <div class="info-item">
            <span class="info-item-label">Tên</span>
            <span class="info-item-data">{{ user.name }}</span>
          </div>
          <div class="info-item">
            <span class="info-item-label">Email</span>
            <span class="info-item-data">{{ user.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-item-label">Số điện thoại</span>
            <span class="info-item-data">{{ user.phone }}</span>
          </div>
          <div class="info-item">
            <el-button @click="show.form = true">Cập nhật thông tin</el-button>
            <el-button @click="show.changePassword = true"
              >Đổi mật khẩu</el-button
            >
          </div>
        </div>
        <div class="list-ticket">
          <h3>Danh sách vé</h3>
          <el-table class="ticket-table" :data="listTicket">
            <el-table-column label="Chỗ ngồi" prop="code"> </el-table-column>
            <el-table-column label="Điểm đón">
              <template slot-scope="{ row }">
                {{
                  row.trip.route.locations
                    .filter(
                      (item) => item.type === constant.LOCATION_TYPE.START
                    )
                    .map((item) => item?.location?.name)
                    .toString()
                }}
              </template>
            </el-table-column>
            <el-table-column label="Điểm trả">
              <template slot-scope="{ row }">
                {{
                  row.trip.route.locations
                    .filter((item) => item.type === constant.LOCATION_TYPE.END)
                    .map((item) => item?.location?.name)
                    .toString()
                }}
              </template>
            </el-table-column>
            <el-table-column label="Loại xe">
              <template slot-scope="{ row }">
                {{ row.trip.bus.type.name }}
              </template>
            </el-table-column>
            <el-table-column label="Nhà xe">
              <template slot-scope="{ row }">
                {{ row.trip.bus.author.name }}
              </template>
            </el-table-column>
            <el-table-column label="Giờ khởi hành">
              <template slot-scope="{ row }">
                {{ moment(row.trip.timeStart).format("YYYY-MM-DD HH:mm ") }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="Cập nhật thông tin"
      :visible.sync="show.form"
      width="40%"
    >
      <div>
        <el-form ref="userForm" :model="userForm">
          <el-form-item prop="name" label="Tên">
            <el-input v-model="userForm.name"> </el-input>
          </el-form-item>
          <el-form-item prop="phone" label="Số điện thoại">
            <el-input v-model="userForm.phone"> </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show.form = false">Hủy</el-button>
        <el-button type="primary" @click="handleUpdate">Cập nhật</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Đổi mật khẩu"
      :close-on-click-modal="false"
      :visible.sync="show.changePassword"
      width="40%"
    >
      <div>
        <el-form ref="changeForm" :model="changeForm">
          <el-form-item
            prop="currentPassword"
            :error="errors.currentPassword"
            label="Mật khẩu cũ"
          >
            <el-input v-model="changeForm.currentPassword"> </el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="Mật khẩu mới">
            <el-input v-model="changeForm.newPassword"> </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show.form = false">Hủy</el-button>
        <el-button type="primary" @click="handleChangPassword"
          >Cập nhật</el-button
        >
      </span>
    </el-dialog>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layout";
import constant from "@/utils/constant";
import { getMyTicket, updateProfile } from "@/api/user";
import { changePassword } from "@/api/auth";
import moment from "moment";
export default {
  name: "ProfilePage",
  components: {
    AppLayout,
  },
  data() {
    return {
      constant,
      moment,
      loading: false,
      errors: {},
      user: this.$store.state.user,
      show: {
        form: false,
        changePassword: false,
      },
      changeForm: {
        newPassword: null,
        currentPassword: null,
      },
      userForm: {
        name: this.$store.state.user.name,
        phone: this.$store.state.user.phone,
      },
      listTicket: [],
    };
  },
  created() {
    this.getListTicket();
    if (!this.$store.state.user?.id) this.$router.push({ name: "Login" });
  },
  methods: {
    handleUpdate() {
      this.show.form = false;
      this.loading = true;
      updateProfile(this.userForm)
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getListTicket() {
      getMyTicket()
        .then((res) => {
          this.listTicket = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleChangPassword() {
      if (this.changeForm.currentPassword && this.changeForm.newPassword) {
        this.loading = true;
        changePassword(this.changeForm)
          .then(() => {
            this.show.changePassword = false;
            this.$refs.changeForm.resetFields();
          })
          .catch((err) => {
            this.errors = err.errors;
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss">
.profile-container {
  padding: 20px;
  .profile-content {
    max-width: 1400px;
    margin: auto;
    .user-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 18px;
      h3 {
        text-align: start;
      }
      .info-item {
        display: flex;
        gap: 20px;
        &-label {
          width: 120px;
          text-align: right;
        }
      }
    }
  }
}
</style>
