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
    }
})

const emits = defineEmits([
    'right', 'left'
])
</script>
<template>
    <div class="w-full relative  flex min-h-12 justify-between items-center">
    <div :class="`absolute bottom-16  right-24 flex text-2xl`">
        <span @click="emits('left')" :class="`mdi mdi-chevron-left text-${props.activeLeft ? 'white' : 'slate-300'}`"></span>
        <span @click="emits('right')" :class="`mdi mdi-chevron-right text-${props.activeRight ? 'white' : 'slate-300'}`"></span>
    </div>
    <section :class="`${props.width} px-12 flex items-center h-16 gap-4 overflow-hidden`">
        <slot></slot>
      
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