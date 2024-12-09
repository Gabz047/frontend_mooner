<script setup>
const props = defineProps({
    data: {
        type: Object
    }
})
</script>
<template>
    <img class="object-cover w-14 h-14 rounded-full lg:mr-4" :src="props.data?.perfil?.url" alt="">
        <div class="mr-3 lg:hidden">
        <p class="text-lg">{{ props.data.first_name }}</p>
        <p class="text-[11px] h-5 items-center flex justify-center rounded-xl w-[100px]" style="background: linear-gradient(180deg, rgba(62,19,103,1) 0%, rgba(62,19,103,0.9) 90%);">{{ props.data.premium != null ? props.data.premium : 'Seja Premium' }}</p>
        </div>
</template>