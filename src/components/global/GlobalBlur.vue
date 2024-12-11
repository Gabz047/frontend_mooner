<script setup>
    import { hexToRgb } from '@/utils/hex/hex';
    
   const props = defineProps({
        light_color: {
            type: String,
            default: '#510754'
        },
        dark_color: {
            type: String,
            default: '#ffffff'
        }
    })

</script>
<template>
    <div class=" fixed flex w-10/12 justify-center itemns-center z-0 bottom-0">
        <div class="blur-[400px] shadow-2xl absolute right-0 w-7/12 h-96 z-0 border-2 bottom-[-330px] rounded-[50%]"  :style="`background-color: ${hexToRgb(props.light_color)}`"></div>
        <div class="blur-[400px] shadow-2xl absolute left-0 w-7/12 h-96 z-0 border-2 bottom-[-290px] rounded-[50%]"   :style="`background-color: ${hexToRgb(props.dark_color)}`"></div>
    </div>
</template>