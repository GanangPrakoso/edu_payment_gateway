<script>
import { mapStores } from "pinia";
import { useCounterStore } from "../stores/counter";
import Swal from "sweetalert2";

export default {
  computed: {
    ...mapStores(useCounterStore),
    isSubscribed() {
      return this.counterStore.user.isSubscribed
        ? "subscribed"
        : "unsubscribed";
    },
  },

  created() {
    this.counterStore.getProfile();
  },

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },

    subscribe() {
      if (!this.counterStore.user.isSubscribed) {
        this.counterStore.subscribe();
      } else {
        Swal.fire({
          title: "Seriously?",
          text: "Logout and go play outside pls",
          icon: "question",
          showDenyButton: true,
          confirmButtonText: "Logout",
          denyButtonText: `Nope I want to be here`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.logout();
          }
        });
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div>
      <h2 class="regular-pt-sans">
        👋 Hai, welcome to this simple web app 😜 Your status is
        <span
          :class="counterStore.user.isSubscribed ? 'rainbow-fast' : 'rainbow'"
        >
          {{ isSubscribed }}</span
        >
      </h2>
      <h2 class="small-pt-sans" @click="subscribe">
        👉
        {{
          counterStore.user.isSubscribed
            ? "you already subscribed bruv, what else you wanna do?"
            : "Click here to subscribe"
        }}
        👈
      </h2>
      <h5 class="small-small-pt-sans" @click="logout">
        or you want to logout instead? 🤔
      </h5>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  align-items: center;
  padding-left: 2vw;
}
.regular-pt-sans {
  font-family: "PT Sans", sans-serif;
  color: aliceblue;
}

.small-pt-sans {
  font-family: "PT Sans", sans-serif;
  color: pink;
}

.small-pt-sans:hover {
  color: #ff3399;
  cursor: pointer;
  text-decoration: underline;
}

.small-small-pt-sans {
  margin-top: 20px;
  font-family: "PT Sans", sans-serif;
  color: gray;
}

.small-small-pt-sans:hover {
  color: #6666ff;
  cursor: pointer;
  text-decoration: underline;
}

.rainbow {
  text-align: center;
  font-size: 65px;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  letter-spacing: 5px;
  animation: colorRotate 2s linear 0s infinite;
}

.rainbow-fast {
  text-align: center;
  font-size: 65px;
  font-family: "PT Sans", sans-serif;
  font-weight: 700;
  letter-spacing: 5px;
  animation: colorRotate 0.6s linear 0s infinite;
}

@keyframes colorRotate {
  from {
    color: #6666ff;
  }
  10% {
    color: #0099ff;
  }
  50% {
    color: #00ff00;
  }
  75% {
    color: #ff3399;
  }
  100% {
    color: #6666ff;
  }
}
</style>
