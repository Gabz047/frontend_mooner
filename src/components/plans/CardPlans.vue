<script setup>
import { plans } from "@/utils/plans/plans";
</script>

<template>
    <div class="h-[78.3vh] flex flex-col px-[5%]">
        <div class="flex w-665px h-5vh justify-center">
            <h1 class="flex justify-end font-semibold w-[380px] text-[#5310CE]">Melhor Custo Beneficio</h1>
        </div>
        <div class="flex justify-between items-center">
            <div v-for="(plan, index) in plans" :key="index"
                class=" rounded-[20px]"
                :class="[plan.name !== 'Lua Nova' ? 'w-[20vw] h-[60vh]' : 'w-[22vw] h-[65vh] ']">
                <div class="backdrop-blur-[100px] backdrop-opacity-100 w-full h-full rounded-[20px] p-8">
                    <div class="h-[18%] ">
                        <h1 class="flex  items-center text-[40px] font-semibold text-white">{{ plan.name }}</h1>
                        <h1 class="text-white">{{ plan.subtittle }}</h1>
                    </div>
                    <div class="flex flex-col justify-center w-full h-[40%] ">

                        <a class="text-[40px] leading-none">R$</a>

                        <h1 class="text-white text-center leading-none text-[80px] font-bold">
                            {{ plan.price }}
                        </h1>
                        <div class=" flex justify-center">
                            <button
                                class="w-[280px] h-[50px] border-white border-[1px] text-white font-medium rounded-[60px]">Obter</button>
                        </div>
                    </div>
                    <div class="h-[42%] flex items-center">
                        <ul>
                            <li v-for="(advantage, index) in plan.advantages" :key="index"
                                class="text-white text-[17px] p-3">
                                {{ advantage }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
