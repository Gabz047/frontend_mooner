<script setup>
import router from '@/router';
import ButtonGlobal from '../global/ButtonGlobal.vue';

</script>
<template>
    <div >
        <h1 class="text-center text-5xl text-white">Crie sua Comunidade</h1>
        <div class="w-full flex justify-center items-center">
            <div class="flex justify-center items-center p-10 gap-20">
                <img src="../../assets/images/comunity.png"  class="w-96 h-96 rounded-xl">
                <h2 class="text-white text-2xl w-3/4">Criar sua comunidade é fundamental para fortalecer laços com seus fãs, permitindo uma conexão mais profunda e significativa. Engaje-se de maneira autêntica, compartilhe experiências, troque ideias e crie um espaço onde todos se sintam valorizados e próximos de você, aqui no Mooner ajudar a sua carreira é a nossa prioridade</h2>
            </div>
        </div>
        <div class="flex justify-center items-center mt-5 w-full">
            <ButtonGlobal title="Criar sua comunidade" background="purple" width="250px" font_size="15px" border_radius="20px" color="white" padding="12px" @click="router.push('/createcommunity/')"/>
        </div>
    </div>  
</template>