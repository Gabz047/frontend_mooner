<script setup>
import { useMoonStore } from "@/stores";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AudioPlayer from "@/components/global/AudioPlayer.vue";

const moonStore = new useMoonStore();
const route = useRoute();
const router = useRouter();

const moon = route.params.email;

onMounted(() => {
    moonStore.connectMoonWave(moon);
    router.push('/')
})
</script>

<template>
    <div>
    </div>
</template>