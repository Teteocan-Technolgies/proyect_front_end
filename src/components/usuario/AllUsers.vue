<script setup>
import { reactive, onMounted, computed, ref, watch } from 'vue';
import { useUsuariosStore } from '@/stores/usuarios';

const headers = reactive(['Nombre', 'Apellido', 'Correo']);

const paginadorData = reactive({
    currentPage: 1,
    totalPages: undefined,
    itemsPerPage: 15,
})

const usuarios = useUsuariosStore();
const usuariosData = computed(() => {
    const data = usuarios.data;
    if(!data) return
    paginadorData.totalPages = Math.ceil(data.length / paginadorData.itemsPerPage);

    const start = (paginadorData.currentPage - 1) * paginadorData.itemsPerPage;
    const end = start + paginadorData.itemsPerPage;

    return data.slice(start, end);
})

watch(() => paginadorData.currentPage,
(newVal) => {
    if((newVal === null || newVal === undefined || newVal === '') || newVal < 1) {
        paginadorData.currentPage = 1;
    } else if (newVal > paginadorData.totalPages) {
        paginadorData.currentPage = paginadorData.totalPages;
    }
})

const paginatorState = (toRight) => {
    paginadorData.currentPage = toRight ?
        Math.min(paginadorData.totalPages, ++paginadorData.currentPage) :
        Math.max(1, --paginadorData.currentPage)
}

let identity = localStorage.getItem('user');
identity = identity ? JSON.parse(identity) : null;

const getInfo = async () => {
    await usuarios.getAllInfoUsr('usuarios');
}

onMounted(async () => {
    await getInfo();
})

</script>
<template>
    <div class="container-all-sails">
        <h2>Todos los usuarios:</h2>
        <div class="table">
            <div class="table-heads">
                <div v-for="(head, index) in headers" :key="index">
                    <p>{{ head }}</p>
                </div>
            </div>
            <div class="table-data">
                <div class="table-row" v-for="(item, index) in usuariosData" :key="index">
                    <div>
                        <p>{{ item.nombre }}</p>
                    </div>
                    <div>
                        <p>{{ item.apellido }}</p>
                    </div>
                    <div>
                        <p>{{ item.email }}</p>
                    </div>
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
.container-all-sails {
  padding: 1rem 2rem;
  background-color: #181818;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  h2 {
    color: #fff;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .table {
    display: grid;
    width: 100%;
    gap: 0.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: #222;
    
    &-heads {
      display: grid;
      grid-template-columns: 12.5rem 18.75rem 18.75rem;
      gap: 0.5rem;
      padding: 0.75rem;
      background-color: #333;
      color: #ddd;
      text-transform: capitalize;

      div {
        font-weight: bold;
      }
    }

    &-data {
      display: grid;
      gap: 0.5rem;
      padding: 0.75rem;
    }

    &-row {
      display: grid;
      grid-template-columns: 12.5rem 18.75rem 18.75rem;
      gap: 0.5rem;
      padding: 0.75rem;
      background-color: #444;
      border-radius: 0.375rem;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #555;
      }

      div {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
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
      gap: 0.5rem;

      button {
        background-color: transparent;
        border: none;
        color: #ddd;
        padding: 0.5rem;
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
          color: #fff;
        }
      }

      svg {
        width: 1.5rem;
        height: 1.5rem;
        color: #ddd;
        transition: color 0.3s ease;

        &:hover {
          color: #fff;
        }
      }
    }

    input {
      width: 6.375rem;
      padding: 0.5rem;
      background-color: #333;
      color: #ddd;
      border: none;
      border-radius: 0.375rem;
    }
  }
}
</style>