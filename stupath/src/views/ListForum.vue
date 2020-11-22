<template>
  <div>
    <Navbar />
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Forum</h1>
        <p class="lead">
          Forum yang akan digunakan
          <br />
          untuk berdiskusi seputar pekerjaan / materi sesama pengguna
        </p>
      </div>
    </div>

    <div v-if="listForum.length > 0" class="list-card">
      <div
        :key="forum.id"
        v-for="forum in listForum"
        style="margin-bottom: 32px;
"
        class="courses-container"
      >
        <div class="course">
          <div class="course-preview">
            <h6>{{ forum.username }}</h6>
            <h2>{{ forum.pekerjaan }}</h2>
          </div>
          <div class="course-info">
            <div class="progress-container">
              <span class="progress-text">
                {{ forum.balasan.length }} Tanggapan
              </span>
            </div>
            <h6>{{ forum.judul }}</h6>
            <h2
              style="min-height: 62px;;line-height: 20px;font-weight: 300;margin-right: 178px;color: rgb(33, 46, 34);"
            >
              {{ forum.deskripsi }}
            </h2>
            <button @click="goToForum(forum.id)" class="btn">
              Lihat Forum
            </button>
          </div>
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
.list-card {
  margin: 40px;
  margin-top: 60px;
}

.card {
  margin-bottom: 40px;
}

.jumbotron {
  background: linear-gradient(
      0deg,
      rgba(0, 157, 117, 0.8),
      rgba(0, 157, 117, 0.8)
    ),
    url("../assets/belajar.jpg");

  padding: 100px;
  text-align: center;
  color: white;
  background-size: cover;
}

.course {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  max-width: 100%;
  margin: 20px;
  overflow: hidden;
  width: 1000px;
  margin: auto;
}

.course h6 {
  opacity: 0.6;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.course h2 {
  letter-spacing: 1px;
  margin: 10px 0;
  font-size: 16px;
}

.course-preview {
  background-color: rgba(0, 157, 117, 0.8);
  color: #fff;
  padding: 30px;
  width: 250px;
}

.course-preview a {
  color: #fff;
  display: inline-block;
  font-size: 12px;
  opacity: 0.6;
  margin-top: 30px;
  text-decoration: none;
}

.course-info {
  padding: 30px;
  position: relative;
  width: 100%;
}

.progress-container {
  position: absolute;
  top: 30px;
  right: 30px;
  text-align: right;
  width: 150px;
}

.progress {
  background-color: #ddd;
  border-radius: 3px;
  height: 5px;
  width: 100%;
}

.progress::after {
  border-radius: 3px;
  background-color: rgba(0, 157, 117, 0.8);
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
  width: 66%;
}

.progress-text {
  font-size: 12px;
  opacity: 0.6;
  letter-spacing: 1px;
}

.btn {
  background-color: rgba(0, 157, 117, 0.8);
  border: 0;
  border-radius: 50px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 16px;
  padding: 12px 25px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  letter-spacing: 1px;
}
</style>
