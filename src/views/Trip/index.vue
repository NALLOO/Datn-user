<template>
  <AppLayout>
    <div v-loading="loading" class="trip-container">
      <div class="trip-content">
        <div class="trip-info">
          <h3 style="margin-bottom: 20px">Thông tin chuyến đi</h3>
          <el-row>
            <el-col class="label" :span="6">Nhà xe</el-col>
            <el-col :span="6">{{ trip.bus?.author?.name }}</el-col>
            <el-col class="label" :span="6">Loại xe</el-col>
            <el-col :span="6">{{ trip.bus?.type?.name }}</el-col>
          </el-row>
          <el-row>
            <el-col class="label" :span="6">Biển số xe</el-col>
            <el-col :span="6">{{ trip.bus?.numberPlate }}</el-col>
            <el-col class="label" :span="6">Giá vé</el-col>
            <el-col :span="6">{{ trip.price }}</el-col>
          </el-row>
          <el-row>
            <el-col class="label" :span="6">Đi từ</el-col>
            <el-col :span="6">{{ trip.route?.startProvince?.name }}</el-col>
            <el-col class="label" :span="6">Đến</el-col>
            <el-col :span="6">{{ trip.route?.endProvince?.name }}</el-col>
          </el-row>
          <el-row>
            <el-col class="label" :span="6">Điểm đón</el-col>
            <el-col :span="6">
              <ul>
                <li v-for="item in trip?.startLocations" :key="item.id">
                  {{ item.location.name }}
                </li>
              </ul>
            </el-col>
            <el-col class="label" :span="6">Điểm trả</el-col>
            <el-col :span="6">
              <ul>
                <li v-for="item in trip?.endLocations" :key="item.id">
                  {{ item.location.name }}
                </li>
              </ul>
            </el-col>
          </el-row>
          <div class="seat">
            <img v-if="trip.bus?.type" :src="trip.bus.type.image" alt="" />
          </div>
        </div>
        <div class="list-ticket">
          <div style="display: flex; align-items: center; gap: 20px">
            <h3>Danh sách vé trống</h3>
            <el-button type="primary" @click="onSubmit">Đặt mua</el-button>
          </div>
          <div class="list-content">
            <el-table
              ref="list-ticket"
              :data="listTicket"
              max-height="500px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column label="Số ghế">
                <template slot-scope="{ row }">
                  {{ row.code }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <el-dialog
        title="Yêu cầu đăng nhập"
        :visible.sync="show.login"
        width="30%"
      >
        <span>Bạn phải đăng nhập để có thể đặt vé</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show.login = false">Hủy</el-button>
          <el-button
            type="primary"
            @click="
              () => {
                show.login = false;
                $router.push({ name: 'Login' });
              }
            "
            >Đăng nhập</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        title="Xác nhận đặt vé"
        :visible.sync="show.ticket"
        width="30%"
      >
        <span>{{ message }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show.ticket = false">Không</el-button>
          <el-button type="primary" @click="handleConfirm">Xác nhận</el-button>
        </span>
      </el-dialog>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layout";
import { getDetail as getDetailTripApi } from "@/api/trip";
import { createPayment } from "@/api/payment";
import constant from "@/utils/constant";
export default {
  name: "TripDetail",
  components: {
    AppLayout,
  },
  data() {
    return {
      trip: {},
      loading: false,
      listTicket: [],
      user: this.$store.state.user,
      ticketSelection: [],
      message: "",
      show: {
        login: false,
        ticket: false,
      },
    };
  },
  created() {
    this.getDetailTrip();
  },
  methods: {
    onSubmit() {
      if (!this.ticketSelection.length) return;
      if (!this.user.id) {
        this.show.login = true;
        return;
      } else {
        const ticket = this.ticketSelection.map((item) => item.code).toString();
        this.message = `Bạn xác nhận đặt các vé: ${ticket} không? `;
        this.show.ticket = true;
      }
    },
    handleSelectionChange(value) {
      this.ticketSelection = value;
    },
    handleConfirm() {
      this.show.ticket = false;
      this.loading = true;
      const data = {
        user_id: this.user.id,
        price: parseInt(this.trip.price),
        ticket_ids: this.ticketSelection.map((item) => item.id),
      };
      createPayment(data)
        .then((res) => {
          window.location.replace(res.url);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getDetailTrip() {
      const id = this.$route.params.id;
      getDetailTripApi(id)
        .then((res) => {
          this.trip = res.data;
          this.trip.startLocations = res.data.route.locations.filter(
            (item) => item.type === constant.LOCATION_TYPE.START
          );
          this.trip.endLocations = res.data.route.locations.filter(
            (item) => item.type === constant.LOCATION_TYPE.END
          );
          this.listTicket = res.data.tickets.filter(
            (item) => item.status === 0
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.trip-container {
  display: flex;
  padding: 10px;
  .trip-content {
    display: flex;
    max-width: 1400px;
    margin: 30px auto;
    flex-wrap: wrap;
    gap: 50px;
    .trip-info {
      .seat {
        margin-top: 30px;
        img {
          width: 750px;
          @media screen and (max-width: 768px) {
            width: 350px;
          }
        }
      }
    }
  }
}
</style>
