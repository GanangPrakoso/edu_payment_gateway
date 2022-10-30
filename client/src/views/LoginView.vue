<script>
import { mapStores } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    ...mapStores(useCounterStore),
  },

  methods: {
    login() {
      this.counterStore.login({ email: this.email, password: this.password });
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <h1 style="color: white; margin-bottom: 20px">Login pls</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-outline-warning">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  width: 40vw;
  margin: auto;
  margin-top: 30vh;
}

label {
  color: white;
}
</style>
