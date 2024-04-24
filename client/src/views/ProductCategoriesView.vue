<script>
import Card from "../components/Card.vue";
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";
export default {
  name: "ProductsCatgories",
  data() {
    return {
      category: this.categoryId,
    };
  },
  components: { Card },
  computed: {
    ...mapState(useCounterStore, ["products"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["fetchCategoriesById"]),
  },
  created() {
    this.fetchCategoriesById(this.$route.params.id);
    // console.log(this.products);
  },
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="d-flex justify-content-center row">
      <div class="col-md-10">
        <!-- dinamis -->
        <Card
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>
