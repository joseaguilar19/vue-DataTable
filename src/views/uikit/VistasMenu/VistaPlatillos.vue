<template>
    <div>
        <h3>Administracion de Platillos</h3>

        <Toolbar class="mb-4">
            <template v-slot:start>
                <div class="my-2">
                    <Button label="Añadir nuevo platillo" icon="pi pi-plus" class="p-button-success mr-2"
                        @click="ingresarPlatillo" />
                </div>
            </template>
            <template v-slot:end>
                <div class="my-2">
                    <Button label="Actualizar pagina" icon="pi pi-refresh" class="p-button-info mr-2" @click="refresh" />
                </div>
            </template>
        </Toolbar>

        <DataTable :value="CRUD_PLATILLOS.tablaPlatillos" v-model:selection="platilloItem" class="p-datatable-gridlines"
            dataKey="id_platillo" :rows="5"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Visualizando {last} de {totalRecords} productos"
            style="margin-bottom: 20px" :paginator="true" responsiveLayout="scroll">

            <Column field="id_platillo" header="ID" style="width:10px"></Column>
            <Column field="nombre_platillo" header="Nombre" style="width:140px"></Column>
            <Column field="precio_platillo" header="Precio" style="width:10px">
                <template #body="slotProps">
                    {{ formatoMoneda(slotProps.data.precio_platillo) }}
                </template>
            </Column>
            <Column style="width:20px">
                <template #header>
                    Acciones
                </template>
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" type="button" class="p-button-raised p-button-success mr-2 mb-2"
                        @click="editarProductos(slotProps.data.id_platillo)"></Button>
                    <Button icon="pi pi-trash" type="button" class="p-button-raised p-button-danger mr-2 mb-2"
                        @click="confirmaEliminarProductos(slotProps.data.id_platillo)"></Button>
                    <Button icon="pi pi-book" type="button" class="p-button-raised p-button-info mr-2 mb-2"
                        @click="visualizarIngredientes(slotProps.data.id_platillo)"></Button>
                </template>
            </Column>

        </DataTable>

        <Dialog header="Agregar Producto" v-model:visible="platilloNew" :breakpoints="{ '960px': '75vw' }"
            :style="{ width: '450px' }" :modal="true" class="p-fluid">
            <div class="field">
                <label>Nombre de platillo</label>
                <InputText id="nombre_platillo" v-model="CRUD_PLATILLOS.nuevoPlatillo.nombre_platillo" required="true"
                    autofocus />
                <small class="p-invalid" v-if="submitted && !CRUD_PLATILLOS.nuevoPlatillo.nombre_platillo">Nombre is
                    required.</small>
            </div>
            <div class="field">
                <label>Precio</label>
                <InputText id="precio_platillo" v-model="CRUD_PLATILLOS.nuevoPlatillo.precio_platillo" required="true"
                    autofocus />
                <small class="p-invalid" v-if="submitted && !CRUD_PLATILLOS.nuevoPlatillo.precio_platillo">Precio is
                    required.</small>
            </div>

            <div class="card">
                <Button label="Añadir ingrediente" icon="pi pi-plus" class="p-button-success mr-2"
                    @click="agregarIngrediente" />
                <div class="formgrid grid" v-for="(divInfo, index) in divs" :key="index">
                    <div class="field col">
                        <label>Ingrediente</label>
                        <InputText v-model="CRUD_PLATILLOS.nuevoPlatillo.nombre_ingrediente"></InputText>
                    </div>
                    <div class="field col">
                        <label>Cantidad</label>
                        <InputText v-model="CRUD_PLATILLOS.nuevoPlatillo.cantidad"></InputText>
                    </div>
                    <div class="field col">
                        <label>U. Medida</label>
                        <InputText v-model="CRUD_PLATILLOS.nuevoPlatillo.u_medida"></InputText>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="close" />
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarPlatillo" />
            </template>
        </Dialog>

        <Dialog header="Ingredientes" v-model:visible="platilloDescrip" :breakpoints="{ '960px': '75vw' }"
            :style="{ width: '30vw' }" :modal="true">
            <li v-for="ingre in DET_PLATILLO.tablaDetPlat">{{ ingre.cantidad + ' ' + ingre.u_medida + ' de ' +
                ingre.nombre_ingrediente }}</li>
            <template #footer>
                <Button label="Ok" @click="close" icon="pi pi-check" class="p-button-outlined" />
            </template>
        </Dialog>

        <Dialog header="Editar Producto" v-model:visible="platilloEdit" :breakpoints="{ '960px': '75vw' }"
            :style="{ width: '450px' }" :modal="true" class="p-fluid">
            <div class="field">
                <label>Nombre de platillo</label>
                <InputText id="nombre_platillo" v-model="CRUD_PLATILLOS.editarPlatillo.nombre_platillo" required="true"
                    autofocus :class="{ 'p-invalid': submitted && !CRUD_PLATILLOS.tablaPlatillos.nombre_platillo }" />
            </div>
            <div class="field">
                <label>Precio</label>
                <InputText id="precio_platillo" v-model="CRUD_PLATILLOS.editarPlatillo.precio_platillo"></InputText>
            </div>
            <div class="formgrid grid" v-for="ingre in DET_PLATILLO.tablaDetPlat">
                <div class="field col">
                    <label>Ingrediente</label>
                    <InputText v-model="ingre.nombre_ingrediente" readonly></InputText>
                </div>
                <div class="field col">
                    <label>Cantidad</label>
                    <InputText v-model="ingre.cantidad"></InputText>
                </div>
                <div class="field col">
                    <label>U. Medida</label>
                    <InputText v-model="ingre.u_medida"></InputText>
                </div>
            </div>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="close" />
                <Button label="Guardar" icon="pi pi-check" class="p-button-text"
                    @click="guardarEditar(CRUD_PLATILLOS.editarPlatillo.id_platillo)" />
            </template>
        </Dialog>
        <Dialog header="Confirmacion de eliminacion" v-model:visible="platilloDelete" :style="{ width: '350px' }"
        :modal="true">
            <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>¿Esta seguro que desea eliminar este producto?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="close" class="p-button-text" />
                <Button label="Yes" icon="pi pi-check" @click="confirmDelete" class="p-button-text" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<script>
