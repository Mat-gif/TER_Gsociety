<!-- ====================================================================== -->
<!-- ====================================================================== -->
<!-- ========================== Page d'indentification===================== -->
<!-- ====================================================================== -->
<!-- ====================================================================== -->

<template>
  <Chat
    :joined="joined"
    :utilisateur="utilisateur"
    :messages="messages"
    :socket="socket"
    :text="text"
    @event-messages="listenToMessages"
  ></Chat>
  <div class="grid">
    <div>
      <h1 class="title">Quoridor</h1>
    </div>
    <div>
      <img src="./quoridor-removebg-preview.png" class="img" />
    </div>
  </div>
  <!-- v-bind:joined="joined" -->
  <div class="container">
    <div class="row">
      <div class="username_ask col mt-5 pt-5">
        <form class="form" v-on:submit.prevent="OnSubmit">
          <label username="Username">Nom d'utilisateur</label>
          <input type="text" class="form-control" v-model="utilisateur" />
          <button class="btn btn-start">Démarrer</button>
        </form>
      </div>
    </div>
  </div>
  <!-- v-if="joined" -->
  <div class="containi">
    <div>
      <div>
        <h2 class="chatty">Chat</h2>
        <div
          v-for="message in messages"
          :key="message.id"
          :class="{
            'message-from-me': message.socketId === socket.id,
            'message-from-others': message.socketId !== socket.id,
          }"
          class="mt-3"
        >
          <div class="d-flex">
            <div v-if="message.user !== utilisateur">
              <span
                ><b>{{ message.user }} </b></span
              >
            </div>
            <div>
              <b class="text_saisie">{{ message.text }}</b>
            </div>
          </div>
        </div>

        <input
          v-model="text"
          placeholder="write a message..."
          class="text-message"
          v-on:keyup.enter="sendMessage"
        />
        <!-- v-on:keyup.enter="sendMessage" -->
      </div>
    </div>
    <v-stage ref="stage" :config="stageSize" @click="handlerclik">
      <v-layer>
        <template
          v-for="x in Array.from({ length: 9 }, (_, i) => i + 1)"
          :key="x"
        >
          <template
            v-for="y in Array.from({ length: 9 }, (_, i) => i + 1)"
            :key="y"
          >
            <v-rect
              :config="{
                x: 50 * x,
                y: 50 * y,
                width: 40,
                height: 40,
                fill: 'blue',
              }"
            />
          </template>
        </template>
      </v-layer>
    </v-stage>

    <!-- v-on:keyup.enter="sendMessage" -->
  </div>
</template>
<script>
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import Chat from "./components/chatBox.vue";
// eslint-disable-next-line vue/no-export-in-script-setup
export default {
  data() {
    return {
      joined: false,
      utilisateur: "",
      text: "",
      messages: [],
      socket: null,
      stageSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
  },
  components: {
    Chat,
  },
  methods: {
    handlerclik() {
      var theClick = this.$refs.stage.getNode().getPointerPosition();
      this.$refs.stage.getNode().children[0].children.forEach((element) => {
        element.attrs.fill = element.attrs.fill === "blue" ? "blue" : "blue";

        if (
          theClick.x >= element.attrs.x &&
          theClick.x <= element.attrs.x + element.attrs.width &&
          theClick.y >= element.attrs.y &&
          theClick.y <= element.attrs.y + element.attrs.height
        ) {
          element.attrs.fill = element.attrs.fill === "red" ? "blue" : "red";
        }
      });
    },
    OnSubmit() {
      console.log("submitteed");
      this.socket = io("http://localhost:3000");
      this.joined = true;
      this.socket.on("message recu", (data) => {
        this.messages = this.messages.concat(data);
      });

      if (this.joined) {
        () => {
          let chatty = document.querySelector(".chatty");
          console.log(chatty);
          const form = document.querySelector(".form");
          const stage = document.querySelector(".containi");

          form.classList.add("d-none");
          stage.classList.remove("d-none");
        };
      }
    },

    /// method communication : Parent to child {Chat}
    listenToMessages(messages) {
      console.log(messages);
      this.messages = messages;
    },
    sendMessage() {
      //d'autres possiblités pourront être ajouter
      // if (this.socket && this.socket.connected) {
      console.log(this.text);
      this.addMessage();
      this.text = "";
      // } else {
      //   alert("la connexion au serveur a été perdu ou n'est pas été établie.");
      // }
    },
    addMessage() {
      const message = {
        id: new Date().getHours(),
        text: this.text,
        user: this.utilisateur,
        socketId: this.socket.id,
      };
      this.messages = this.messages.concat(message);
      this.text = "";
      this.socket.emit("message", message);
    },
  },
};
</script>

<!-- =========================================================== -->
<!-- ===== du tyle pour le visuel ============-->
<!-- =========================================================== -->
<style>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}
.title {
  margin-top: 25%;
  font-size: 6rem;
  text-shadow: 2px 7px 10px red;
  display: flex;
  font-family: "Press Start 2P", sans-serif;
  justify-content: center;
  align-items: center;
  margin-left: 25%;
  font-weight: 600;
  animation: anime 5s ease-in-out;
}
.chatty {
  font-family: "Press Start 2P", sans-serif;
}
.img {
  padding-left: 5rem;
  padding-top: 2rem;

  width: 150%;
}
.btn-start {
  background: linear-gradient(90deg, blue, black);
  font-size: 1.5rem;
  padding: 0.5rem;
  font-weight: 600;
  color: white;
  margin-left: 6rem;
}
@keyframes anime {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360);
    transform: scale(2);
  }
}
.containi {
  max-width: min-content;
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 30px;
}
.text-message {
  margin-top: 20px;
  padding: 0.5rem;
  width: 100%;
  outline: none;
  border: solid 3px rgb(83, 91, 96);
  border-radius: 11px;
}
input::placeholder {
  padding-left: 8px;
  font-size: 1.5rem;
}
.pion-test {
  width: 400px;
  height: 400px;
  border-radius: 40px;
  color: orange;
  z-index: 999;
}
.text_saisie {
  overflow: hidden;
  width: 100%;
  padding: 0.5rem;
  border-radius: 9px;
}
.message-from-me {
  background-color: lightcoral;
  border-radius: 15px;
  padding: 10px;
  margin-right: 50%;
}

.message-from-others {
  position: relative;
  background-color: yellowgreen;
  border-radius: 15px;
  padding: 10px;
  margin-left: 50%;
}
.message-from-others span {
  position: absolute;
  padding: 10px;
  margin-left: -68px;
  margin-top: -10px;
  border-radius: 15px;

  background: yellow;
}
</style>
