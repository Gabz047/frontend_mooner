<script setup>
import { headerInfo } from '@/utils/header/header'
import SideHeaderOptions from './SideHeaderOptions.vue';
import router from '@/router';
import { shallowRef } from 'vue';

const props = defineProps({
 data: {
    type: Object
 }
})

const showData = (data) => {
    if (data == 'playlist') {
        return props.data.playlist.content 
    } else if (data == 'artist') {
        return props.data.artist.content
    } else {
        props.data.community.content
    }

    console.log(props.data.playlist.content)
}

const setDropDown = (index) => {
    headerInfo.value.forEach(element => {
        if (headerInfo.value[index] != element) {
        element.active = false
    }
    });
    headerInfo.value[index].active = !headerInfo.value[index].active
}

const responsive = shallowRef(window.screen.width)

const isOpen = shallowRef(false)

</script>

<template>
    <section :class="responsive < 900 ? isOpen ? 'duration-500 w-[300px] h-[97dvh] mt-3 ml-3 rounded-lg flex flex-col items-center bg-[#121212] fixed' :  'duration-500 w-[80px] h-[97dvh] mt-3 ml-3 bg-[#121212] rounded-lg flex flex-col items-center fixed' : 'w-[300px] h-[97dvh] mt-3 ml-3 rounded-lg flex flex-col items-center bg-[#121212] fixed' ">
        <span v-if="responsive < 900" @click="isOpen = !isOpen" :class="'duration-500 absolute bottom-10 bg-[#1f1f1f] px-4 py-2 text-white rounded-full'"><i class=" text-2xl" :class="!isOpen ? 'mdi mdi-arrow-right-thick' : 'mdi mdi-arrow-left-thick'"></i></span>
        <div class="w-full flex justify-center h-12 items-center gap-3 mt-4">
            <div class="h-full w-12" >
                <img class="w-full h-[90%]" src="@/assets/images/logoMooner.png" alt="">
            </div>
            <p :class=" responsive < 900 ? isOpen ? 'text-3xl font-light duration-500 opacity-100' : 'duration-500 opacity-0 hidden' : 'duration-500 text-3xl font-light opacity-100'">Mooner</p>
        </div>

        <div class="w-full flex flex-col">
            <ul :class="responsive < 900 ? 'duration-500 w-full list-none flex flex-col gap-3 items-center mt-10' : 'duration-500 w-full list-none flex flex-col gap-3 justify-center items-center mt-10'">
                <li :class="responsive < 900 ? 'w-[90%] flex flex-col justify-center  text-white duration-500 p-1' : 'w-[100%] items-center flex flex-col justify-center  text-white duration-500 p-1'" v-for="item, index in headerInfo">
                    <span @click="setDropDown(index), router.push(item.to)" :class="responsive < 900 ? isOpen ? 'w-full flex h-10 gap-3 items-center relative hover:bg-[#1C1C1C] duration-500 rounded-xl py-6' : 'w-full justify-center flex h-10 gap-3 items-center relative hover:bg-[#1C1C1C] duration-500 rounded-xl py-6' : 'w-full flex h-10 gap-3 items-center relative hover:bg-[#1C1C1C] duration-500 rounded-xl py-6'" >
                        <span class="ml-4 md2:ml-0 text-[35px]" v-if="item.icon.startsWith('mdi')" :class="item.icon"></span>
                        <img v-else class="ml-4 md2:ml-0 h-[40px] w-[35px]" :src="item.icon" alt="">
                        <p :class="responsive < 900 ? isOpen ? 'text-[16px] font-medium' : 'hidden' :'text-[16px] font-medium'">{{ item.title }}</p>
                        <span v-if="item.isList && !item.active" :class="responsive < 900 ? isOpen ? '' : 'hidden' : '' " class="mdi mdi-chevron-down absolute right-1 text-[20px]"></span>
                        <span v-if="item.isList && item.active" :class="responsive < 900 ? isOpen ? '' : 'hidden' : '' " class="mdi mdi-chevron-up absolute right-1 text-[20px] "></span>

                    </span>
                    <div :class="item.active ? 'animation' : 'normal'" v-if="item.isList && item.active && responsive < 900 ? isOpen ? item.active : false : item.active">
                            <SideHeaderOptions :data="showData(item.name)" />
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scooped>
.normal {
    opacity: 0;
    transition: 2s;
}
.animation {
    animation-name: setDown;
    animation-duration: 300ms;
    animation-iteration-count: 1;
    opacity: 1;
} 

@keyframes setDown {
    0% {
       opacity: 0;
    }
    100% {
       opacity: 1;
    }
}

</style>