import axios from 'axios';

    export default{
        data(){
            return{
                divs: [],
                platilloNew: false,
                platilloDescrip: false,
                platilloEdit: false,
                platilloDelete: false,
                valorDelete: null,
                
                CRUD_PLATILLOS: {
                    tablaPlatillos: [{
                    //     'id_platillo': 1,
                    //     'nombre_platillo': 'Hola',
                    //     'precio_platillo': 250
                    // },{
                    //     'id_platillo': 2,
                    //     'nombre_platillo': 'Hola 2',
                    //     'precio_platillo': 250
                    }],
                    platilloItem: {
                        id_platillo: null,
                        nombre_platillo: null,
                        precio_platillo: null
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
                    }
                },

                DET_PLATILLO: {
                    tablaDetPlat: [],
                    detPlatItem: {
                        id_platillo: null,
                        id_ingrediente: null,
                        cantidad: null,
                        u_medida: null
                    }
                },
            }
        },

        mounted(){
            this.consultarPlatillo();
        },

        methods: {
            limpiar(){
                this.CRUD_PLATILLOS.editarPlatillo.id_platillo = null;
                this.CRUD_PLATILLOS.editarPlatillo.nombre_platillo = null;
                this.CRUD_PLATILLOS.editarPlatillo.precio_platillo = null;

                this.CRUD_PLATILLOS.nuevoPlatillo.nombre_platillo = null;
                this.CRUD_PLATILLOS.nuevoPlatillo.precio_platillo = null;
                this.CRUD_PLATILLOS.nuevoPlatillo.nombre_ingrediente = null;
                this.CRUD_PLATILLOS.nuevoPlatillo.cantidad = null;
                this.CRUD_PLATILLOS.nuevoPlatillo.u_medida = null;
            },
            ingresarPlatillo(){
                this.limpiar();
                this.platilloNew = true;
            },
            agregarIngrediente(){
                this.divs.push(this.CRUD_PLATILLOS.nuevoPlatillo);
                console.log('DIVS: ' + this.divs);
            },
            guardarPlatillo(){

                const datos = {
                    nombre_platillo: this.CRUD_PLATILLOS.nuevoPlatillo.nombre_platillo,
                    precio_platillo: this.CRUD_PLATILLOS.nuevoPlatillo.precio_platillo
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
            guardarEditar(value){
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

            consultarPlatillo(){
                const url = 'http://localhost:5432/platillo';
                axios.get(url)
                .then(response => {
                    this.CRUD_PLATILLOS.tablaPlatillos = response.data;
                })
                .catch(error => {
                    console.error('Error al obtener datos desde el servidor:', error);
                });
            },
            
            formatoMoneda(value) {
				if(value)
					return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
				return;
			},

            confirmaEliminarProductos(value){
                this.valorDelete = null;
                this.valorDelete = value;
                this.platilloDelete = true;
            },

            confirmDelete(){
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

            visualizarIngredientes(value){
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

            close(){
                this.platilloNew = false;
                this.platilloDescrip = false;
                this.platilloEdit = false;
                this.platilloDelete = false;
            },

            editarProductos(value){
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

            refresh(){
                this.consultarPlatillo();
                this.consultarIngrediente();
            },
        },
    }    
</script>