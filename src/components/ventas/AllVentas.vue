<script setup>
import { reactive, onMounted, computed, ref } from 'vue';
import { useVentasStore } from '@/stores/ventas';
import ModalGenVenta from './ModalGenVenta.vue';

const headers = reactive(['fecha', 'Cantidad de artículos', 'total']);

const ventas = useVentasStore();
const ventasData = computed(() => ventas.data)

const modalGenFather = ref(null);

let identity = localStorage.getItem('user');
identity = identity ? JSON.parse(identity) : null;

const openModal = () => {
    modalGenFather.value.openModal();
}

const getInfo = async () => {
    await ventas.getAllInfoVnt('ventas');
}

const toAdded = (item) => {
    ventas.setAdded(item)
    openModal();
}

const deleteItem = async (id) => {
    try {
        const response = await ventas.deleteItemVnt({ 'option': 'ventas', id })
        if (!response.success) throw { message: 'Error al eliminar producto' };
        getInfo();

    } catch (error) {
        console.log(message)
    }
}

onMounted(async () => {
    await getInfo();
})

</script>
<template>
    <div class="container-all-sails">
        <ModalGenVenta ref="modalGenFather" @allFine="getInfo" />
        <h2>Todos las ventas:</h2>
        <button @click="openModal">Crear venta</button>
        <div class="table">
            <div class="table-heads">
                <div v-for="(head, index) in headers" :key="index" :class="{ 'centered': index > 0 }">
                    <p>{{ head }}</p>
                </div>
            </div>
            <div class="table-data">
                <div class="table-row" v-for="(item, index) in ventasData" :key="index">
                    <div>
                        <p>{{ item.fecha }}</p>
                    </div>
                    <div class="centered">
                        <p>{{ item.cantidad_art }}</p>
                    </div>
                    <div class="centered">
                        <p>${{ item.total }}</p>
                    </div>
                    <button class="edit" @click="toAdded(item)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
                            <path d="M13.5 6.5l4 4"></path>
                        </svg>
                    </button>
                    <button class="delete" @click="deleteItem(item.venta_id)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                            <path d="M10 8l4 8"></path>
                            <path d="M10 16l4 -8"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.table {
    display: grid;
    gap: 2px;

    &-heads {
        display: grid;
        text-transform: capitalize;

        grid-template-columns: 300px 180px 180px 50px 50px;
        gap: 2px;
    }

    &-data {
        display: grid;
        gap: 2px;
    }

    &-row {
        display: grid;
        grid-template-columns: 300px 180px 180px 50px 50px;
        gap: 2px;

        >div {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }

        button {
            display: grid;
            place-items: center;
        }
    }
}


.centered {
    text-align: center;
}
</style>