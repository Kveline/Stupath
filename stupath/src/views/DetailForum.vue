<template>
  <div v-if="diskusi">
    <Navbar />
    <h1 class="judul-halaman">DISKUSI</h1>

    <div class="big-card container">
      <div class="card">
        <div class="card-header">
          {{ diskusi.username }}
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ diskusi.judul }}</h5>
          <p class="card-text">
            {{ diskusi.deskripsi }}
          </p>
        </div>
      </div>
    </div>

    <hr />

    <div >
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

    <hr />

    <div class="membalas-diskusi">
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Example textarea</label>
        <textarea
          v-model="isiBalasan"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <button @click="balasDiskusi" class="btn btn-primary">Balas</button>
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
  margin-bottom: 60px;
}

.balasan {
  width: 60%;
  margin-top: 40px;
  margin-left: 60px;
}

.membalas-diskusi {
  padding: 10px 140px;
}
</style>
