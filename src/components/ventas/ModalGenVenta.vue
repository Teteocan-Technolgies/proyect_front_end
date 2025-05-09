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
<!-- UserSearch.vue -->
<template>
  <div class="user-search-container">
    <label for="searcher" class="search-label">Buscador de usuarios</label>
    <input
      type="text"
      v-model="buscador"
      id="searcher"
      placeholder="Buscar por nombre, correo o apellido"
      class="search-input"
    />

    <div class="height-ancor">
      <div class="button-list" :class="{ 'active': buscador && buscador.length > 0 }">
        <div>
          <button
            v-for="(item, index) in resultados"
            :key="index"
            @click="selectUser(item)"
            class="user-button"
          >
            {{ item.nombre }} {{ item.apellido }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.user-search-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}

.search-label {
  font-weight: bold;
  font-size: 0.95rem;
  color: #333;
}

.search-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #007BFF;
  outline: none;
}

.height-ancor {
  height: 0.9375rem;
}

.button-list {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 0.3s ease;
}

.button-list div {
  display: grid;
  gap: 0.5rem;
  padding-top: 0.5rem;
}

.button-list.active {
  grid-template-rows: 1fr;
}

.user-button {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  text-align: left;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-button:hover {
  background-color: #e0e0e0;
}
</style>
