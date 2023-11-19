<script>
import vistas from './VistasMenu/VistasMenu.vue'

export default {
    data() {
        return {
            opcion: '',
            menu: [],
            mensaje: '',
            mensajes: [],

            mostrarVista: 'inicio'
        };
    },
    components: {
        vistas
    },
    sockets: {
        connect() {
            console.log('Connected to server');
        },
        disconnect() {
            console.log('Disconnected from server');
        },
        'chat message'(msg) {
            this.mensajes.push(msg);
        },
        'msg personal'(msg) {
            console.log('Mensaje personal recibido:', msg);
            this.mensajes.push(msg);
        },
        'opciones menu'(msg) {
            this.menu.push(msg);
        },
    },
    methods: {
        cambiarVista(seleccion){
            this.mostrarVista = seleccion;
        },
        sendMessage() {
            if (this.mensaje.trim() !== '') {
                this.$socket.emit('chat message', this.mensaje);
                this.mensaje = '';
            }
        },
        botonMessage(opc) {
            this.opcion = opc.id;
            if (this.opcion.trim() !== '') {
                this.$socket.emit('chat message', this.opcion);
            }
        }
    }
};


</script>

<template>
    <div class="grid p-fluid">
        <div class="col-12">
            <div class="card card-w-title">
                <center>
                    <h1>La Suculenta</h1>
                    <h3>Servidor</h3>
                </center>
            </div>
        </div>

        <!-- <div class="col-12 md:col-3">
            <div class="card card-w-title">
                <h5>Home</h5>
                <div v-for="opciones in menu" :key="opciones.id">
                    <Button class="mr-2 mb-2" @click="botonMessage(opciones)">{{ opciones.opc }}</Button>
                </div>
            </div>
        </div> -->

        <div class="col-12 md:col-3">
            <div class="card card-w-title">
                <h5>Home</h5>
                <!-- <PanelMenu :model="panelMenuitems" /> -->
                <Button class="mr-2 mb-2" @click="cambiarVista('inicio')">Inicio</Button>
                <div v-for="opciones in menu" :key="opciones.id">
                    <Button class="mr-2 mb-2" @click="cambiarVista(opciones.id)">{{ opciones.nombreOpc }}</Button>
                </div>
                <Button class="mr-2 mb-2" @click="cambiarVista('ayuda')">Ayuda</Button>
            </div>
        </div>

        <!-- <div class="col-12 md:col-9">
            <div class="card card-w-title">
                <center>
                    <h1>Bienvenido al gestor administrativo</h1>
                    <h1>Socket implementado</h1>
                    <li v-for="msg in mensajes" :key="msg">{{ msg }}</li>
                </center>
            </div>
        </div> -->

        <div class="col-12 md:col-9">
            <div class="card card-w-title">
                <vistas :mostrarVista="mostrarVista" />
            </div>
        </div>
    </div>
</template>