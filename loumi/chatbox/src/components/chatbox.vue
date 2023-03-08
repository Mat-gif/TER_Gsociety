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
    <input
      v-model="text"
      placeholder="write a message..."
      class="text-message"
      v-on:keyup.enter="sendMessage"
    />
  </div>
</template>

<script>
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";

export default {
  data() {
    return {
      joined: false,
      username: "",
      text: "",
      messages: [],
      socket: null,
    };
  },

  methods: {
    onSubmit() {
      this.joined = true;
      this.socket = io("http://localhost:3000");
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
    },
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
  margin-top: 20px;
  padding: 0.5rem;
  width: 100%;
  outline: none;
  border: solid 3px lightskyblue;
  border-radius: 11px;
}
input::placeholder {
  padding-left: 8px;
  font-size: 1.5rem;
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
</style>
