<template>
    <div class="grid">
        <div class="col-12 md:col-3">
            <div class="card card-w-title">
                <h5>Home</h5>
                <div v-for="opciones in menu" :key="opciones.id">
                    <Button class="mr-2 mb-2" @click="cambiarVista(opciones.id)">{{ opciones.opcion }}</Button>
                </div>
            </div>
        </div>
        
        <div class="col-12 md:col-9">
            <div v-if="mostrarVista === 1">
                <VistaPlatillos></VistaPlatillos> 
            </div>

            <div v-if="mostrarVista === 2">
                <vistaIngredientes></vistaIngredientes> 
            </div>

            <div v-if="mostrarVista === 3">
                <VistaMeseros></VistaMeseros> 
            </div>

            <div v-if="mostrarVista === 4">
                <VistaCocineros></VistaCocineros> 
            </div>

            <div v-if="mostrarVista === 5">
                <VistaOrdenes></VistaOrdenes> 
            </div>

            <div v-if="mostrarVista === 6">
                <VistaReportes></VistaReportes> 
            </div>

            <div v-if="mostrarVista === 'ayuda'">
                <chatBot></chatBot>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                menu: [{
                    'id': 1, 'opcion': 'Producto por agotarse'
                },
                {
                    'id': 2, 'opcion': 'Diferencia de costos'
                },
                {
                    'id': 3, 'opcion': 'Pedidos elaborados'
                },
                {
                    'id': 4, 'opcion': 'Mesero que mas pedidos realiza'
                },
                {
                    'id': 5, 'opcion': 'Cocinero que mas platillo elabora'
                }],

                mostrarVista: '1'
            };
        },

        methods: {
            cambiarVista(seleccion){
                this.mostrarVista = seleccion;
            }
        }
    }
</script>