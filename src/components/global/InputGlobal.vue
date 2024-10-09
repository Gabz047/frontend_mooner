<template>
    <div class="input-container">
        <input :type="type" :placeholder="placeholder" :maxlength="maxlength" :minlength="minlength" :id="id" :required="is_required"  v-model="model">
        <label :for="field_name">{{field_name}}</label>
    </div>
</template>
<script setup>
    defineProps({
        placeholder: {
            type: String,
            required: false
        },
        class_container:{
            type: String
        },
        id: {
            type: String
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
        type: {
            type: String,
            required: true
        }
    })
    const model = defineModel("value")
</script>
