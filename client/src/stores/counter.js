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

    async changePaymentStatus() {
      try {
        await axios({
          url: this.baseUrl + "/subscription",
          method: "patch",
          headers: { access_token: localStorage.access_token },
        });

        this.getProfile();
      } catch (err) {
        console.log(err);
      }
    },

    async subscribe() {
      try {
        const { data } = await axios({
          url: this.baseUrl + "/generate-transaction-token",
          method: "post",
          headers: {
            access_token: localStorage.access_token,
          },
        });

        const cb = this.changePaymentStatus;

        // munculin window nya midtrans
        window.snap.pay(data.transactionToken.token, {
          onSuccess: function (result) {
            // jika sukses maka rubah status subscription/pembayaran via hit api di server
            // handler lebih baik dibuat dalam action method dan di tampung dalam variable
            // karena didalam window.snap scope nya berbeda

            cb();
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
