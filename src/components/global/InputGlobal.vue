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
<style scoped>
.input-container {
    position: relative;
    margin: 20px 0;
    width: 100%;
  }

input{
    width: 100%;
    padding: 20px;
    border: 2px solid #444; /* Borda mais clara */
    border-radius: 10px; /* Cantos arredondados */
    background-color: #000; /* Fundo escuro */
    color: #fff; /* Cor do texto */
    font-size: 18px;
    outline: none;
  }

  input::placeholder {
    color: transparent; /* Esconde o placeholder */
  }

  label {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    background-color: #000; /* Cor de fundo para combinar com o input */
    padding:0 5px ;
    color: purple; /* Cor do texto do label */
    transition: 0.3s;
    pointer-events: none;
    font-size: 40px;
  }

  input + label,
  input:not(:placeholder-shown) + label {
    top: 0;
    left: 20px;
    transform: translateY(-50%);
    font-size: 17px;
    color: rgb(154, 1, 255) /* Cor do texto do label quando focado */
  }
</style>