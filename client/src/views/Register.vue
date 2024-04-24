<script>
import { mapActions } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    };
  },
  methods: {
    ...mapActions(useCounterStore, ["register"]),
    registerPost() {
      let user = {
        name: this.name,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        address: this.address,
      };
      this.register(user);
    },
  },
};
</script>
<template>
  <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div
      class="card border-0"
      style="box-shadow: 0px 4px 8px 0px #757575; border-radius: 0px"
    >
      <div class="row d-flex">
        <div class="col-lg-6">
          <div class="card1 pb-5">
            <div class="row">
              <img
                src="../assets/re-covery.jpeg"
                style="
                  width: 200px;
                  height: 100px;
                  margin-top: 20px;
                  margin-left: 35px;
                "
              />
            </div>
            <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
              <img
                src="../assets/bannerjpg.jpg"
                style="width: 360px; height: 280px"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card border-0 px-4 py-5" style="margin: 0px 40px">
            <div class="row mb-4 px-3">
              <h4 class="mb-0 mr-4 mt-2">Pendaftaran Staff</h4>
            </div>
            <form @submit.prevent="registerPost">
              <div class="row px-3">
                <label class="mb-1"><h6 class="mb-0 text-sm">Nama</h6></label>
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="name"
                />
              </div>
              <div class="row px-3">
                <label class="mb-1"><h6 class="mb-0 text-sm">Email</h6></label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="email"
                />
              </div>
              <div class="row px-3">
                <label class="mb-1"
                  ><h6 class="mb-0 text-sm">Password</h6></label
                >
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="password"
                />
              </div>
              <div class="row px-3">
                <label class="mb-1"
                  ><h6 class="mb-0 text-sm">Nomor HP</h6></label
                >
                <input
                  v-model="phoneNumber"
                  type="text"
                  class="form-control"
                  id="phoneNumber"
                  placeholder="phoneNumber"
                />
              </div>
              <div class="row mb-3 px-3 mt-2">
                <button
                  type="submit"
                  class="btn btn-blue text-center"
                  style="
                    background-color: #1a237e;
                    width: 150px;
                    color: #fff;
                    border-radius: 2px;
                  "
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="bg-blue py-4">
        <div class="row px-3">
          <small class="ml-4 ml-sm-5 mb-2"
            >Copyright &copy; 2023. Re-Covery Clinic.</small
          >
          <div class="social-contact ml-4 ml-sm-auto">
            <span class="fa fa-facebook mr-4 text-sm"></span>
            <span class="fa fa-google-plus mr-4 text-sm"></span>
            <span class="fa fa-linkedin mr-4 text-sm"></span>
            <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
