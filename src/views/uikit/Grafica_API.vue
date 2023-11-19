<template>
    <div class="grid p-fluid">
        <div class="col-12">
            <div class="card card-w-title">
                <h5>API de datos historicos del mercado de valores de Lyon, Francia</h5>
                <Chart type="line" :data="lineData" :options="lineOptions"></Chart>
            </div>

            <div class="card card-w-tittle">
                <h5>Tabla</h5>
                <DataTable :value="tabla" v-model:selection="productoItem" class="p-datatable-gridlines" dataKey="date" :rows="5" 
				paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
				:rowsPerPageOptions="[5,10,25]"
				currentPageReportTemplate="Visualizando {last} de {totalRecords} productos"
				style="margin-bottom: 20px" :paginator="true" responsiveLayout="scroll">
                    <Column field="date" header="Fecha" :sortable="true" style="width:50px"></Column>
                    <Column field="close" header="Cantidad" :sortable="true" style="width:50px"></Column>
                </datatable> 
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    data(){
        return{
            datos: [],

            lineData: {
                labels: [],
                datasets: [
                {
                    label: 'Ventas por dia',
                    backgroundColor: '#41B883',  // Color de las barras
                    data: [],  // Datos de la gráfica
                },
                ],
            },

            tabla: [],
            // lineOptions: {
            //     responsive: true,
            //     maintainAspectRatio: false,
            // }
        }
    },

    methods: {
        consultarApi(){
            const url = 'https://eodhistoricaldata.com/api/eod/' +
            'MCD.US?from=2017-01-05&to=2017-02-05&period=d&fmt=' +
            'json&api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX';
            axios.get(url).then(response =>{
                this.datos = response.data;

                for (let i = 0; i < this.datos.length; i++) {
                    this.lineData.labels[i] = this.datos[i].date;
                    this.lineData.datasets[0].data[i] = this.datos[i].close;

                    // this.tabla[i][0] = this.datos[i].date;
                    // this.tabla[i][1] = this.lineData.datasets[0].data[i];
                    
                }
                
                this.tabla = this.datos;

                console.log(this.tabla);

                //console.log(this.datos[0].date);
                console.log(this.lineData.datasets[0].data);
            }).catch(error => {
                console.log(error);
            });
        }
    },
    
    mounted() {
        this.consultarApi();
    }
}
</script>