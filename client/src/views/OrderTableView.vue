<script>
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";
export default {
  name: "OrderTabel",
  computed: {
    ...mapState(useCounterStore, ["order"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["getOrder"]),
  },
  created() {
    this.getOrder();
  },
};
</script>
<template>
  <div class="container mt-5 mb-5">
    <div class="d-flex justify-content-center row">
      <div class="col-md-10">
        <h1>Status Pesanan</h1>
        <!-- dinamis -->
        <table class="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama Product</th>
              <th scope="col">Email Pemesan</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(orders, index) in order" :key="orders.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ orders.Product.name }}</td>
              <td>{{ orders.Customer.email }}</td>
              <td>{{ orders.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
