<script>
// import { mapActions, mapWritableState } from "pinia";
// import { useCounterStore } from "../stores/counter";

export default {
  name: "Card",
  computed: {
    // ...mapWritableState(useCounterStore, []),
  },
  methods: {
    // ...mapActions(useCounterStore, []),
    rupiah(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    },
  },
  // created() {
  // },
  props: ["product"],
};
</script>
<template>
  <div class="row p-2 bg-white border rounded mt-2">
    <div class="col-md-3 mt-3">
      <img
        class="img-fluid img-responsive rounded product-image"
        :src="product.imageUrl"
      />
    </div>
    <div class="col-md-6 mt-1">
      <h5>{{ product.name }}</h5>
      <div class="d-flex flex-row">
        <div class="ratings mr-2">
          <i class="fa fa-star"></i><i class="fa fa-star"></i
          ><i class="fa fa-star"></i><i class="fa fa-star"></i>
        </div>
        <span>size : {{ product.size }} cm</span>
      </div>
      <p
        class="card-text"
        style="
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        "
      >
        {{ product.description }}
      </p>
    </div>
    <div
      class="align-items-center align-content-center col-md-3 border-left mt-1"
    >
      <div class="d-flex flex-row align-items-center">
        <h4 class="mr-1">{{ rupiah(product.price) }}</h4>
        <span class="strike-text"></span>
      </div>
      <h6 class="text-success">Sprei Tempahan Qu</h6>
      <div class="d-flex flex-column mt-4">
        <button
          @click="$router.push(`/detail/${product.id}`)"
          class="btn btn-warning"
        >
          Details
        </button>
      </div>
    </div>
  </div>
</template>
