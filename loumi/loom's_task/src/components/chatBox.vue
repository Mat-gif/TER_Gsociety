<!-- ===================================== -->
<!-- ============= le template ============ -->
<template>
  <div class="container messtemp" v-if="joined">
    <h2>Chat</h2>
    <div
      v-for="message in messages"
      :key="message"
      :class="{
        'message-from-me': message.socketId === socket.id,
        'message-from-others': message.socketId !== socket.id,
      }"
      class="mt-3"
    >
      <div class="d-flex">
        <div v-if="message.user !== utilisateur">
          <b>{{ message.user }}</b>
        </div>
        <div>
          <b class="text_saisie">{{ message.text }}</b>
        </div>
      </div>
    </div>
    <!-- l'input pourrait être afficher si et seulement si les joueurs sont prêts à joueur -->
    <!-- :disabled="!socket || !socket.connected" -->
    <input
      :value="text"
      @input="$emit('update: text', $event.target.value)"
      placeholder="write a message..."
      class="text-message"
    />
    <button @click="sendMessage" class="btn btn-primary mt-3">Envoyer</button>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.css";
export default {
  props: {
    joined: Boolean,
    utilisateur: String,
    text: String,
    messages: Array,
    socket: Object,
  },
  methods: {
    sendMessage() {
      if (this.socket && this.socket.connected) {
        console.log(this.text);
        this.addMessage();
        this.emit = "";
      } else {
        alert("la connexion au serveur a été perdu ou n'est pas été établie.");
      }
    },
    addMessage() {
      const message = {
        id: new Date().getHours(),
        text: this.text,
        user: this.utilisateur,
        socketId: this.socket.id,
      };
      this.$emit("messages", this.messages.concat(message));
      this.$emit("texte", (this.text = ""));
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
  margin-right: 50%;
}

.message-from-others {
  background-color: yellowgreen;
  border-radius: 15px;
  padding: 10px;
  margin-left: 50%;
}
.message-from-others span {
  background-color: transparent;
}
</style>
