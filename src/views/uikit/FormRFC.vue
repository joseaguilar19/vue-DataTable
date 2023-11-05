<script setup>
    import { ref } from 'vue';

    const floatValue = ref(null);
</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-12">
            <div class="card p-fluid">
                <h5>GENERAR EL RFC DE UNA PERSONA</h5>
                
                <div class="field">
                    <label for="nombre">Nombre(s)</label>
                    <InputText id="nombre" type="text" />
                </div>

                <div class="field">
                    <label for="ap_pat">Apellido Paterno</label>
                    <InputText id="ap_pat" type="text" />
                </div>

                <div class="field">
                    <label for="ap_mat">Apellido Materno</label>
                    <InputText id="ap_mat" type="text" />
                </div>

                <div class="field">
                    <label for="nacimiento">Fecha de Nacimiento</label>
                    <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue" placeholder="dd/mm/aaaa"></Calendar>
                </div>

                <div class="field">
                    <label for="rfc">RFC</label>
                    <InputText id="rfc" type="text" disabled="true" />
                </div>

                <div class="col-12 md:col-6">
                    <Button label="GENERAR" class="p-button-raised p-button-success mr-2 mb-2" />
                </div>
            </div>
        </div>
    </div>
</template>