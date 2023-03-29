<!-- eslint-disable vue/multi-word-component-names -->

<!-- pour runner le projet il faut  installer 
npm i bootstrap socket.io socket.io-client

il faut impérativement un serveur qui tourne  sur : http://localhost:3000" voir code @Mat et le lancer 
et puis tu peux revenir sur ton projet et faire npm run dev


cheers🤚🤚🤚
 -->
<template>
  <div class="information">
    <form v-if="!joined" @submit.prevent="onSubmit">
      <label for="">Username</label>
      <input type="text" class="form-control" v-model="username" />
      <button type="submit" class="btn btn-primary mt-3">Envoyer</button>
    </form>
  </div>
  <div class="container messtemp" v-if="joined">
    <h2 id="chatty">Chat</h2>
    <button>📨</button>
    <div
      v-for="message in messages"
      :key="message.id"
      :class="{
        'message-from-me': message.socketId === socket.id,
        'message-from-others':
          message.socketId !== socket.id && message.user !== username,
      }"
      class="mt-3"
    >
      <div class="d-flex">
        <div v-if="message.user !== username">
          <span
            ><b>{{ message.user }}</b></span
          >
        </div>
        <div>
          <b class="text_saisie">{{ message.text }}</b>
        </div>
      </div>
    </div>
    <!-- v-on:keyup="onTyping" -->
    <input
      v-model="text"
      placeholder="write a message..."
      class="text-message"
      v-on:keyup.enter="sendMessage"
      v-on:keyup="onTyping"
    />
    <!-- <p id="typing-indicator" v-if="isTyping && typingUsername !== username">
      {{ typingUsername }} est en train d'écrire...
    </p> -->

    <p id="typing-indicator" v-if="isTyping && typingUsername === username">
      Vous êtes en train d'écrire...
    </p>
    <p id="typing-indicator" v-if="isTyping && typingUsername !== username">
      {{ typingUsername }} est en train d'écrire...
    </p>
  </div>
</template>

<script>
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import { Player, PlayerLinked, Tour } from "/src/module_Tour.js";

export default {
  data() {
    return {
      joined: false,
      username: "",
      text: "",
      messages: [],
      socket: null,
      isTyping: false,
      typingUsername: "",
      timeout: null,
    };
  },

  methods: {
    onSubmit() {
      this.joined = true;
      this.socket = io("http://localhost:3000");
      //*============================================
      //*=============================================
      // Création de joueurs pour tester la classe Player et PlayerLinked
      const player1 = new Player("Mat", true, null, "room1", 0);
      const player2 = new Player("Vic", false, null, "room1", 8);
      const player3 = new Player("lom", false, null, "room1", 4);

      const playerLinked1 = new PlayerLinked(player1);
      const playerLinked2 = new PlayerLinked(player2);
      const playerLinked3 = new PlayerLinked(player3);

      playerLinked1.Playernext = playerLinked2;
      playerLinked2.playerPrev = playerLinked1;
      playerLinked2.Playernext = playerLinked3;
      playerLinked3.playerPrev = playerLinked2;
      playerLinked3.Playernext = playerLinked1;
      playerLinked1.playerPrev = playerLinked3;

      const players = [playerLinked1, playerLinked2, playerLinked3];

      // Création de la classe Tour pour tester les méthodes
      const tour = new Tour(players, playerLinked1);

      console.log("on passe au tour de :", tour.joueurSuivant());
      tour.changerJoueurActif();
      console.log(`${tour.currentPlayer.name} est en train de jouer`);
      console.log(
        ` Est-ce que la partie est terminée ${tour.estFini()} car ${
          tour.currentPlayer.name
        } est en train de jouer`
      );

      //*============================================
      //*=============================================

      //traitement des messages reçus

      //============================================
      //implementation côté serveur

      /* le code : s'il y'a message je le diffuse à tous les sockets connectés  */
      //       socket.on("message", (data) => {
      //     socket.broadcast.emit("message recu", data);
      //   });

      ///==========================================
      this.socket.on("message recu", (data) => {
        this.messages = [...this.messages, data];
      });
    },
    sendMessage() {
      if (!this.socket || !this.socket.connected) {
        alert("La connexion au serveur a été perdue ou n'est pas établie.");
        return;
      }
      const message = {
        id: new Date().getTime(),
        text: this.text,
        user: this.username,
        socketId: this.socket.id,
      };

      this.messages = [...this.messages, message];
      this.text = "";
      this.socket.emit("message", message);
      this.socket.emit("stop typing", this.username);
    },
    onTyping() {
      this.socket.emit("typing", this.username);
    },
  },
  watch: {
    text: function () {
      this.isTyping = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.isTyping = false;
      }, 1000);
    },
  },
  mounted() {
    // ...
    this.socket = io("http://localhost:3000");

    this.socket.on("typing", (username) => {
      document.getElementById(
        "typing-indicator"
      ).textContent = `${username} est en train d'écrire...`;
    });

    // eslint-disable-next-line no-unused-vars
    this.socket.on("stop typing", (username) => {
      document.getElementById("typing-indicator").textContent = "";
    });
  },
};
</script>

<!-- =========================================================== -->

<!-- ========= du css pour la visibilité ============= -->
<!-- =========================================================== -->
<style scoped>
.messtemp {
  padding-bottom: 5px;
}
#chatty {
  font-family: "Press Start 2P", sans-serif;
}
.text-message {
  /* margin-top: 20px; */
  width: 100%;
  padding: 0.5rem;
  outline: none;
  border: solid 3px lightskyblue;
  border-radius: 11px;
  bottom: 0;
  position: fixed;
  box-sizing: border-box;
}
input::placeholder {
  padding-left: 8px;
  font-size: 1.5rem;
}
.text_saisie {
  text-align: center;
  overflow: hidden;
  width: 100%;
  padding: 0.5rem;
  border-radius: 9px;
}
.message-from-me {
  background-color: lightcoral;
  border-radius: 15px;
  padding: 10px;
  margin-left: 50%;
}

.message-from-others {
  background-color: yellowgreen;
  border-radius: 15px;
  padding: 10px;
  margin-left: 68px;
  margin-right: 48%;
}
.message-from-others span {
  position: absolute;
  padding: 10px;
  margin-left: -90px;
  margin-top: -10px;
  border-radius: 15px;
  background: yellow;
}
#typing-indicator {
  font-size: 0.8rem;
  color: gray;
  background-color: aquamarine;
  margin-top: 10px;
}
</style>
