<template>
    <div class="card card-w-title">
        <center>
            <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Escribe tu mensaje..." />
            <div>{{ botMessage }}</div>
        </center>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userMessage: '',
      botMessage: '',
    };
  },
  methods: {
    sendMessage() {
      // Enviar el mensaje al backend
      this.botMessage = 'En espera...';
      axios.post('http://localhost:3000/api/chat', { message: this.userMessage })
        .then(response => {
          this.botMessage = response.data.message;
        })
        .catch(error => {
          console.error('Error al enviar mensaje:', error);
        });
    },
  },
};
</script>