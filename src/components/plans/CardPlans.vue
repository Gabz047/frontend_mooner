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
                class="w-[380px] h-[655px] nth-last-child(3n-1):w-[400px] nth-last-child(3n-1):h-[710px] nth-last-child(3n-1):border-[#5310CE] bg-gradient-to-br from-[#200C4B] from-[90%] via-[#ffffff] via-10% rounded-[20px] p-7">

                <div class="h-[18%] ">
                    <div class="text-white ">
                        <h1 class="flex  items-center text-[40px] font-semibold">{{ plan.name }}</h1>
                    </div>
                    <div class="flex flex-wrap w-full">
                        <h1 class="text-white">{{ plan.subtittle }}</h1>
                    </div>
                </div>
                <div class=" w-full h-[40%] ">
                    <div class="odd:text-[#5310CE] odd:text-[30px] odd:font-medium">R<span
                            class="ml-[-1%] mdi mdi-currency-usd"></span></div>
                    <h1 class="text-white text-center text-[80px] font-bold">
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
</template>
