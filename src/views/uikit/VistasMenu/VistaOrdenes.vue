<template>
    <div>
        <h3>Administracion de Ordenes</h3>
        <Toolbar class="mb-4">
            <template v-slot:start>
                <div class="my-2">
                    <Button label="Añadir nueva Orden" icon="pi pi-plus" class="p-button-success mr-2"
                        @click="ingresarOrden" />
                </div>
            </template>
            <template v-slot:end>
                <div class="my-2">
                    <Button label="Actualizar pagina" icon="pi pi-refresh" class="p-button-info mr-2" @click="refresh" />
                </div>
            </template>
        </Toolbar>

        <h5>En espera</h5>
        <DataTable :value="CRUD_ORDEN.ordenesEspera" v-model:selection="ordenNueva"
            class="p-datatable-gridlines" dataKey="id_orden" :rows="5"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Visualizando {last} de {totalRecords} productos"
            style="margin-bottom: 20px" :paginator="true" responsiveLayout="scroll">
            <Column field="id_orden" header="ID" style="width:10px"></Column>
            <Column field="nombre_cliente" header="Cliente" style="width:140px"></Column>
            <Column field="fecha" header="Fecha" style="width:100px"></Column>
            <Column field="hora" header="Hora" style="width:100px"></Column>
            <Column field="total" header="Total" style="width:10px">
                <template #body="slotProps">
                    {{ formatoMoneda(slotProps.data.total) }}
                </template>
            </Column>
            <Column style="width:20px">
                <template #header>
                    Acciones
                </template>
                <template #body="slotProps">
                    <Button icon="pi pi-check-circle" type="button" class="p-button-raised p-button-success mr-2 mb-2"
                        @click="entregarOrden(slotProps.data.id_orden)"></Button>
                    <Button icon="pi pi-ban" type="button" class="p-button-raised p-button-danger mr-2 mb-2"
                        @click="confirmaEliminarProductos(slotProps.data.id_orden)"></Button>
                </template>
            </Column>
        </DataTable>

        <h5>Entregados</h5>
        <DataTable :value="CRUD_ORDEN.ordenesEntregados" v-model:selection="ordenEntregada"
            class="p-datatable-gridlines" dataKey="id_orden" :rows="5"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Visualizando {last} de {totalRecords} productos"
            style="margin-bottom: 20px" :paginator="true" responsiveLayout="scroll">
            <Column field="id_orden" header="ID" style="width:10px"></Column>
            <Column field="nombre_cliente" header="Cliente" style="width:140px"></Column>
            <Column field="fecha" header="Fecha" style="width:100px"></Column>
            <Column field="hora" header="Hora" style="width:100px"></Column>
            <Column field="total" header="Total" style="width:10px">
                <template #body="slotProps">
                    {{ formatoMoneda(slotProps.data.total) }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            divs: [],
            platilloNew: false,
            platilloDescrip: false,
            platilloEdit: false,
            platilloDelete: false,
            valorDelete: null,

            CRUD_ORDEN: {
                ordenesEspera: [{
                    'id_orden': 1, 'nombre_cliente': 'Sergio Perez', 'fecha': '16-11-2023', 'hora': '10:33:15 pm', 'total': 1200
                },
                {
                    'id_orden': 2, 'nombre_cliente': 'Fernando Alonso', 'fecha': '16-11-2023', 'hora': '10:42:49 pm', 'total': 1100
                }],
                
                ordenesEntregados: [],

                ordenNueva: {
                    id_orden: null,
                    nombre_cliente: null,
                    fecha: null,
                    hora: null,
                    total: null
                },

                ordenEntregada: {
                    id_orden: null,
                    nombre_cliente: null,
                    fecha: null,
                    hora: null,
                    total: null
                },

                nuevoPlatillo: {
                    nombre_platillo: null,
                    precio_platillo: null,
                    nombre_ingrediente: null,
                    cantidad: null,
                    u_medida: null
                },

                editarPlatillo: {
                    id_platillo: null,
                    nombre_platillo: null,
                    precio_platillo: null,
                    nombre_ingrediente: null,
                    cantidad: null,
                    u_medida: null
                },
            },
        }
    },

    mounted() {
        this.consultarIngrediente();
    },

    methods: {
        limpiar() {
            this.CRUD_PLATILLOS.editarPlatillo.id_platillo = null;
            this.CRUD_PLATILLOS.editarPlatillo.nombre_platillo = null;
            this.CRUD_PLATILLOS.editarPlatillo.precio_platillo = null;

            this.CRUD_PLATILLOS.nuevoPlatillo.nombre_platillo = null;
            this.CRUD_PLATILLOS.nuevoPlatillo.precio_platillo = null;
            this.CRUD_PLATILLOS.nuevoPlatillo.nombre_ingrediente = null;
            this.CRUD_PLATILLOS.nuevoPlatillo.cantidad = null;
            this.CRUD_PLATILLOS.nuevoPlatillo.u_medida = null;
        },
        ingresarIngrediente() {
            this.limpiar();
            this.ingredienteNew = true;
        },

        guardarIngrediente() {

            const datos = {
                nombre_ingrediente: this.CRUD_PLATILLOS.nuevoPlatillo.nombre_platillo
            };

            axios.post('http://localhost:5432/agregarPlatillo', datos)
                .then(response => {
                    console.log(response.data);
                    // Realizar acciones adicionales si es necesario
                })
                .catch(error => {
                    console.error('Error al enviar datos al servidor: ' + error.message);
                });

            this.close();
            this.consultarPlatillo();
        },
        guardarEditar(value) {
            const datos = {
                nombre_platillo: this.CRUD_PLATILLOS.editarPlatillo.nombre_platillo,
                precio_platillo: this.CRUD_PLATILLOS.editarPlatillo.precio_platillo,
            };

            const url = 'http://localhost:5432/editPlatillo?idP=' + value;
            console.log(url);
            axios.put(url, datos)
                .then(response => {
                    console.log(response.data);
                    // Puedes realizar alguna acción adicional si es necesario
                })
                .catch(error => {
                    console.error('Error al actualizar datos en el servidor: ' + error.message);
                });

            this.close();
            this.consultarPlatillo();
        },

        consultarIngrediente() {
            const url = 'http://localhost:5432/ingredientes';
            axios.get(url)
                .then(response => {
                    this.CRUD_INGREDIENTES.tablaIngredientes = response.data;
                })
                .catch(error => {
                    console.error('Error al obtener datos desde el servidor:', error);
                });
        },

        formatoMoneda(value) {
            if (value)
                return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            return;
        },

        confirmaEliminarProductos(value) {
            this.valorDelete = null;
            this.valorDelete = value;
            this.platilloDelete = true;
        },

        confirmDelete() {
            const value = this.valorDelete;
            const url = 'http://localhost:5432/deletePlatillo?idP=' + value;
            axios.delete(url)
                .then(response => {
                    console.log(response.data);
                    // Puedes realizar alguna acción adicional si es necesario
                })
                .catch(error => {
                    console.error('Error al eliminar datos en el servidor: ' + error.message);
                });
            this.close();
            this.consultarPlatillo();
        },

        visualizarIngredientes(value) {
            this.DET_PLATILLO.tablaDetPlat = [];
            const url = 'http://localhost:5432/detPlatillo?idP=' + value;
            axios.get(url)
                .then(response => {
                    this.DET_PLATILLO.tablaDetPlat = response.data;
                })
                .catch(error => {
                    console.error('Error al obtener datos desde el servidor:', error);
                });
            this.platilloDescrip = true;
        },

        close() {
            this.platilloNew = false;
            this.platilloDescrip = false;
            this.platilloEdit = false;
            this.platilloDelete = false;
        },

        editarProductos(value) {
            this.limpiar();
            this.DET_PLATILLO.tablaDetPlat = [];
            const url = 'http://localhost:5432/detPlatillo?idP=' + value;
            axios.get(url)
                .then(response => {
                    this.DET_PLATILLO.tablaDetPlat = response.data;
                })
                .catch(error => {
                    console.error('Error al obtener datos desde el servidor:', error);
                });
            const id = this.CRUD_PLATILLOS.tablaPlatillos.findIndex((columna) => columna.id_platillo === value);

            this.CRUD_PLATILLOS.editarPlatillo.id_platillo = value;
            this.CRUD_PLATILLOS.editarPlatillo.nombre_platillo = this.CRUD_PLATILLOS.tablaPlatillos[id].nombre_platillo;
            this.CRUD_PLATILLOS.editarPlatillo.precio_platillo = this.CRUD_PLATILLOS.tablaPlatillos[id].precio_platillo;

            this.DET_PLATILLO.detPlatItem.cantidad = this.DET_PLATILLO.tablaDetPlat.cantidad;
            this.DET_PLATILLO.detPlatItem.u_medida = this.DET_PLATILLO.tablaDetPlat.u_medida;
            this.DET_PLATILLO.detPlatItem.nombre_ingrediente = this.DET_PLATILLO.tablaDetPlat.nombre_ingrediente;

            this.platilloEdit = true;
        },

        entregarOrden(value){
            this.CRUD_ORDEN.ordenEntregada.id_orden = '';
            this.CRUD_ORDEN.ordenEntregada.nombre_cliente = '';
            this.CRUD_ORDEN.ordenEntregada.fecha = '';
            this.CRUD_ORDEN.ordenEntregada.hora = '';
            this.CRUD_ORDEN.ordenEntregada.total = '';
            
            const id = this.CRUD_ORDEN.ordenesEspera.findIndex((columna) => columna.id_orden === value);

            this.CRUD_ORDEN.ordenEntregada.id_orden = value;
            this.CRUD_ORDEN.ordenEntregada.nombre_cliente = this.CRUD_ORDEN.ordenesEspera[id].nombre_cliente;
            this.CRUD_ORDEN.ordenEntregada.fecha = this.CRUD_ORDEN.ordenesEspera[id].fecha;
            this.CRUD_ORDEN.ordenEntregada.hora = this.CRUD_ORDEN.ordenesEspera[id].hora;
            this.CRUD_ORDEN.ordenEntregada.total = this.CRUD_ORDEN.ordenesEspera[id].total;

            this.CRUD_ORDEN.ordenesEntregados.push(this.CRUD_ORDEN.ordenEntregada);

            if(id !== -1){
				this.CRUD_ORDEN.ordenesEspera.splice(id, 1);
            }
        },

        refresh() {
            this.consultarIngrediente();
        },
    },
}    
</script>