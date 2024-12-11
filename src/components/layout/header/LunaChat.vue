<script setup>
    defineProps({
        answer: {
            type: String,
            required: true
        },
        response: {
            type: String,
            required: true
        }
    })
</script>
<template>
    <div class="overflow-auto">
        <div  class='w-full flex justify-end mt-5 mb-5'>
            <p v-html="answer" class="w-80 text-base rounded-s-full rounded-b-full p-2 bg-purple-700 text-white"></p>
        </div>
        <div class="w-full flex">
            <p class="w-96 text-base rounded-e-3xl rounded-b-3xl p-3 bg-neutral-800 text-white" v-html="response ? response : 'Lunna esta gerando sua resposta...'"></p>
        </div>
    </div>
</template>