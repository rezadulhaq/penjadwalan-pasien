<script>
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";
export default {
  name: "Detail",
  data() {
    return {
      provinceId: "",
      cityId: "",
    };
  },
  computed: {
    ...mapState(useCounterStore, ["product", "province", "city", "cost"]),
  },
  methods: {
    ...mapActions(useCounterStore, [
      "fetchProductId",
      "getProvince",
      "getCity",
      "getCost",
      "payment",
      "clearCost",
    ]),
    getOngkir(ongkir) {
      let harga = ongkir + this.product.price;
      this.payment(harga, this.product.id);
    },
    rupiah(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    },
  },
  created() {
    this.fetchProductId(this.$route.params.id);
    this.getProvince();
    this.clearCost();
  },
};
</script>
<template>
  <div class="container">
    <div class="row bg-light pt-3 text-center">
      <h2>{{ product.name }}</h2>
    </div>
    <div class="row bg-light p-3">
      <div class="col-7">
        <img
          :src="product.imageUrl"
          class="img-fluid rounded-start p-1"
          alt="Rocky"
          style="width: 45vw; object-fit: cover"
        />
        <p>Rp. {{ product.price }}</p>
      </div>
      <div class="col-5">
        <div class="mb-3">
          <label class="form-label">Provinsi</label>
          <div class="row">
            <div class="col-7">
              <select
                @change="getCity(provinceId)"
                v-model="provinceId"
                class="form-select"
              >
                <option value="" disabled>Select Province</option>
                <option
                  v-for="prov in province"
                  :key="prov.province_id"
                  :value="prov.province_id"
                >
                  {{ prov.province }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">City</label>
          <div class="row">
            <div class="col-7">
              <select
                @change="getCost(cityId)"
                v-model="cityId"
                class="form-select"
              >
                <option value="" disabled>Select City</option>
                <option
                  v-for="cities in city"
                  :key="cities.city_id"
                  :value="cities.city_id"
                >
                  {{ cities.city_name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="mb-3" v-if="cost.rajaongkir">
          <h3>Dari</h3>
          <p>
            {{ cost.rajaongkir.origin_details.type }} :
            {{ cost.rajaongkir.origin_details.city_name }}
          </p>

          <h3>Tujuan Pengiriman</h3>
          <p>
            {{ cost.rajaongkir.destination_details.type }} :
            {{ cost.rajaongkir.destination_details.city_name }}
          </p>
          <h3 class="lh-sm">Ekspedisi</h3>
          <p>
            {{ cost.rajaongkir.results[0].name }}
            {{ cost.rajaongkir.results[0].costs[0].service }}
          </p>
          <p>
            total ongkir =
            {{ rupiah(cost.rajaongkir.results[0].costs[0].cost[0].value) }}
          </p>
          <p>
            total harga =
            {{
              rupiah(
                cost.rajaongkir.results[0].costs[0].cost[0].value +
                  product.price
              )
            }}
          </p>
          <p>
            estimasi waktu sampai =
            {{ cost.rajaongkir.results[0].costs[0].cost[0].etd }} hari
          </p>
          <div class="d-grid justify-content-end pr-5">
            <button
              class="btn btn-success mr-5"
              @click.prevent="
                getOngkir(cost.rajaongkir.results[0].costs[0].cost[0].value)
              "
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-light p-3">
      <p class="mt-3">{{ product.description }}</p>
    </div>
  </div>
</template>
