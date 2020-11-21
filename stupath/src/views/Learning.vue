<template>
  <div v-if="pekerjaan">
    <Navbar />
    <h1 class="judul-halaman">LEARNING PATH</h1>

    <div class="judul">
      <h2>Web Developer</h2>

      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@mdo"
      >
        Tambah Materi
      </button>
    </div>

    <!-- modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New message</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label"
                  >Judul:</label
                >
                <input
                  v-model="learningPathData.judul"
                  type="text"
                  class="form-control"
                  id="recipient-name"
                />
              </div>

              <div class="form-group">
                <label for="message-text" class="col-form-label"
                  >Deskripsi:</label
                >
                <textarea
                  v-model="learningPathData.deskripsi"
                  class="form-control"
                  id="message-text"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="recipient-name2" class="col-form-label"
                  >Link Materi:</label
                >
                <input
                  v-model="learningPathData.referensi"
                  type="text"
                  class="form-control"
                  id="recipient-name2"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              data-dismiss="modal"
              @click="tambahLearningPath"
              type="button"
              class="btn btn-primary"
            >
              Send message
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- end of modal -->

    <!-- learning path -->
    <div
      :key="learning.judul"
      v-for="(learning, index) in pekerjaan.learningPath"
      class="learning-path path-container"
    >
      <div class="content">
        <div class="counter">
          <span>{{ index + 1 }}</span>
        </div>
        <div class="deskripsi">
          <h1>{{ learning.judul }}</h1>
          <p>
            {{ learning.deskripsi }}
          </p>
          <a :href="learning.referensi">Referensi</a>
        </div>
      </div>
    </div>
    <!--  end of learning path -->
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
      pekerjaan: null,
      learningPathData: {
        judul: "",
        deskripsi: "",
        referensi: ""
      }
    };
  },

  methods: {
    async fetchData() {
      await firebase.db
        .collection("pekerjaan")
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          if (!snapshot.exists) return;
          let data = snapshot.data();
          this.pekerjaan = data;
        });
    },

    async tambahLearningPath() {
      let currentPath = this.pekerjaan.learningPath;
      currentPath.push(this.learningPathData);
      console.log(currentPath);

      await firebase.db
        .collection("pekerjaan")
        .doc(this.$route.params.id)
        .update({ learningPath: currentPath });
      this.learningPathData.judul = "";
      this.learningPathData.deskripsi = "";
      this.learningPathData.referensi = "";
      this.fetchData();
    }
  },

  mounted() {
    this.fetchData();
    console.log(this.$route.params.id);
    console.log(this.pekerjaan);
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

h2 {
  font-size: 25px;
  color: black;
  font-weight: bold;
}

.judul {
  margin-top: 58px;
  margin-left: 95px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
}

.list-pekerjaan {
  justify-content: center;
}

.card {
  text-align: center;
  margin: 22px;
  padding: 20px;
}

/*learn*/
.path-container {
  background: #fff;
  height: 100%;
  width: 100vw;
  padding-left: 75px;
  padding-right: 115px;
}
.content {
  display: flex;
  padding-bottom: 114px;
  display: flex;
  align-items: center;
}

.path-container h2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  font-size: 72px;
  line-height: 88px;
  color: #367d5d;
  padding-top: 35px;
  padding-bottom: 99px;
}

.content h1 {
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;

  /* #151515 */

  color: #151515;
}
.content p {
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 27px;
  color: #000000;
}

.content a {
  padding: 11px 37px;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #f7f7f7;
  background: #367d5d;
  box-shadow: 0px 11px 15px rgba(0, 0, 0, 0.25);
  text-decoration: none;
}

.counter {
  border-radius: 50%;
  color: white;
  width: 120px;
  background: #367d5d;
  height: 120px;
  display: flex;
  margin-right: 50px;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}
</style>
