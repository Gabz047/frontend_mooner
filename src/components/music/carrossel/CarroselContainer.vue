<script setup>
import { CarrosselMidItem, CarroselItem, CarrosselShortItem } from '@/components';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

</script>

<template>
  <section>
    <div class="h-[380px] items-center justify-center w-full flex">
      <CarroselItem />
    </div>
  </section>
</template>
