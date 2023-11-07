<script>
export default {
    data() {
        return {
            message: '',
            messages: []
        };
    },
    sockets: {
        connect() {
            console.log('Connected to server');
        },
        disconnect() {
            console.log('Disconnected from server');
        },
        'chat message'(msg) {
            this.messages.push(msg);
        },
        'msg personal'(msg) {
            console.log('Mensaje personal recibido:', msg);
            this.messages.push(msg);
        }
    },
    methods: {
        sendMessage() {
            if (this.message.trim() !== '') {
                this.$socket.emit('chat message', this.message);
                this.message = '';
            }
        }
    }
};
</script>

<template>
    <div id="app">
        <h1>Vue.js Socket.io Chat</h1>
        <input v-model="message" @keyup.enter="sendMessage" />
        <button @click="sendMessage">Send</button>
        <ul>
            <li v-for="msg in messages" :key="msg">{{ msg }}</li>
        </ul>
    </div>
</template>