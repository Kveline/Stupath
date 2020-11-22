<template>
  <div v-if="diskusi">
    <Navbar />
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">{{ diskusi.judul }}</h1>
        <p class="lead">
          <br />
          {{ diskusi.deskripsi }} <br />
          <br>
          dibuat oleh {{ diskusi.username }}
        </p>
      </div>
    </div>

    <div>
      <div v-if="diskusi.balasan.length > 0" class="list-balasan">
        <div
          :key="balasan.isi + index"
          v-for="(balasan, index) in diskusi.balasan"
          class="card balasan"
        >
          <div class="card-header">
            {{ balasan.username }}
          </div>
          <div class="card-body">
            <p class="card-text">
              {{ balasan.isi }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="membalas-diskusi">
      <div class="form-group">
        <h2 style="margin:12px;font-size:18px;">Berikan Tanggapan</h2>
        <textarea
          v-model="isiBalasan"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <button @click="balasDiskusi" class="btn btn-primary">
        Kirim Tanggapan
      </button>
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
      diskusi: null,
      isiBalasan: ""
    };
  },

  methods: {
    async fetchData() {
      await firebase.db
        .collection("forum")
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          if (!snapshot.exists) return;
          let data = snapshot.data();
          this.diskusi = data;
          console.log(this.diskusi);
        });
    },

    async balasDiskusi() {
      let currentBalasan = this.diskusi.balasan;
      currentBalasan.push({
        username: this.$store.state.userProfile.username,
        isi: this.isiBalasan
      });

      try {
        await firebase.db
          .collection("forum")
          .doc(this.$route.params.id)
          .update({ balasan: currentBalasan });
      } catch (error) {
        console.log(error);
      }
      this.isiBalasan = "";
      this.fetchData();
    }
  },

  mounted() {
    this.fetchData();
  }
};
</script>

<style>
.container {
  padding: 70px;
}

.judul-halaman {
  font-size: 50px;
  color: white;
  font-weight: bold;
  margin-top: -85px;
  margin-left: 95px;
}

.list-balasan {
  margin-bottom: 20px;
  margin-left: 60px;
  max-height: 595px;
  overflow-y: auto;
}

.card-header {
  color: white;
  background: rgba(0, 157, 117, 0.8);
  border-radius: 26px 26px 0px 0px !important;
}

.card-text {
  color: #6f737b;
}

.balasan {
  width: 70%;
  margin-top: 40px;
  margin-left: 60px;
  border: none;
  box-shadow: 0px 4px 53px -17px rgba(0, 0, 0, 0.25);
  border-radius: 26px;
}

.membalas-diskusi {
  padding: 10px 140px;
  box-shadow: 0px 4px 53px -17px rgba(0, 0, 0, 0.25);
}

.btn-primary {
  background: #00918e;
  border: #00918e;
  border-radius: 12px;
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

textarea {
  border-radius: 12px;
  padding: 10px;
  color: #212e22;
}
</style>
