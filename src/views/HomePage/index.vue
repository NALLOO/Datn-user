<template>
  <AppLayout>
    <div class="home-container">
      <div class="search-form">
        <h2 style="text-align: left; margin: 20px">Tìm kiếm chuyến xe</h2>
        <el-form :model="searchForm" class="search-form-content">
          <el-form-item label="Điểm đi">
            <el-select
              v-model="searchForm.startProvinceId"
              placeholder="Chọn điểm đi"
              filterable
              clearable
            >
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
                >{{ item.name }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="Điểm đến">
            <el-select
              v-model="searchForm.endProvinceId"
              placeholder="Chọn điểm đến"
              filterable
              clearable
            >
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
                >{{ item.name }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="Ngày xuất phát">
            <el-date-picker
              v-model="searchForm.date"
              placeholder="Chọn ngày xuất phát"
              value-format="yyyy-MM-dd"
              :picker-options="disabledOptionDate"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Giá vé">
            <el-select v-model="searchForm.orderBy">
              <el-option value="asc" label="Tăng dần"></el-option>
              <el-option value="desc" label="Giảm dần"></el-option>
            </el-select>
          </el-form-item>
          <div class="submit-search">
            <el-button
              :loading="loading.search"
              @click="onSearch"
              type="primary"
            >
              Tìm Kiếm
            </el-button>
          </div>
        </el-form>
      </div>
      <div class="list-trip">
        <h4>Danh sách chuyến đi</h4>
        <el-table class="trip-table" :data="tripList">
          <el-table-column label="Điểm đón">
            <template slot-scope="{ row }">
              {{
                row.route.locations
                  .filter((item) => item.type === constant.LOCATION_TYPE.START)
                  .map((item) => item?.location?.name)
                  .toString()
              }}
            </template>
          </el-table-column>
          <el-table-column label="Điểm trả">
            <template slot-scope="{ row }">
              {{
                row.route.locations
                  .filter((item) => item.type === constant.LOCATION_TYPE.END)
                  .map((item) => item?.location?.name)
                  .toString()
              }}
            </template>
          </el-table-column>
          <el-table-column label="Loại xe">
            <template slot-scope="{ row }">
              {{ row.bus.type.name }}
            </template>
          </el-table-column>
          <el-table-column label="Nhà xe">
            <template slot-scope="{ row }">
              {{ row.bus.author.name }}
            </template>
          </el-table-column>
          <el-table-column label="Giá vé" prop="price"> </el-table-column>
          <el-table-column label="Số vé trống"> </el-table-column>
          <el-table-column label="Giờ khởi hành">
            <template slot-scope="{ row }">
              {{ moment(row.timeStart).format("YYYY-MM-DD HH:mm ") }}
            </template>
          </el-table-column>
          <el-table-column label="Chi tiết">
            <template slot-scope="{ row }">
              <el-button round @click="onGotoDetail(row.id)">
                Chi tiết
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layout";
import { getListProvince as getProvinceApi } from "@/api/province";
import { getTrip as getTripApi } from "@/api/trip";
import moment from "moment";
import constant from "@/utils/constant";
export default {
  name: "HomePage",
  data() {
    return {
      moment,
      constant,
      provinceList: [],
      tripList: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
      },
      loading: {
        search: false,
        app: false,
      },
      searchForm: {
        startProvinceId: null,
        endProvinceId: null,
        date: null,
        orderBy: "asc",
      },
      disabledOptionDate: {
        disabledDate(time) {
          const date = new Date();
          const previousDate = date.setDate(date.getDate() - 1);
          return time.getTime() < previousDate;
        },
      },
    };
  },
  components: {
    AppLayout,
  },
  created() {
    this.getListProvince();
    this.getQuery();
    if (
      this.searchForm.startProvinceId &&
      this.searchForm.endProvinceId &&
      this.searchForm.date
    ) {
      this.getListTrip();
    }
  },
  methods: {
    getQuery() {
      this.searchForm.startProvinceId = this.$route.query.startProvinceId;
      this.searchForm.endProvinceId = this.$route.query.endProvinceId;
      this.searchForm.date = this.$route.query.date;
      this.searchForm.orderBy = this.$route.query.orderBy || 'asc';
      this.pagination.page = this.$route.query.page;
    },
    onSearch() {
      this.$router
        .push({ name: "HomePage", query: this.searchForm })
        .catch(() => {
          console.log("");
        });
    },
    onGotoDetail(id) {
      this.$router
        .push({ name: "TripDetail", params: { id: id } })
        .catch((err) => {
          console.log(err);
        });
    },
    getListProvince() {
      getProvinceApi()
        .then((res) => {
          this.provinceList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListTrip() {
      getTripApi({ ...this.searchForm, page: this.pagination.page })
        .then((res) => {
          this.tripList = res.data.data;
          this.pagination.total = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.home-container {
  padding: 20px;
  .search-form {
    margin-bottom: 30px;
    .el-form-item{
      margin: 0;
    }
    &-content {
      margin: 0 auto;
      max-width: 1400px;
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
    }
    .submit-search{
      display: flex;
      align-items: flex-end;
    }
  }
}
.el-table {
  .cell {
    word-break: normal;
  }
}
</style>
