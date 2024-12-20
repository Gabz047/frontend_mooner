<template>
    <div class="apresentation">
        <h1 class="text-7xl  text-white ml-80">Mooner.</h1>
        <p class="text-3xl font-bold ml-80 text-violet-800">SUA EXPERIÊNCIA É A NOSSA PRIORIDADE</p>
    </div>
</template>
<style scoped>
    .apresentation{
        background: url('../../assets/images/loadingmoon.png');
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 9999;
        height: 100%;
        position: absolute;
        background-repeat: no-repeat;
        background-size: cover;
        gap: 20px;
        bottom: 0;
        animation: fadeOut 2s ease-in-out 4s forwards,  fadeIn 2s ease-in-out;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0.95;
            transform: scale(0.95)
        }
        100% {
            opacity: 1;
            transform: scale(1)
        }
    }
    
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.9);
        }
    }
</style>