<template>
  <div class="chat__layer">
    <div class="information">
      <form v-if="!joined" @submit.prevent="onSubmit">
        <label for="">Username</label>
        <input type="text" class="form-control" v-model="username" />
        <button type="submit" class="btn btn-primary mt-3">Envoyer</button>
      </form>
    </div>
    <div class="container" v-if="joined">
      <div>
        <h2 id="chatty">Chat</h2>
        <button class="future_modal">📨</button>
      </div>
      <div ref="messages">
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
          <div v-if="message.user !== username">
            <span
              ><b>{{ message.user }}</b></span
            >
          </div>
          <div>
            <p>{{ message.text }}</p>
            <span>{{ new Date(message.id).toLocaleTimeString() }}</span>
          </div>
        </div>
      </div>
      <!-- fin du div du milieu -->
      <!-- =================== -->
      <!-- div du bas -->
      <div>
        <input
          v-model="text"
          placeholder="write a message..."
          class="text-message"
          v-on:keyup.enter="sendMessage"
          v-on:keyup="onTyping"
        />
      </div>
      <div id="typing-indicator"></div>
    </div>
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
      isTyping: false,
      timeout: null,
    };

    //** appel d'api  */
// Faites une requête HTTP GET à l'API pour récupérer tous les emojis
axios.get('https://www.emojisworld.fr/')
  .then(function(response) {
    // Traitez la réponse de l'API pour extraire les données dont vous avez besoin
    const emojis = response.data.map(function(emoji) {
      return {
        name: emoji.name,
        image: emoji.image_url,
      };
    });

    // Utilisez les données récupérées pour afficher les emojis dans votre application
    const emojiList = document.getElementById('emoji-list');
    emojis.forEach(function(emoji) {
      const img = document.createElement('img');
      img.src = emoji.image;
      img.alt = emoji.name;
      emojiList.appendChild(img);
    });
  })
  .catch(function(error) {
    console.error(error);
  });
  },

  methods: {
    onSubmit() {
      this.joined = true;
      this.socket = io("http://localhost:3000");
    },

    onTyping() {
      this.isTyping = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.isTyping = false;
        this.socket.emit("typing", this.socket.id);
      }, 500);
    },

    sendMessage() {
      this.isTyping = false;
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

  mounted() {
    this.socket.on("typing", (socketId) => {
      if (socketId !== this.socket.id) {
        this.isTyping = true;
      }
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
  height: 90vh;
}
.text-message {
  width: 100%;
  margin-left: -1.5%;
  padding: 0.5rem;
  outline: none;
  border: solid 3px lightskyblue;
  border-radius: 11px;
  bottom: 3.3%;
  box-sizing: border-box;
}
input::placeholder {
  padding-left: 8px;
  font-size: 1.5rem;
}
.d-flex .text_saisie {
  background-color: red;
  position: relative;
}

.message-from-me {
  position: relative;
  float: right;
  display: flex;
  flex-direction: column;
  gap: 3px;
  border-radius: 7px;
  max-width: 50%;
  margin-left: 50%;
}

.message-from-me div p {
  background-color: lightcoral;
  max-width: 100%;
  word-wrap: break-word !important;
}
.message-from-me div span {
  background: yellow;
  max-width: 100%;
}

.message-from-others {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 98%;
  gap: 10px;
  border-radius: 7px;
  max-width: 50%;
  word-wrap: break-word;
  margin-right: 20%;
}
.message-from-others div p {
  background-color: yellowgreen;
  max-width: 100%;
  word-wrap: break-word !important;
  padding: 0.5rem;
}
.message-from-others div span {
  padding: 0.5rem;
  background: yellow;
  align-self: flex-end;
  max-width: 100%;
  word-wrap: break-word !important;
}
.message__user__time {
  background-color: yellow;
}
#typing-indicator {
  font-size: 0.8rem;
  color: black;
  background-color: aquamarine;
  margin-top: 10px;
}

/* style du div ou du container  */
.chat__layer {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 10px;
  background-color: antiquewhite;
  height: 90vh;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
/* div information pour s'aasurer que quelqu'un est connecté et récuperer ses informations pour la connection ce dernier a été stylé avec bootstrap */
/* le content mais nommer container 
 */
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
}
/* div du haut  */
.container > div:first-child {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.container > div:first-child #chatty {
  font-family: "Press Start 2P", sans-serif;
}
/* div du milieu */
.container > div:nth-child(2) {
  display: flex;
  flex-direction: column;
  padding: 10px;
  flex: 1;
  overflow-y: scroll;
}
/* div du bas  */
.container > div:last-child {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
}
</style>
