<template>
  <div>
    <Navbar />
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Pilih Pekerjaan</h1>
        <p class="lead">
          Silahkan pilih pekerjaanmu di masa depan, dan persiapkan skillmu !
          <br />
          Kami datang untuk mempermudah dalam belajar
        </p>
      </div>
    </div>

    <!-- list pekerjaan -->
    <div v-if="listPekerjaan.length > 0" class="list-pekerjaan row">
      <div
        :key="pekerjaan.id"
        v-for="pekerjaan in listPekerjaan"
        class="card col-3"
        style="width: 18rem;"
      >
        <img
          src="../assets/programming.png"
          style="object-fit:cover"
          width="300px"
          height="200px"
          class="card-img-top"
          alt="..."
        />
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
.list-pekerjaan {
  margin-top: -90px;
  justify-content: center;
}

.card {
  text-align: center;
  border: none;
  margin: 22px;
  padding: 20px;
  box-shadow: 0px 4px 53px -17px rgba(0, 0, 0, 0.25);
  border-radius: 26px;
}

.btn-primary {
  background: #00918e;
  border: #00918e;
  border-radius: 12px;
}

.card-title {
  color: #212e22;
}

.card-text {
  color: #6f737b;
}
.jumbotron {
  background: linear-gradient(
      0deg,
      rgba(0, 157, 117, 0.8),
      rgba(0, 157, 117, 0.8)
    ),
    url("../assets/pekerjaan.jpg");

  padding: 100px;
  text-align: center;
  color: white;
  background-size: cover;
}
</style>
