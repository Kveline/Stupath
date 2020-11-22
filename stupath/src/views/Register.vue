<template>
  <div
    style="    background: black;
    position: absolute;
    margin: auto;
    height: 180vh;
    width: 100%;
    text-align: center;"
  >
    <div class="login-container">
      <p>Register</p>
      <input
        v-model="registerForm.email"
        type="text"
        placeholder="Email"
        name="email"
        required
      />

      <input
        v-model="registerForm.username"
        type="text"
        placeholder="Username"
        name="email"
        required
      />

      <select v-model="registerForm.role" name="" id="">
        <option value="admin">Admin</option>
        <option value="user">user</option>
      </select>

      <input
        v-model="registerForm.password"
        type="password"
        placeholder="Password"
        name="psw"
        required
      />
      <input
        v-model="registerForm.passwordRepeat"
        type="password"
        placeholder="Repeat Password"
        name="psw"
        required
      />

      <button @click="register">Register</button>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";

export default {
  data() {
    return {
      registerForm: {
        email: "",
        password: "",
        passwordRepeat: "",
        username: "",
        role: "admin"
      }
    };
  },

  methods: {
    async register() {
      let user;
      let registerData;
      registerData = {
        email: this.registerForm.email,
        username: this.registerForm.username,
        role: this.registerForm.role
      };

      try {
        user = await firebase.auth.createUserWithEmailAndPassword(
          this.registerForm.email,
          this.registerForm.password
        );
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }

      user = user.user;
      if (user.uid) {
        try {
          await firebase.db
            .collection("users")
            .doc(user.uid)
            .set(registerData);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/style.css");

select {
  width: 94%;
  padding: 12px;
  margin-bottom: 30px;
  background: #f7f7f7;
  border: none;
}
</style>
