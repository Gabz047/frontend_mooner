<template>
    <button id="btn_id" :style="{background: background, width: width, height: height, color:color, fontSize: font_size, border:border, borderRadius: border_radius}"><p>{{title}}</p></button>
</template>
<script setup>
    defineProps({
        title:{
            type: String,
            required: true
        },
        background:{
            type: String,
            required: true
        },
        width:{
            type: String,
            required: true
        },
        height: {
            type: String,
            required: true
        },
        font_size:{
            type: String,
            required: true,
        },
        border_radius: {
            type: String,
            required: true
        },
        color:{
            type: String,
            required: true
        },
        border:{
            type: String,
            required: true
        }
    })
</script>