<template>
  <AppLayout>
    <div class="trip-container">
      <div class="trip-info">
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
          <el-col :span="6">{{ trip.startProvince?.name }}</el-col>
          <el-col class="label" :span="6">Đến</el-col>
          <el-col :span="6">{{ trip.endProvince?.name }}</el-col>
        </el-row>
        <el-row>
          <el-col class="label" :span="6">Điểm đón</el-col>
          <el-col :span="6">
            <ul>
              <li v-for="item in trip?.startLocations" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </el-col>
          <el-col class="label" :span="6">Điểm trả</el-col>
          <el-col :span="6">
            <ul>
              <li v-for="item in trip?.endLocations" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layout";
import { getDetail as getDetailTripApi } from "@/api/trip";
import constant from "@/utils/constant";
export default {
  name: "TripDetail",
  components: {
    AppLayout,
  },
  data() {
    return {
      trip: {},
    };
  },
  created() {
    this.getDetailTrip();
  },
  methods: {
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
