<template>
  <div
    style="    background: black;
    position: absolute;
    margin: auto;
    height: 130vh;
    width: 100%;
    text-align: center;"
  >
    <div class="login-container">
      <p>Login</p>
      <input
        v-model="loginForm.email"
        type="text"
        placeholder="Email"
        name="email"
        required
      />

      <input
        v-model="loginForm.password"
        type="password"
        placeholder="Password"
        name="psw"
        required
      />

      <button @click="login">Login</button>

      <p
        style="margin-top:22px;font-weight:400;color: #6f737b;font-size:18px"
        class="card-text"
      >
        Belum punya akun ? silahkan <br />
        melakukan
        <router-link
          style="cursor:pointer;color:#00918e;font-weight:bold"
          tag="span"
          to="/register"
          >registrasi</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    async login() {
      let user;

      try {
        user = await firebase.auth.signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        );
      } catch (error) {
        console.log(error);
        if (error.code.includes("wrong-password")) {
          alert("Password salah!");
        } else if (error.code.includes("user-not-found")) {
          alert("Pastikan email yang anda masukkan sudah benar");
        }
      }

      if (user) {
        user = user.user;
        this.$store.commit("setCurrentUser", user);
        await this.$store.dispatch("fetchUserProfile");
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/style.css");
</style>
