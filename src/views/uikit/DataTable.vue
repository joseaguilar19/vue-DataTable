<!-- https://primefaces.org/primevue/datatable/crud -->

<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
			<Panel header="PUNTO DE VENTA (POS)" style="height: 100%">
				<Toolbar class="p-mb-4">
				<template v-slot:start>
					<InputText type="text" size="40" placeholder="Nombre del producto..." v-model="productoItem.nomProducto"/>
					<InputText type="text" placeholder="Cant" v-model="productoItem.cantidad"/>
					<InputText type="text" placeholder="$ Precio U." v-model="productoItem.precioUnitario"/>										
				</template>
				<template v-slot:end>
					<Button label="Registrar" icon="pi pi-plus" class="p-button-success p-mr-2" @click="registrarCompra" />	
				</template>
				</Toolbar>
				<br>

			<DataTable :value="tablaCompras" v-model:selection="productoItem" class="p-datatable-gridlines" dataKey="cns" :rows="5" 
				paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
				:rowsPerPageOptions="[5,10,25]"
				currentPageReportTemplate="Visualizando {last} de {totalRecords} productos"
				style="margin-bottom: 20px" :paginator="true" responsiveLayout="scroll">				
			
				<Column field="cns" header="Cns" :sortable="true" style="width:50px"></Column>
				<Column field="nomProducto" header="Nombre del Producto" style="width:370px"></Column>				
				<Column field="precioUnitario" header="Precio U." style="width:80px">
					<template #body="slotProps">
                            {{ formatoMoneda(slotProps.data.precioUnitario) }}
                    </template>
				</Column>
				<Column field="cantidad" header="Cant." style="width:60px;text-align:center"></Column>
				<Column field="precioParcial" header="Precio P." style="width:80px">
					<template #body="slotProps">
                            			{{ formatoMoneda(slotProps.data.precioParcial) }}
                    			</template></Column>
				<Column style="width:140px">
					<template #header>
						Acciones
					</template>
					<template #body="slotProps">
                        <Button icon="pi pi-pencil" type="button" class="p-button-success p-mr-2 p-mb-1" @click="editarProductos(slotProps.data.cns)"></Button>
                        <Button icon="pi pi-trash" type="button" class="p-button-danger p-mb-1" @click="confirmaEliminarProductos(slotProps.data.cns)"></Button>
					</template>
				</Column>
			</DataTable>

			<Toolbar class="p-mb-4" v-if="modal">
				<template v-slot:start>
				<div>
					<label for="nombre">Nombre del producto: </label>
					<InputText type="text" v-model="productoEditar.nombre"/>
				</div>
				<div>
					<label for="cant">Cant: </label>
					<InputText type="text" v-model="productoEditar.cant"/>
				</div>
				<div>
					<label for="precioUni">$ Precio U.: </label>
					<InputText type="text" v-model="productoEditar.precioUni"/>
				</div>
				<Button icon="pi pi-save" type="button" class="p-button-success" @click="guardarEditar"></Button>
				<Button icon="pi pi-times-circle" type="button" class="p-button-danger" @click="cancelarEditar"></Button>
				</template>
			</Toolbar>

			<br>
				<Toolbar class="p-mb-4">
				<template v-slot:start>
                    <label for="subtotal">Subtotal: </label>
                    <InputText type="text" placeholder="$ " v-model="totalCompra.subtotal" readonly/>
				</template>
				<template v-slot:center>
                    <label for="iva">IVA (16%): </label>
                    <InputText type="text" placeholder="$ " v-model="totalCompra.iva" readonly/>
				</template>
				<template v-slot:end>
					<label for="total">Total: </label>
					<InputText type="text" placeholder="$ " v-model="totalCompra.total" readonly/>	
				</template>
				</Toolbar>
			</Panel>

			<Toast/>
			</div>	
		</div>
	</div>
</template>

<script>
export default {
    data() {
        return {                			
			tablaCompras: [
			{"cns": 1, "nomProducto": "Impresora LaserJet Color", "cantidad": 2, "precioUnitario": 5200.00, "precioParcial": 10400.00},
			{"cns": 2, "nomProducto": "Monitor LED 31 plg.", "cantidad": 3, "precioUnitario": 1700.00, "precioParcial": 5100.00}
			],
			productoItem: {
				cns: null,
				nomProducto: null,
				cantidad:null,
				precioUnitario:null,
				precioParcial:null
			},
			totalCompra: {
				subtotal: null,
				iva: null,
				total: null
			},
			productoEditar: {
				filaEdit: null,
				nombre: null,
				cant: null,
				precioUni: null
			},
			modal: false,
		}
		},
		created() {
			this.calcularTotal();
		},		
		methods: {
			formatoMoneda(value) {
				if(value)
					return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
				return;
			},	
			registrarCompra(){								
                this.productoItem.precioParcial = this.productoItem.cantidad * this.productoItem.precioUnitario;
				this.productoItem.cns = this.tablaCompras.length + 1;

				this.tablaCompras.push(this.productoItem);
				this.$toast.add({severity:'success', summary: 'Confirmación', detail: 'Nueva compra registrada', life: 3000});

				this.calcularTotal();
			},		
			editarProductos(cns) {				
							
				this.modal = true;
				this.productoEditar.nombre = this.tablaCompras[cns].nomProducto;
				this.productoEditar.cant = this.tablaCompras[cns].cantidad;
				this.productoEditar.precioUni = this.tablaCompras[cns].precioUnitario;
				this.productoEditar.filaEdit = cns;
			},
			guardarEditar(){
				const cns = this.productoEditar.filaEdit;
				const cant = this.productoEditar.cant;
				const precioU = this.productoEditar.precioUni;
				this.tablaCompras[cns].nomProducto = this.productoEditar.nombre;
				this.tablaCompras[cns].cantidad = cant;
				this.tablaCompras[cns].precioUnitario = this.formatoMoneda(precioUni);
				this.tablaCompras[cns].precioParcial = this.formatoMoneda(cant * precioU);
				this.$toast.add({severity:'success', summary: 'Confirmación', detail: 'Compra editada', life: 3000});
				this.modal = false;
			},
			cancelarEditar(){
				this.modal = false;
			},
			confirmaEliminarProductos(cns) {
						
				if(confirm("¿Eliminar este producto?")){
					const id = this.tablaCompras.findIndex((columna) => columna.cns === cns);

					if(id !== -1){
						this.tablaCompras.splice(id, 1);
						this.calcularTotal();
					}
				}
			},
			calcularTotal(){
				const subtotal = this.tablaCompras.reduce((total, columna) => total + columna.precioParcial, 0);
				this.totalCompra.subtotal = this.formatoMoneda(subtotal);
				const iva = subtotal * 0.16;
				this.totalCompra.iva = this.formatoMoneda(iva);
				this.totalCompra.total = this.formatoMoneda(iva + subtotal);
			}

        }    
}
</script>