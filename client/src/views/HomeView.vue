<script></script>

<template>
  <div class="wrapper">
    <div>
      <h2 class="regular-pt-sans">
        👋 Hai, welcome to this simple web app 😜 Your status is
        <span class="rainbow"> unsubscribed</span>
      </h2>
      <h2 class="small-pt-sans">👉 Click here to subscribe 👈</h2>
      <h5 class="small-small-pt-sans">or you want to logout instead? 🤔</h5>
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
