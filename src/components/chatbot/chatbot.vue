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
                <input type="text" v-model="actualMsg">
                <button type="submit">Enviar mensaje</button>
            </div>
        </div>
        <div class="buttons-contenedor">
            <button type="button" @click="mensajes = []" v-if="state">Limpiar Chat</button>
            <button type="button" @click="state = !state">{{ state ? 'Cerrar' : 'Abrir' }} Chat</button>
        </div>
    </form>
</template>
<style scoped lang="scss">
.chat-bot {
    position: fixed;
    background-color: #181818;

    inset: auto 30px 30px auto;
    max-height: 300px;
    padding: 5px;

    &-view {
        transform: scale(0);
        transition: transform 0.3s ease;
        transform-origin: bottom left;

        border: 1px solid #ddd;
        border-radius: 3px;
        padding: 5px;

        &.active {
            transform: scale(1);
        }
    }
}

.pantalla {
    max-height: 230px;
    overflow: auto;
    display: grid;
    grid-auto-rows: max-content;
    gap: 5px;
}

.message {
    width: fit-content;
    margin-right: auto;

    max-width: 200px;
    padding: 5px;
    background-color: darkcyan;
    border-radius: 10px;

    &.toRight {
        margin-right: 0;
        margin-left: auto;
    }
}

.gen-answer {
    display: flex;
    align-items: center;
    gap: 5px;

    div {
        background-color: #ddd;
        border-radius: 100%;
        animation: flying 800ms ease-in-out var(--Delay, 0s) infinite;

        width: 3px;
        height: 3px;
    }
}

@keyframes flying {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-8px);
    }
}
</style>