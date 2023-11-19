<template>
    <div>
        <h3>Administracion de Ingredientes</h3>
        <Toolbar class="mb-4">
            <template v-slot:start>
                <div class="my-2">
                    <Button label="Añadir nuevo ingrediente" icon="pi pi-plus" class="p-button-success mr-2"
                        @click="ingresarIngrediente" />
                </div>
            </template>
            <template v-slot:end>
                <div class="my-2">
                    <Button label="Actualizar pagina" icon="pi pi-refresh" class="p-button-info mr-2" @click="refresh" />
                </div>
            </template>
        </Toolbar>

        <DataTable :value="CRUD_INGREDIENTES.tablaIngredientes" v-model:selection="ingredienteItem"
            class="p-datatable-gridlines" dataKey="id_ingrediente" :rows="5"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Visualizando {last} de {totalRecords} productos"
            style="margin-bottom: 20px" :paginator="true" responsiveLayout="scroll">
            <Column field="id_ingrediente" header="ID" style="width:10px"></Column>
            <Column field="nombre_ingrediente" header="Nombre" style="width:140px"></Column>
            <Column field="existencia" header="Existencia" style="width:140px"></Column>
            <Column field="u_medida" header="U. Medida" style="width:140px"></Column>
            <Column field="costo_x_unidad" header="Costo por unidad" style="width:10px">
                <template #body="slotProps">
                    {{ formatoMoneda(slotProps.data.costo_x_unidad) }}
                </template>
            </Column>
            <Column field="costo_total" header="Costo total" style="width:10px">
                <template #body="slotProps">
                    {{ formatoMoneda(slotProps.data.costo_total) }}
                </template>
            </Column>
            <Column style="width:20px">
                <template #header>
                    Acciones
                </template>
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" type="button" class="p-button-raised p-button-success mr-2 mb-2"
                        @click="(slotProps.data.id_ingrediente)"></Button>
                    <Button icon="pi pi-trash" type="button" class="p-button-raised p-button-danger mr-2 mb-2"
                        @click="confirmaEliminarProductos(slotProps.data.id_ingrediente)"></Button>
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

            CRUD_INGREDIENTES: {
                tablaIngredientes: [{}],
                
                ingredienteItem: {
                    id: null,
                    nomPlatillo: null
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

        refresh() {
            this.consultarIngrediente();
        },
    },
}    
</script>