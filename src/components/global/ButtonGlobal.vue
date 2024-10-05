<template>
    <button :id="btn_id">{{title}}</button>
</template>
<script setup>
    defineProps({
        title:{
            type: String,
            required: true
        },
        btn_id:{
            type: String,
            required: true
        },
    })
</script>