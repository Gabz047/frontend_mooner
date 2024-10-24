<script setup>
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import InputGlobal from '@/components/global/InputGlobal.vue';
import MsgGlobal from '@/components/global/MsgGlobal.vue';
import { useBeArtistStore, useArtistProgress} from '@/stores';
const StoreCreateArtist = useBeArtistStore()
const StoreProgressArtist = useArtistProgress()

defineProps({
    fields_input: {
        type: Array,
        required: true
    }
})

function nextsection(err){
        if(!err){
            StoreCreateArtist.msg = null
            StoreProgressArtist.state.progress_artist[0].is_activate = true
        }
        else{
            StoreCreateArtist.msg = null
        }
    }

</script>
<template>
    <div class="flex flex-col w-screen h-full justify-center items-center p-5 gap-5 overflow-hidden" >
        <InputGlobal  v-for="fields in fields_input" :key="fields.id" :field_name="fields.fieldname" :maxlength="fields.maxlength" :minlength="fields.minlength" :is_required="fields.required" :type="fields.type" :placeholder="fields.placeholder"  v-model:value="fields.value"  container_class="artist-fields-container"/>
        <ButtonGlobal  title="enviar" background="purple" color="white" width="150px" border_radius="10px" font_size="17px" @click="StoreCreateArtist.CreateArtist"/>
        <MsgGlobal v-show="StoreCreateArtist.msg" :msg="StoreCreateArtist.msg" :err="StoreCreateArtist.err" @confirm="nextsection"/>
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

.artist-fields-container > textarea{
    width: 100%;
    padding: 10px; 
    border-radius: 10px; 
    height: 350px;
    background-color: #1f1f1f;
    border: 1px solid;
    color: #fff; 
    font-size: 15px;
    outline: none;
}

.artist-fields-container input + label,
.artist-fields-container textarea + label,
.artist-fields-container input:not(:placeholder-shown) + label,
.artist-fields-container textarea + label{
    top: 0;
    left: 10px;
    transform: translateY(-100%);
    font-size: 17px;
    color: white
}
</style>