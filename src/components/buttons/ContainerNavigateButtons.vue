<script setup>
const props = defineProps({
    justify: {
        type: String,
        default: 'justify-center'
    }
})
</script>
<template>
 <section class="flex gap-4" :class="props.justify">
    <slot>
    </slot>
 </section>   
</template>