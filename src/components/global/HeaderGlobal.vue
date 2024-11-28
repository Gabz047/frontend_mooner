<script setup>
import { ref } from 'vue';
import { useLoginStore } from '@/stores/user/login';
import UserOptions from '../user/artist/UserOptions.vue';
const loginStore = useLoginStore()

defineProps({
    is_blink_layout: {
        type: Boolean,
        required: true
    },
    isResponsive: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits([
    'menu'
])
</script>
<template>
    <div class="flex justify-end lg:justify-normal xl:justify-between w-[97.5%] mx-auto relative mb-3 xl:mb-0 right-0 min-h-10 xl:min-h-16 xl:items-center text-white items-end z-50 xl:w-[100%]">
        <span class="mdi mdi-menu text-3xl ml-3" @click="emits('menu')"></span>
        <RouterLink to="/" class="ml-8 lg:ml-2 hidden mt-2 lg:mt-0 xl:flex">
            <div class="h-full">
                <img class="w-full h-10" src="@/assets/images/Logo.png" >
            </div>
        </RouterLink>
        <div class="user-config">
            <div class="flex items-center gap-2 px-2 pt-1">
                <img class="w-7 rounded-full" src="https://th.bing.com/th/id/R.47d1cc4b137f211cb1c3dfa2135bacba?rik=WfNjlHz94xdl5g&pid=ImgRaw&r=0">
                <p :class="loginStore.user.premium ? 'btn-dourado' : 'text-white'" class="sm:hidden" >{{loginStore.user.email}}</p>
            </div>
            <div  id="options">
                <UserOptions class="userOptions" :is_artist="loginStore.user.is_artist" :logout="loginStore.Logout"/>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .user-config{
        position: absolute;
        right: 0;
        margin-right: 20px;
        padding: 0px;
        transition: 0.4s;
        border-radius: 10px 10px 0px 0px ;
    }
    #options{
        transition: 0.4s;
       
        width: 100%;
        position: absolute;
        height: 30px;
        visibility: hidden;
        padding: 4px;
    }
    .userOptions {
    opacity: 0;
    font-size: 18px;
    transition: 0.2s;
    }

    /* .userOptions {
        opacity: 0;
        transition: 1s;
    } */

    .user-config:hover{
        background-color: blueviolet;
    
    }
    .user-config:hover #options{

        height: 150px;
        margin-bottom: 20px;
        visibility: visible;
        background-color: blueviolet;
        gap: 5px;
       
        border-radius: 0px 0px 10px 10px;
        right: 0.005px;
        font-size: 17px;

        & .userOptions {
            opacity: 1;
        }
    }

    /* .user-config:hover .userOptions {
        opacity: 1;
    } */

    .btn-dourado {
        width: auto;
        height: auto;
        margin: auto;
        border: none;
        border-radius: 40px;
        background: linear-gradient(to right,#bf953f,#fcf6ba,#b38728,#fbf5b7,#aa771c);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000000;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        z-index: 2;
        transition-duration: 0.5s;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.144);
        background-size: 250% 200%;
        padding: 5px;
      }
</style>