class User {

    String username;
    String password;
    String onlineStatus;
    String name;

    void updateProfile() {

    }

    void login() {
        onlineStatus = "Online";
    }

    void logout() {
        onlineStatus = "Offline";
    }
}

class Admin extends User {

    int kontribusi;

    void tambahSertifikasi() {

    }

    void tambahMateri() {

    }

    void hapusMateri() {

    }

    void buatLearningPath() {

    }

    void memverifikasi() {

    }
}

class Pelajar extends User {

    String pilihanProfesi;
    int learningPoint;
    progress[] object;
    boolean verificationStatus;

    void buatThread() {

    }

    void berkomentar() {

    }

    void masukForum() {

    }

    void aksesMateri() {

    }

    void aksesSertifikasi() {

    }

    void editThread() {

    }
}

class Forum {

    boolean status;
    Thread[] object;
    Thread[] fetchThread() {
        return object;
    }
}

class Thread {

    String id;
    int member;
    replies[] object;
    replies[] fetchReplies() {
        return object;
    }

    int fetchMember() {
        return member;
    }
}

class Materi {

    String id;
    String judul;
    String sumber;
    String author;
    learningPath[] object;
    //learning path array object
}

public class PrakPPL {

    public static void main(String[] args) {

    }

}
