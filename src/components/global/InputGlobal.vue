<template>
    <div :class="container_class">
        <input :style="{backgroundColor: bgcolor, color: color, borderRadius: rounded}" :disabled="disabled" :value="value" :type="type" :placeholder="placeholder" :maxlength="maxlength" :minlength="minlength" :id="id" :required="is_required"  v-if="type !== 'textarea' && type !== 'choices'"  v-model="model" />
        <textarea :placeholder="placeholder" v-if="type === 'textarea'" v-model="model"/>
        <select v-if="type === 'choices' && !multiple" v-model="model">
            <option v-for="option in options" :key="option.id" >{{option.description}}</option>
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
        bgcolor:{
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        rounded: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false,
        },
        value:{
            type: '',
            required: false
        }
    })
    const model = defineModel("value")

   
</script>
