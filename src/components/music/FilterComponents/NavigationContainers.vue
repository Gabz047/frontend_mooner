<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    width: {
        type: String,
        default: 'w-full'
    },
    activeRight: {
        type: Boolean
    },
    activeLeft: {
        type: Boolean
    }, 
    Height:{
        type: String
    },
    title: {
        type: String,
        default: ''
    }
})

const emits = defineEmits([
    'right', 'left'
])
</script>
<template>
    <div class="w-full relative  flex min-h-56 justify-between items-center">
    <div :class="`absolute bottom-16 top-[-8px] right-24 flex text-2xl`">
        <span @click="emits('left')" :class="`mdi mdi-chevron-left text-${props.activeLeft ? 'white' : 'slate-300'}`"></span>
        <span @click="emits('right')" :class="`mdi mdi-chevron-right text-${props.activeRight ? 'white' : 'slate-300'}`"></span>
    </div>
   
    <section :class="`${props.width} px-12 flex items-center ${props.Height} gap-4 overflow-x-hidden h-full`">
        <div class="flex w-full flex-col">
        <p class="ml-5 text-xl text-white">{{ props.title }}</p>
        <div class="w-full flex ">
        <slot></slot>
        </div>
        </div>
    </section>
    </div>
</template>
<style scoped>
.down {
animation: setDown 0.5s 1;

}

@keyframes setDown {
    from {
        height: 5px;
        width: 95%;
        margin-left: 10px;
    }
    to {
        height: 300px;
        width: 100%;
        margin-left: 0px;
    }
}
.custom-checkbox {
 all: unset;
 width: 20px;
 height: 20px;
 border: 1px solid white;
 border-radius: 60px;
}

.custom-checkbox:checked {
    background-color: #2E0F71;
}
</style>