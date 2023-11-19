<template>
    <div v-if="mostrarVista === 'inicio'">
        <div class="col-12 md:col-9">
            <div class="card card-w-title">
                <center>
                    <h1>Bienvenido al gestor administrativo</h1>
                    <h1>Socket implementado</h1>
                </center>
            </div>
        </div>
    </div>

    <div v-if="mostrarVista === '1'">
        <VistaPlatillos></VistaPlatillos> 
    </div>

    <div v-if="mostrarVista === '2'">
        <vistaIngredientes></vistaIngredientes> 
    </div>

    <div v-if="mostrarVista === '3'">
        <VistaMeseros></VistaMeseros> 
    </div>

    <div v-if="mostrarVista === '4'">
        <VistaCocineros></VistaCocineros> 
    </div>

    <div v-if="mostrarVista === '5'">
        <VistaOrdenes></VistaOrdenes> 
    </div>

    <div v-if="mostrarVista === '6'">
        <VistaReportes></VistaReportes> 
    </div>

    <div v-if="mostrarVista === 'ayuda'">
        <chatBot></chatBot>
    </div>
</template>


<script>
import VistaPlatillos from './VistaPlatillos.vue';
import VistaIngredientes from './VistaIngredientes.vue';
import VistaMeseros from './VistaMeseros.vue';
import VistaCocineros from './VistaCocineros.vue';
import VistaOrdenes from './VistaOrdenes.vue';
import VistaReportes from './VistaReportes.vue';
import chatBot from './chatBot/chat.vue';

import axios from 'axios';

    export default{
        components: {
            VistaPlatillos,
            VistaIngredientes,
            VistaMeseros,
            VistaCocineros,
            VistaOrdenes,
            VistaReportes,
            chatBot
        },

        props: ['mostrarVista'],
    }    
</script>