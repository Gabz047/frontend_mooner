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
    <div class="flex flex-col w-2/4 h-full justify-center items-center p-5 gap-5 overflow-hidden" >
        <InputGlobal  v-for="fields in fields_input" :key="fields.id" :field_name="fields.fieldname" :maxlength="fields.maxlength" :minlength="fields.minlength" :is_required="fields.required" :type="fields.type" :placeholder="fields.placeholder"  v-model:value="fields.value"  container_class="artist-fields-container"/>
        <ButtonGlobal  title="enviar" background="purple" color="white" width="150px" border_radius="10px" font_size="17px" @click="StoreCreateArtist.CreateArtist"/>
        <MsgGlobal v-show="StoreCreateArtist.msg" :msg="StoreCreateArtist.msg" :err="StoreCreateArtist.err" @confirm="nextsection"/>
    </div>
</template>