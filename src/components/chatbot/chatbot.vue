<script setup>
import { ref } from 'vue';
import { useChatbotStore } from '@/stores/chatBot';

const chatbot = useChatbotStore();

const state = ref(false)
const actualMsg = ref('')
const mensajes = ref([])
const inputEnable = ref(true);


const submitData = async () => {
  if (!inputEnable.value) return;
  if (!actualMsg.value) return;

  inputEnable.value = false;
  mensajes.value.push({ 'usuario': true, 'content': actualMsg.value });

  const item = { 'consulta': actualMsg.value };
  actualMsg.value = '';
  const response = await chatbot.addItemBot({ 'option': 'chatbot', item });
  mensajes.value.push({ 'usuario': false, 'content': response.data });

  inputEnable.value = true;
}
</script>
<template>
  <form class="chat-bot" @submit.prevent="submitData">
    <div class="chat-bot-container">
      <div class="chat-bot-view" :class="{ 'active': state }">
        <div class="pantalla">
          <div class="message" v-for="mensaje in mensajes" :class="{ 'toRight': mensaje.usuario }">
            <p>{{ mensaje.content }}</p>
          </div>

          <div v-if="!inputEnable" class="gen-answer">
            <p>Generando respuesta</p>
            <div :style="{ '--Delay': '100ms' }"></div>
            <div :style="{ '--Delay': '200ms' }"></div>
            <div :style="{ '--Delay': '300ms' }"></div>
          </div>
        </div>
        <div class="mensaje">
          <textarea v-model="actualMsg"></textarea>
          <button type="submit">Enviar mensaje</button>
        </div>
      </div>
      <div class="buttons-contenedor">
        <button type="button" @click="mensajes = []" v-if="state">Limpiar Chat</button>
        <button type="button" @click="state = !state">{{ state ? 'Cerrar' : 'Abrir' }} Chat</button>
      </div>
    </div>
  </form>
</template>
<style scoped lang="scss">
.chat-bot {
  position: fixed;
  background-color: #2c2c2c;
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  inset: 0;
  padding: 0.5rem;
  overflow: hidden;

  height: fit-content;
  max-height: 130px;
  max-width: 100px;
  margin: auto 2rem 2rem auto;

  transition-property: max-height, max-width;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:has(.active) {
    max-height: 22rem;
    max-width: 25rem;
  }

  .chat-bot-view {
    transform: scale(0);
    // transition: transform 0.3s ease;
    transform-origin: bottom left;
    background-color: #1f1f1f;
    max-height: 0;

    &.active {
      border-radius: 0.75rem;
      border: 1px solid #444;
      padding: 0.5rem;
      max-height: 500px;
      transform: scale(1);
    }
  }
}

.pantalla {
  display: grid;
  overflow: hidden;
  grid-auto-rows: max-content;
  max-height: 0rem;
  gap: 0.5rem;
  padding: 0.25rem;
  scroll-behavior: smooth;
  font-size: 0.875rem;
  color: #fff;
}

.active .pantalla {
  overflow-y: auto;
  max-height: 14rem;
}

.message {
  width: fit-content;
  margin-right: auto;
  max-width: 12.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #008b8b;
  border-radius: 1rem 1rem 1rem 0.25rem;
  color: #fff;
  line-height: 1.4;

  &.toRight {
    margin-left: auto;
    margin-right: 0;
    background-color: #4caf50;
    border-radius: 1rem 1rem 0.25rem 1rem;
  }
}

// .mensaje {
//   display: flex;
//   gap: 0.5rem;
//   margin-top: 0.75rem;

//   input {
//     flex: 1;
//     padding: 0.5rem;
//     border-radius: 0.5rem;
//     border: none;
//     background-color: #2e2e2e;
//     color: #fff;
//   }

textarea {
  resize: none;
  padding: 5px 2px;
  max-height: 60px;
}

.mensaje {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #2196f3;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #1976d2;
  }
}

.buttons-contenedor {
  display: flex;
  gap: 0.5rem;

  button {
    background-color: #555;
    color: white;
    padding: 0.4rem 0.75rem;
    border: none;
    border-radius: 0.5rem;

    &:hover {
      background-color: #777;
    }
  }
}

.active+.buttons-contenedor {
  margin-top: 0.75rem;
}

.gen-answer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  font-style: italic;

  div {
    background-color: #aaa;
    border-radius: 50%;
    animation: flying 800ms ease-in-out var(--Delay, 0s) infinite;
    width: 0.375rem;
    height: 0.375rem;
  }
}

@keyframes flying {

  0%,
  100% {
    transform: translateY(0rem);
  }

  50% {
    transform: translateY(-0.4rem);
  }
}
</style>