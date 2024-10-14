<script setup>
import router from '@/router';
import NavigateHomeButtons from '@/components/buttons/NavigateHomeButtons.vue';

  function gopageartist(id){
    router.push(`/artist/${id}`)
  }
</script>
<template>
<NavigateHomeButtons />
</template>
