<script setup>
    defineProps({
        perfil: {
            type: URL,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    })
</script>
<template>
    <div class="text-white flex flex-col gap-20 w-full   p-5 rounded-2xl"
          :style="{ backgroundImage: `linear-gradient(315deg, rgba(0,0,0, 0.6) 10%, rgba(0,0,0,1) 90%), url(${perfil})` }"
          style="background-repeat: no-repeat; background-size: cover; background-attachment: fixed;">
          <h1 class="text-3xl font-bold">Biografia</h1>
          <p class="font-bold">{{ description ? description : 'Este Artista não possui Biografia' }}</p>
    </div>
</template>