import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { baseUrl: "http://localhost:3000", user: {} };
  },

  actions: {
    async login(value) {
      try {
        const { data } = await axios.post(this.baseUrl + "/login", {
          email: value.email,
          password: value.password,
        });

        localStorage.access_token = data.access_token;
        this.user = data;
        this.router.push("/");
      } catch (err) {
        console.log(err);
      }
    },

    async getProfile() {
      try {
        const { data } = await axios.get(this.baseUrl + "/profile", {
          headers: {
            access_token: localStorage.access_token,
          },
        });

        this.user = data;
      } catch (err) {
        console.log(err);
      }
    },

    async subscribe() {
      try {
        console.log("integrate here!");
      } catch (err) {
        console.log(err);
      }
    },
  },
});
