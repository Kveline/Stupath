<template>
  <div>
    <Navbar />
    <h1>PILIH PEKERJAAN</h1>

    <div class="judul">
      <h2>Pilih pekerjaan yang sesuai dengan keinginanmu!!</h2>
    </div>

    <!-- list pekerjaan -->
    <div v-if="listPekerjaan.length > 0" class="list-pekerjaan row">
      <div
        :key="pekerjaan.id"
        v-for="pekerjaan in listPekerjaan"
        class="card col-3"
        style="width: 18rem;"
      >
        <img src="../assets/programming.png" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{ pekerjaan.nama }}</h5>
          <p class="card-text">
            {{ pekerjaan.deskripsi }}
          </p>
          <a @click="goToLearning(pekerjaan.id)" class="btn btn-primary"
            >Learning Path</a
          >
        </div>
      </div>
      <!-- end of list pekerjaan -->
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import firebase from "../firebase";

export default {
  components: {
    Navbar
  },

  data() {
    return {
      listPekerjaan: []
    };
  },

  firestore: {
    listPekerjaan: firebase.db.collection("pekerjaan")
  },

  methods: {
    goToLearning(id) {
      this.$router.push(`/learning/${id}`);
    }
  },

  mounted() {
    console.log(this.listPekerjaan);
  }
};
</script>

<style scoped>
h1 {
  font-size: 50px;
  color: white;
  font-weight: bold;
  margin-top: -85px;
  margin-left: 95px;
}

h2 {
  font-size: 25px;
  color: black;
  font-weight: bold;
  margin-top: 58px;
  margin-left: 95px;
}

.list-pekerjaan {
  justify-content: center;
}

.card {
  text-align: center;
  margin: 22px;
  padding: 20px;
}

.btn-primary {
  background: #367d5d;
  border: #367d5d;
}
</style>
