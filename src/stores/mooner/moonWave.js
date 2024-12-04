import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { reactive, onMounted} from 'vue';
import { MoonWaveService } from '@/services';
import { usePlayerStore, useLoginStore, useQueueStore } from '@/stores';

export const useMoonStore = defineStore('moonWave', () => {
    const state = useStorage('socket', reactive({
        socket: null,
        channel: "",
        host: false,
        reconnect: false,
    }))

    const queueStore = new useQueueStore();
    const playerStore = new usePlayerStore();
    const loginStore = new useLoginStore()

    const connectMoonWave = async (channel) => {
        try {
            const response = await MoonWaveService.createMoonWave(channel)
            state.value.channel = channel
            state.value.socket = response
            state.value.reconnect = true
            configureWebSocket()
            console.log("Instância de WebSocket:", response instanceof WebSocket);
            console.log(state.value.socket)
        }
        catch (error) {
            console.log('pse ne pae', error)
        }
    }

    const disconnectMoonWave = async () => {
        if (state.value.socket) {
            sendActions('close')
            state.value.socket.close();
            state.value.socket = null;
            state.value.reconnect = false
            console.log('WebSocket desconectado');
        }
    };

    const configureWebSocket = () => {
        if (state.value.socket){
            state.value.socket.onopen = () => {
                state.value.host = loginStore.user.email == state.value.channel
                if (state.value.reconnect){
                    if (!state.value.host) sendActions('link');
                  }
            };

            state.value.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('Mensagem recebida:', data);
                handleMessages(data)
            }
        };
    }

    const handleMessages = (data) => {
        switch (data.action) {
            case 'link':
                if (state.value.host){
                    sendActions('sync')
                }
                break;
            case 'sync':
                if (!state.value.host){
                    queueStore.setCurrentSong(data.song);
                    (data.state) ? playerStore.play() : playerStore.pause()
                    playerStore.state.songPlayer.currentTime = data.timestamp;
                    queueStore.state.queue = data.queue;
                    queueStore.state.history = data.history;
                }
                break;

            case 'time':
                if (!state.value.host){
                    playerStore.state.songPlayer.currentTime = data.timestamp;
                }
                break;

            case 'queue':
                queueStore.state.queue = data.queue;
                break;
            
            case 'song':
                queueStore.setCurrentSong(data.song);
                break;
            
            case 'use':
                playerStore.usePlay()
                break;

            case 'next':
                queueStore.nextSong()
                break;
                    
            case 'previous':
                queueStore.previousSong()
                break;

            case 'close':
                if (!state.value.host){
                alert('O host encerrou a sessão')
                disconnectMoonWave()
                }
                break;
                
        }
    } 

    const sendActions = async (actions) => {
        try {
            const message = {
                action: actions,
                song: queueStore?.currentSong,
                queue: queueStore?.queue,
                history: queueStore?.queue,
                timestamp: playerStore?.state?.songPlayer?.currentTime,
                state: playerStore?.state?.is_playing,
            }
            state.value.socket.send(JSON.stringify(message))
            console.log('Mensagem enviada com sucesso sync:', message)
          } catch (error) {
            console.error('Erro ao enviar a mensagem:', error)
          }
    }
    
    onMounted(() => {
        if (state.value.reconnect) {
            console.log("Reconectando ao WebSocket...");
            connectMoonWave(state.value.channel);
        }
    })

    
    return {
        state,
        connectMoonWave,
        disconnectMoonWave,
        sendActions,
    }
})