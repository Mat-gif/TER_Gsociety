<template>
  <div class="chat__layer">
<!--    <div class="information">-->
<!--      <form v-if="!joined" @submit.prevent="onSubmit">-->
<!--        <label for="">Username</label>-->
<!--        <input type="text" class="form-control" v-model="username" />-->
<!--        <button type="submit" class="btn btn-primary mt-3">Envoyer</button>-->
<!--      </form>-->
<!--    </div>-->
    <div class="container">
      <div>
        <h2 id="chatty">chatbox</h2>
        <button class="future_modal">📨</button>
      </div>
      <div ref="messages" id="messages">
        <div id="emoji_list"></div>
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
          placeholder="..."
          class="text-message"
          v-on:keyup.enter="sendMessage"
          v-on:keyup="onTyping"
        />
      </div>
<!--      <div id="typing-indicator"></div>-->
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";

export default {
    props:['username', 'socket', 'roomId'],
  data() {
    return {
      text: "",
      messages: [],
      isTyping: false,
      timeout: null,
    };
  },
    created() {
        this.onSubmit();
    },

    methods: {
    onSubmit() {
        // this.socket.emit('game', this.roomId );
      this.socket.on("message recu", (data) => {
        this.messages = [...this.messages, data];
      });
      this.socket.on("typing", (data) => {
        const typingUser = data.username;
        if (typingUser !== this.username) {
          document.getElementById(
            "typing-indicator"
          ).innerHTML = `${typingUser} est en train d'écrire`;
        }
      });
      this.socket.on("stop typing", () => {
        this.socket.emit("stop typing", {
          username: this.username,
        },this.roomId);
        document.getElementById("typing-indicator").innerHTML = "";
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.messages) {
          this.$refs.messages.scrollToBottom = this.$refs.messages.scrollHeight;
        }
      });
    },
    onTyping() {
      this.isTyping = false;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.isTyping = true;
        this.socket.emit("typing", {
          username: this.username,
        },this.roomId);
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
      this.socket.emit("message", message, this.roomId);
      this.scrollToBottom();
    },
  },

  watch() {
    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
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
input{
    color: white;
    background: #333363;
}
input::placeholder {
  padding-left: 8px;
  font-size: 1.5rem;
    color: white;
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
  padding: 0.5rem;
  border-top-left-radius: 34px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 34px;
}
.message-from-me div span {
  margin-right: 0;
  /*background: #767632;*/
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
  border-top-left-radius: 34px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 34px;
  word-wrap: break-word !important;
  padding: 0.5rem;
}
.message-from-others div span {
  padding: 0.5rem;
  /*background: #80804c;*/
  align-self: flex-end;
  max-width: 100%;
  /*border-radius: 50%;*/
  word-wrap: break-word !important;
}
.message__user__time {
  /*background-color: yellow;*/
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
  width: 100%;
  background-color: #0B0B0B;
  height: 90vh;
    color: white;
    border: 3px solid #217BFF;
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
  border-bottom: 2px solid #0c63e4;
}

.container > div:first-child #chatty {
  font-family: "Press Start 2P", sans-serif;
}
/* div du milieu */
.container > div:nth-child(2) {
  display: flex;
  max-height: fit-content;
  flex-direction: column;
  padding: 10px;
  flex: 1;
  overflow-y: auto;
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
