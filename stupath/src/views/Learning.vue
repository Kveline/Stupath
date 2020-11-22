<template>
  <div v-if="pekerjaan">
    <Navbar />
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">{{ pekerjaan.nama }}</h1>
        <p class="lead">
          Kami telah menyediakan <i>Learning Path</i>
          <br />
          mengantarkanmu menjadi seorang {{ pekerjaan.nama }}
        </p>
      </div>
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

    <a
      v-if="userProfile.role === 'admin'"
      data-toggle="modal"
      data-target="#exampleModal"
      data-whatever="@mdo"
      class="float"
    >
      <svg
        fill="white"
        height="22px"
        viewBox="0 0 448 448"
        width="22px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"
        />
      </svg>
    </a>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import firebase from "../firebase";
import { mapState } from "vuex";

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
      console.log(this.pekerjaan);
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
    console.log(this.pekerjaan);
  },
  computed: mapState(["userProfile"])
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
  border-bottom: 1px solid gray;
  margin-bottom: 42px;
  display: flex;
  padding-bottom: 40px;
  display: flex;
  align-items: center;
}

.path-container h2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  font-size: 72px;
  line-height: 88px;
  color: #00918e;
  padding-top: 35px;
  padding-bottom: 99px;
}

.content h1 {
  font-weight: bold;
  font-size: 22px;
  color: #212e22;
  /* #151515 */

  color: #151515;
}
.content p {
  color: #6f737b;
  font-weight: 300;
  font-size: 18px;
  margin-bottom: 27px;
}

.content a {
  padding: 8px 20px;
  font-weight: 500;
  font-size: 16px;
  border-radius: 12px;
  color: #f7f7f7;
  background: rgba(0, 157, 117, 0.8);
  box-shadow: 2px 2px 3px #999;
  text-decoration: none;
}

.counter {
  border-radius: 50%;
  color: white;
  width: 80px;
  background: rgba(0, 157, 117, 0.8);
  height: 80px;
  display: flex;
  margin-right: 50px;
  align-items: center;
  justify-content: center;
  font-size: 40px;
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

.float {
  cursor: pointer;
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #0c9;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
