<script setup>
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import InputGlobal from '@/components/global/InputGlobal.vue';
import PerfilPhoto from './PerfilPhoto.vue';
import { useBeArtistStore } from '@/stores';
const BeartistStore = useBeArtistStore()
defineProps({
    fields_input: {
        type: Array,
        required: true
    }
})
</script>
<template>
    <div class="flex flex-col w-screen h-full justify-center items-center p-5 gap-5 overflow-hidden" >
        <PerfilPhoto :is_music="false"/>
        <InputGlobal  v-for="fields in fields_input" :key="fields.id" :field_name="fields.fieldname" :maxlength="fields.maxlength" :minlength="fields.minlength" :is_required="fields.required" :type="fields.type" v-model:value="fields.value" container_class="artist-fields-container"/>
        <textarea placeholder="sobre voce"></textarea>
        <ButtonGlobal  title="enviar" background="purple" color="white" width="150px" border_radius="10px" font_size="17px" @click="BeartistStore.CreateArtist"/>
    </div>
</template>
<style>
.artist-fields-container{
    position: relative;
    width: 50%;
    margin: 20px 0;
}

.artist-fields-container > input{
    width: 100%;
    padding: 5px; 
    border-radius: 10px; 
    background-color: #1f1f1f;
    border: 1px solid;
    color: #fff; 
    font-size: 15px;
    outline: none;
}

.artist-fields-container input::placeholder {
    color: transparent; 
}

.artist-fields-container label {
    position: absolute;
    pointer-events: none;
    font-size: 40px;
  }

.artist-fields-container input + label,
.artist-fields-container input:not(:placeholder-shown) + label {
    top: 0;
    left: 10px;
    transform: translateY(-100%);
    font-size: 17px;
    color: white
}
textarea{
    width: 50%;
    padding: 10px; 
    border-radius: 10px; 
    height: 350px;
    background-color: #1f1f1f;
    border: 1px solid;
    color: #fff; 
    font-size: 15px;
    outline: none;
}
</style>