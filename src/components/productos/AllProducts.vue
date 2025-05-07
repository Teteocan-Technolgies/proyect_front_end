<script setup>
import { reactive, onMounted, computed, ref } from 'vue';
import { useProductsStore } from '@/stores/products';
import ModalGen from './ModalGen.vue';

const headers = reactive(['nombre', 'descripcion', 'precio', 'stock']);

const products = useProductsStore();
const productsData = computed(() => products.data)

const modalGenFather = ref(null);

const openModal = () => {
    modalGenFather.value.openModal();
}

const getInfo = async () => {
    await products.getAllInfoPrd('productos');
}

const toAdded = (item) => {
    products.setAdded(item)
    openModal();
}

const deleteItem = async (id) => {
    try {
        const response = await products.deleteItemPrd({ 'option': 'productos', id })
        if (response.message !== 'Producto dado de baja') throw { message: 'Error al eliminar producto' };
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
    <div class="container-all-products">
        <ModalGen ref="modalGenFather" @allFine="getInfo" />
        <h2>Todos los productos:</h2>
        <button @click="openModal">Crear producto</button>
        <div class="table">
            <div class="table-heads">
                <div v-for="(head, index) in headers" :key="index" :class="{ 'centered': index > 1 }">
                    <p>{{ head }}</p>
                </div>
            </div>
            <div class="table-data">
                <div class="table-row" v-for="(item, index) in productsData" :key="index">
                    <div>
                        <p>{{ item.nombre }}</p>
                    </div>
                    <div>
                        <p>{{ item.descripcion }}</p>
                    </div>
                    <div class="centered">
                        <p>${{ item.precio }}</p>
                    </div>
                    <div class="centered">
                        <p>{{ item.stock }}</p>
                    </div>
                    <button class="edit" @click="toAdded(item)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
                            <path d="M13.5 6.5l4 4"></path>
                        </svg>
                    </button>
                    <button class="delete" @click="deleteItem(item.producto_id)">
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

        grid-template-columns: 300px 600px 100px 100px 50px 50px;
        gap: 2px;
    }

    &-data {
        display: grid;
        gap: 2px;
    }

    &-row {
        display: grid;
        grid-template-columns: 300px 600px 100px 100px 50px 50px;
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