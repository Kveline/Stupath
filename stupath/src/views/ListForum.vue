<template>
  <div>
    <Navbar />
    <h1 class="judul-halaman">FORUM</h1>

    <div v-if="listForum.length > 0" class="list-card">
      <div :key="forum.id" v-for="forum in listForum" class="card">
        <h5 class="card-header">{{ forum.pekerjaan }}</h5>
        <div class="card-body">
          <h5 class="card-title">{{ forum.judul }}</h5>
          <p class="card-text">
            {{ forum.deskripsi }}
          </p>
          <a @click="goToForum(forum.id)" class="btn btn-primary"
            >Lihat Forum</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import Navbar from "../components/Navbar";

export default {
  components: {
    Navbar
  },

  data() {
    return {
      listForum: []
    };
  },

  firestore: {
    listForum: firebase.db.collection("forum")
  },

  methods: {
    goToForum(id) {
      this.$router.push(`/forum/${id}`);
    }
  },

  mounted() {
    console.log(this.listForum);
  }
};
</script>

<style scoped>
.judul-halaman {
  font-size: 50px;
  color: white;
  font-weight: bold;
  margin-top: -85px;
  margin-left: 95px;
}

.list-card {
  margin: 40px;
  margin-top: 60px;
  width: 70%;
}

.btn-primary {
  background: #367d5d;
  border-color: #367d5d;
}

.card {
  margin-bottom: 40px;
}
</style>
