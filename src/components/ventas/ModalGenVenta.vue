<script setup>
import { ref, defineExpose, reactive, computed, watch } from 'vue';
import { useVentasStore } from '@/stores/ventas';
import { useUsuariosStore } from '@/stores/usuarios';

const ModalGenVenta = ref(null);

// Emitir eventos
const emit = defineEmits(['allFine']);

const buscador = ref(null);
const userSelected = ref({
    nombre: null,
    apellido: null,
    email: null,
    usuario_id: null
});

// Store y estado reactivo
const ventas = useVentasStore();
const ventasAdded = computed(() => ventas.added);

const usuarios = useUsuariosStore();
const usuariosData = computed(() => usuarios.data);

const usuariosDataBuscador = computed(() => {
    const searchValue = buscador.value?.toLowerCase().trim();
    if (!searchValue) return [];

    return usuariosData.value.filter(item =>
        item.nombre?.toLowerCase().includes(searchValue) ||
        item.apellido?.toLowerCase().includes(searchValue) ||
        item.email?.toLowerCase().includes(searchValue)
    ).slice(0, 5);
})


const dataToSend = reactive({
    venta_id: null,
    usuario_id: null,
    fecha: null,
    total: null,
    cantidad_art: null,
});

// Rellenar el formulario automáticamente si hay un producto seleccionado
watch(ventasAdded, (newProduct) => {
    if (newProduct) {
        const selectedUser = usuariosData.value.find(item => item.usuario_id === newProduct.usuario_id);
        Object.assign(userSelected.value, selectedUser || {});
        dataToSend.venta_id = newProduct.venta_id;
        dataToSend.usuario_id = newProduct.usuario_id;
        dataToSend.fecha = newProduct.fecha;
        dataToSend.total = newProduct.total;
        dataToSend.cantidad_art = newProduct.cantidad_art;
    } else {
        resetForm();
    }
});

// Métodos del modal
const openModal = () => {
    ModalGenVenta.value.showModal();
    requestAnimationFrame(() => {
        window.addEventListener('click', clickOutside);
        window.addEventListener('keydown', handleEsc);
    });
};

const closeModal = () => {
    ModalGenVenta.value?.close();
    window.removeEventListener('click', clickOutside);
    window.removeEventListener('keydown', handleEsc);

    // Limpiar producto seleccionado en el store y formulario
    ventas.setAdded(null);
    resetForm();
};

// Resetea los datos del formulario
const resetForm = () => {
    buscador.value = null;

    Object.assign(userSelected.value, {
        nombre: null,
        apellido: null,
        email: null,
        usuario_id: null
    });

    dataToSend.venta_id = null;
    dataToSend.usuario_id = null;
    dataToSend.fecha = null;
    dataToSend.total = null;
    dataToSend.cantidad_art = null;
};

// Detectar clic fuera del modal
const clickOutside = (e) => {
    if (!ModalGenVenta.value?.open) return;
    const rect = ModalGenVenta.value.getBoundingClientRect();
    const isInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

    if (!isInDialog) closeModal();
};

// Detectar tecla ESC para cerrar el modal
const handleEsc = (e) => {
    if (e.key === "Escape") closeModal();
};

// Enviar datos
const submitData = async () => {
    try {
        const item = { ...dataToSend };
        const ruta = item.venta_id ? 'editItemVnt' : 'addItemVnt';

        const option = item.venta_id ? `ventas/${item.venta_id}` : 'ventas'
        const response = await ventas[ruta]({ option, item });

        if (response.success) {
            emit('allFine');
            closeModal(); // Cerrar el modal automáticamente si todo está bien
        } else {
            throw new Error('Ha ocurrido un error');
        }
    } catch (error) {
        console.error(error.message);
    }
};

// Exponer métodos al padre
defineExpose({
    openModal,
});

</script>

<template>
    <dialog ref="ModalGenVenta">
        <div class="container-modal">
            <div>
                <label for="searcher">Buscador</label>
                <input type="text" v-model="buscador" id="searcher" placeholder="Buscar por nombre, correo o apellido">
                <div class="height-ancor">
                    <div class="button-list" :class="{ 'active': buscador && buscador.length > 0 }">
                        <div>
                            <button v-for="(item, index) in usuariosDataBuscador" :key="index" @click="buscador = null,
                                userSelected = item,
                                dataToSend.usuario_id = item.usuario_id">{{
                                    item.nombre }} {{
                                    item.apellido
                                }}</button>
                        </div>
                    </div>
                </div>
            </div>

            <h4>Usuario seleccionado: {{ userSelected.nombre }} {{ userSelected.apellido }}</h4>
            <div>
                <label for="number">Total</label>
                <input type="number" id="number" v-model="dataToSend.total">
            </div>
            <div>
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" v-model="dataToSend.fecha">
            </div>
            <div>
                <label for="stock">Cantidad</label>
                <input type="number" id="stock" v-model="dataToSend.cantidad_art">
            </div>

            <button @click="submitData">Guardar</button>
        </div>
    </dialog>
</template>
<style scoped lang="scss">
dialog {
    margin: auto;
}

.container-modal {
    min-width: 300px;

    >div {
        display: grid;
    }
}

textarea {
    resize: none;
}

.height-ancor {
    height: 15px;
}

.button-list {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;

    transition: grid-template-rows 0.3s ease;

    div {
        display: grid;
        z-index: 3;
    }
}

.button-list.active {
    grid-template-rows: 1fr;
}
</style>