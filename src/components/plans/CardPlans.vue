<script setup>
import { plans } from "@/utils/plans/plans";
import GlobalBlur from "../global/GlobalBlur.vue";
import router from '@/router'
</script>

<template>
    <div class="h-[78.3vh] flex flex-col px-[5%]">
        <div class="flex w-665px h-5vh justify-center">
            <h1 class="flex justify-end font-semibold w-[380px] text-[#5310CE]">Melhor Custo Beneficio</h1>
        </div>
        <div class="flex justify-between items-center">
            <div v-for="(plan, index) in plans" :key="index" class="rounded-[20px] backdrop-blur-[100px] backdrop-opacity-400 w-[30vw]" :class="plan.name === 'Lua Nova' ? 'scale-110' : null " :style="plan.name === 'Lua Nova' ? {border: '1px solid linear-gradient(circle, rgba(255,255,255,1) 0%, rgba(7,1,21,1) 80%)'} : null">
                <div class=" w-full h-full  rounded-[20px] p-8">
                    <div class="h-[18%]">
                        <h1 class="flex  items-center text-[32px] font-semibold text-white">{{ plan.name }}</h1>
                        <h1 class="text-white">{{ plan.subtittle }}</h1>
                    </div>
                    <div v-if="plan.name === 'Lua Nova'" class="w-full "></div>
                    <div class="flex flex-col justify-center w-full h-[40%] p-2">
                        <a class="text-[32px] text-purple-800 leading-none">R$</a>
                        <h1 class="text-white text-center leading-none text-[70px] font-bold">
                            {{ plan.price }}
                        </h1>
                        <div class=" p-2 flex justify-center">
                            <button class="w-[280px] h-[50px] border-white border-[1px] text-white font-medium rounded-[60px]" @click="router.push('/plans/payments/')">Obter</button>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <ul v-for="(advantage, index) in plan.advantages" :key="index" class="flex flex-col items-center w-full p-1">
                            <div class="flex w-full items-center">
                                <img src="../../assets/images/Checkmark.png " class="w-7 h-7">
                                <li class="text-white text-[15px] p-3">{{ advantage }}</li>
                            </div>  
                            <div class="border h-[1px] border-[#d9d9d9] w-full"></div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <GlobalBlur/>
    </div>
</template>
