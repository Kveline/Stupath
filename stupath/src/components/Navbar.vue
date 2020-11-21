<template>
  <div class="background-nav">
    <nav>
      <div class="text-nav">
        <div>
          <a href="">Pilih Pekerjaan</a>
          <a href="">Forum</a>
        </div>
        <div>
          <span v-if="userProfile">{{ userProfile.username }}</span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["userProfile"])
};
</script>

<style scoped>
nav {
  padding: 71px;
  padding-bottom: 127px;
  background: #367d5d;
}

.text-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  margin-top: -32px;
}

a {
  font-weight: bold;
  margin-left: 24px;
  color: white;
  text-decoration: none;
}
</style>
