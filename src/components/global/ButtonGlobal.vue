<template>
    <button id="btn_id" :class="class" :style="{background: background, width: width, height: height, padding: padding, color:color, fontSize: font_size, border:border, borderRadius: border_radius}" class="flex gap-2 justify-center">
        <i v-if="has_icon" :class="icon"></i><p v-if="!is_arrow">{{title}}</p><img src="../../assets/images/EmailSend.png" id="sendsvg" v-else></button>
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
        padding:{
            type: String,
            required: false
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
        },
        is_arrow:{
            type: Boolean,
            required: true
        },
        class:{
            type: String,
            required: true,
        },
        has_icon: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String
        },
    })
</script>