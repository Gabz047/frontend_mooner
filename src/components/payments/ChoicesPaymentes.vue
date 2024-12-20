<script setup>
    defineProps({
        icon: {
            type: String,
            required: true
        },
        is_active:{
            type: Boolean,
            required: true
        },
        type:{
            type: String,
            required: true
        }
    })
</script>
<template>
    <div :style="{backgroundColor: is_active ? 'purple' : '#1E1E1E'}">
        <i :class="icon"></i>
    </div>
</template>