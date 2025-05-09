<script setup>
import { reactive, onMounted, computed, ref, watch } from 'vue';
import { useProductsStore } from '@/stores/products';
import ModalGen from './ModalGen.vue';

const headers = reactive(['nombre', 'descripcion', 'precio', 'stock']);
const paginadorData = reactive({
    currentPage: 1,
    totalPages: undefined,
    itemsPerPage: 15,
})

const products = useProductsStore();
const productsData = computed(() => {
    const data = products.data;
    if(!data) return
    paginadorData.totalPages = Math.ceil(data.length / paginadorData.itemsPerPage);

    const start = (paginadorData.currentPage - 1) * paginadorData.itemsPerPage;
    const end = start + paginadorData.itemsPerPage;

    return data.slice(start, end);
});

watch(() => paginadorData.currentPage,
(newVal) => {
    if((newVal === null || newVal === undefined || newVal === '') || newVal < 1) {
        paginadorData.currentPage = 1;
    } else if (newVal > paginadorData.totalPages) {
        paginadorData.currentPage = paginadorData.totalPages;
    }
})

const modalGenFather = ref(null);

const paginatorState = (toRight) => {
    paginadorData.currentPage = toRight ?
        Math.min(paginadorData.totalPages, ++paginadorData.currentPage) :
        Math.max(1, --paginadorData.currentPage)
}

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

            <div class="paginator">
                <div class="paginator-controls">
                    <button @click="paginatorState(false)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24"
                            height="24">
                            <path
                                d="M12 2a10 10 0 0 1 .324 19.995l-.324 .005l-.324 -.005a10 10 0 0 1 .324 -19.995zm.707 5.293a1 1 0 0 0 -1.414 0l-4 4a1.048 1.048 0 0 0 -.083 .094l-.064 .092l-.052 .098l-.044 .11l-.03 .112l-.017 .126l-.003 .075l.004 .09l.007 .058l.025 .118l.035 .105l.054 .113l.043 .07l.071 .095l.054 .058l4 4l.094 .083a1 1 0 0 0 1.32 -1.497l-2.292 -2.293h5.585l.117 -.007a1 1 0 0 0 -.117 -1.993h-5.586l2.293 -2.293l.083 -.094a1 1 0 0 0 -.083 -1.32z">
                            </path>
                        </svg>
                    </button>

                    <p>{{ paginadorData.currentPage }} / {{ paginadorData.totalPages }}</p>

                    <button @click="paginatorState(true)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24"
                            height="24">
                            <path
                                d="M12 2l.324 .005a10 10 0 1 1 -.648 0l.324 -.005zm.613 5.21a1 1 0 0 0 -1.32 1.497l2.291 2.293h-5.584l-.117 .007a1 1 0 0 0 .117 1.993h5.584l-2.291 2.293l-.083 .094a1 1 0 0 0 1.497 1.32l4 -4l.073 -.082l.064 -.089l.062 -.113l.044 -.11l.03 -.112l.017 -.126l.003 -.075l-.007 -.118l-.029 -.148l-.035 -.105l-.054 -.113l-.071 -.111a1.008 1.008 0 0 0 -.097 -.112l-4 -4z">
                            </path>
                        </svg>
                    </button>
                </div>

                <input type="number" :min="1" :max="paginadorData.totalPages" v-model="paginadorData.currentPage">
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.table {
    display: grid;
    width: fit-content;
    gap: .25rem;

    &-heads {
        display: grid;
        text-transform: capitalize;
        font-weight: bold;
        background-color: #f3f4f6;
        padding: 0.5rem 0;
        border-radius: 0.5rem;
        grid-template-columns: 18.75rem 37.5rem 6.25rem 6.25rem 3.125rem 3.125rem;
        gap: .25rem;

        p {
            margin: 0;
            padding: 0.25rem 0.5rem;
        }
    }

    &-data {
        display: grid;
        gap: .25rem;
    }

    &-row {
        display: grid;
        align-items: center;
        background-color: #ffffff;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
        border-radius: 0.5rem;
        padding: 0.5rem 0;
        grid-template-columns: 18.75rem 37.5rem 6.25rem 6.25rem 3.125rem 3.125rem;
        gap: .25rem;

        >div {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            padding: 0 0.5rem;
            font-size: 0.95rem;
        }

        button {
            display: grid;
            place-items: center;
            background-color: #e5e7eb;
            border: none;
            border-radius: 0.5rem;
            padding: 0.25rem;
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #d1d5db;
            }

            svg {
                stroke: #374151;
            }
        }

        .edit {
            background-color: #c7d2fe;

            &:hover {
                background-color: #a5b4fc;
            }
        }

        .delete {
            background-color: #fecaca;

            &:hover {
                background-color: #fca5a5;
            }
        }
    }
}

.paginator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;

    &-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        button {
            background-color: #f3f4f6;
            border: none;
            border-radius: 0.5rem;
            padding: 0.25rem;
            display: grid;
            place-items: center;
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #e5e7eb;
            }
        }
    }

    input {
        width: 6.375rem;
        padding: 0.25rem;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
    }
}

.centered {
    text-align: center;
}

</style>