<template>
    <div :class="container_class" v-if="type !== 'choices'">
        <input :type="type" :placeholder="placeholder" :maxlength="maxlength" :minlength="minlength" :id="id" :required="is_required" v-model="model">
        <label :for="field_name" v-if="field_name">{{field_name}}</label>
    </div>
    <div :class="container_class" v-else>
        <select >
            <option v-for="option, index in options" :key="index">{{option}}</option>
        </select>
        <label :for="field_name" v-if="field_name">{{field_name}}</label>
    </div>
</template>
<script setup>
    defineProps({
        placeholder: {
            type: String,
            required: false
        },
        container_class:{
            type: String,
            required: true
        },
        id: {
            type: String,
            required: false
        },
        maxlength:{
            type: String,
            required: false
        },
        minlength:{
            type: String,
            required: false
        },
        field_name:{
            type: String,
            required: false
        },
        is_required:{
            type: String,
            required: false
        },
        options:{
            type: Array,
            required: true,
        },
        type: {
            type: String,
            required: true
        },
    })
    const model = defineModel("value")
</script>
