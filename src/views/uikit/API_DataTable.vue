<script>
import axios from 'axios';

    export default{
        data(){
            return{
                item: {
                    id: null,
                    nombre: null,
                    salario: null,
                    edad: null
                },
                users: [],
                empleados: {
                    id: null,
                    datos: []
                }
                // users: [{
                //     "id": 1, "nomEmpleado": "Tiger Nixon", "salario": 320800, "edad": 61
                // },
                // {
                //     "id": 2, "nomEmpleado": "Garrett Winters", "salario": 170750, "edad": 63
                // },
                // {
                //     "id": 3, "nomEmpleado": "Ashton Cox", "salario": 86000, "edad": 66
                // },
                // {
                //     "id": 4, "nomEmpleado": "Cedric Kelly", "salario": 433060, "edad": 22
                // },
                // {
                //     "id": 5, "nomEmpleado": "Airi Satou", "salario": 162700, "edad": 33
                // },
                // {
                //     "id": 1, "nomEmpleado": "Tiger Nixon", "salario": 320800, "edad": 61
                // },
                // {
                //     "id": 2, "nomEmpleado": "Garrett Winters", "salario": 170750, "edad": 63
                // },
                // {
                //     "id": 3, "nomEmpleado": "Ashton Cox", "salario": 86000, "edad": 66
                // },
                // {
                //     "id": 4, "nomEmpleado": "Cedric Kelly", "salario": 433060, "edad": 22
                // },
                // {
                //     "id": 5, "nomEmpleado": "Airi Satou", "salario": 162700, "edad": 33
                // },
                // {
                //     "id": 1, "nomEmpleado": "Tiger Nixon", "salario": 320800, "edad": 61
                // },
                // {
                //     "id": 2, "nomEmpleado": "Garrett Winters", "salario": 170750, "edad": 63
                // },
                // {
                //     "id": 3, "nomEmpleado": "Ashton Cox", "salario": 86000, "edad": 66
                // },
                // {
                //     "id": 4, "nomEmpleado": "Cedric Kelly", "salario": 433060, "edad": 22
                // },
                // {
                //     "id": 5, "nomEmpleado": "Airi Satou", "salario": 162700, "edad": 33
                // },
                // {
                //     "id": 1, "nomEmpleado": "Tiger Nixon", "salario": 320800, "edad": 61
                // },
                // {
                //     "id": 2, "nomEmpleado": "Garrett Winters", "salario": 170750, "edad": 63
                // },
                // {
                //     "id": 3, "nomEmpleado": "Ashton Cox", "salario": 86000, "edad": 66
                // },
                // {
                //     "id": 4, "nomEmpleado": "Cedric Kelly", "salario": 433060, "edad": 22
                // },
                // {
                //     "id": 5, "nomEmpleado": "Airi Satou", "salario": 162700, "edad": 33
                // },
                // {
                //     "id": 1, "nomEmpleado": "Tiger Nixon", "salario": 320800, "edad": 61
                // },
                // {
                //     "id": 2, "nomEmpleado": "Garrett Winters", "salario": 170750, "edad": 63
                // },
                // {
                //     "id": 3, "nomEmpleado": "Ashton Cox", "salario": 86000, "edad": 66
                // },
                // {
                //     "id": 4, "nomEmpleado": "Cedric Kelly", "salario": 433060, "edad": 22
                // }
                // ],
                // empleado: {
                //     id: null,
                //     nombre: null,
                //     salario: null,
                //     edad: null,
                // }
            }
        },
        mounted(){
            this.consultarApi();
        },
        // created(){
        //     axios.get('https://dummy.restapiexample.com/api/v1/employees').then
        //     (response => this.users = response.data);
        // },
        // mounted(){
        //     this.fetchUsers();
        // },
        // methods: {
        //     fetchUsers() {
        //         axios.get("https://dummy.restapiexample.com/api/v1/employees")
        //             .then((response) => {
        //             this.users = response.data;
        //             })
        //             .catch((error) => {
        //             console.error("Error al obtener usuarios:", error);
        //             });
        //     }
        // }
        methods: {
            consultarApi(){
                axios.get('https://dummy.restapiexample.com/api/v1/employees').then(response => {
                    response.data.data.forEach(col => {
                        // this.item.id = col.id;
                        // this.item.nombre = col.employee_name;
                        // this.item.salario = col.employee_salary;
                        // this.item.edad = col.employee_age;

                        this.users.push(col)
                    });
                    // this.item.id = response.data.data.id;
                    // this.item.nombre = response.data.data.employee_name;
                    // this.item.salario = response.data.data.employee_salary;
                    // this.item.edad = response.data.data.employee_age;
                })
            },
            busquedaEmp(){

                if(this.empleados.id !== null){
                    axios.get('https://dummy.restapiexample.com/api/v1/employee/' + this.empleados.id).then(response => {
                        this.empleados.datos.push(response.data.data);
                    });
                }
            },
            formatoMoneda(value) {
				if(value)
					return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
				return;
			}
        }
    }
</script>

<template>
    <div class="grid">
        <div class="col-12">
            
            <div class="card p-fluid md:col-7">
                <h5>Consumir API REST Empleado</h5>
                <div class="field">
                    <label for="nombre">Nombre</label>
                    <InputText id="nombre" type="text" v-model="empleados.datos.employee_name" readonly />
                </div>
                <div class="field">
                    <label for="salario">Salario</label>
                    <InputText id="salario" type="text" v-model="empleados.datos.employee_salary" readonly />
                </div>
                <div class="field">
                    <label for="edad">Edad</label>
                    <InputText id="edad" type="text" v-model="empleados.datos.employe_age" readonly />
                </div>
                <div class="field">
                    <label for="idEmp">ID Emp.</label>
                    <InputText id="idEmp" type="text" v-model="empleados.id" />
                </div>

                <Button label="Consultar Datos" class="p-button-raised p-button-success mr-2 mb-2" @click="busquedaEmp"/>
            </div>

            <div class="card">
                <h5>Lista de empleados</h5>
                
                <DataTable :value="users" class="p-datatable-gridlines" dataKey="id"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
				:rowsPerPageOptions="[5,10,25]"
				currentPageReportTemplate="Visualizando {last} de {totalRecords} productos"
				style="margin-bottom: 20px" :paginator="true" responsiveLayout="scroll">
                    <Column field="employee_name" header="Nombre del Empleado" style="width:50px"></Column>
                    <Column field="employee_salary" header="Salario" style="width:50px">
                        <template #body="slotProps">
                            {{ formatoMoneda(slotProps.data.employee_salary) }}
                        </template>
                    </Column>
                    <Column field="employee_age" header="Edad" style="width:50px"></Column>
                </DataTable>
            </div>

            <!-- <div class="card">
                <ul>
                    <li v-for="user in users" :key="user.id">
                        <h3>{{ user.id }}</h3>
                    </li>
                </ul>
            </div> -->
        </div>
    </div>
</template>