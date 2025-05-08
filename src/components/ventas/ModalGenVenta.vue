<script setup>
import { ref, defineExpose, reactive, computed, watch } from 'vue';
import { useVentasStore } from '@/stores/ventas';

const ModalGenVenta = ref(null);

// Emitir eventos
const emit = defineEmits(['allFine']);

// Store y estado reactivo
const ventas = useVentasStore();
const ventasAdded = computed(() => ventas.added);

let identity = localStorage.getItem('user');
identity = identity ? JSON.parse(identity) : null;


const dataToSend = reactive({
    venta_id: null,
    usuario_id: identity.usuario_id,
    fecha: null,
    total: null,
    cantidad_art: null,
});

// Rellenar el formulario automáticamente si hay un producto seleccionado
watch(ventasAdded, (newProduct) => {
    if (newProduct) {
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
        if (!response.success) {
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
</style>