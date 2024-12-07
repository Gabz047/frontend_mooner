<script setup>
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import InputGlobal from '@/components/global/InputGlobal.vue';
import MsgGlobal from '@/components/global/MsgGlobal.vue';
import { useArtistProgress, useLoginStore, useArtistStore} from '@/stores';
import { reactive, computed } from 'vue';
const ArtistStore = useArtistStore()
const StoreProgressArtist = useArtistProgress()
const LoginStore = useLoginStore()

const newartist = reactive({
        user: LoginStore.user.email,
        artistic_name: StoreProgressArtist.state.progress_artist_fields[0].value,
        instagram: StoreProgressArtist.state.progress_artist_fields[1].value,
        twitter: StoreProgressArtist.state.progress_artist_fields[2].value,
        youtube: StoreProgressArtist.state.progress_artist_fields[3].value,
        about:  StoreProgressArtist.state.progress_artist_fields[4].value
})

const artistComputed = computed(() => newartist) 

defineProps({
    fields_input: {
        type: Array,
        required: true
    }
})

function nextsection(err){
        if(!err){
            ArtistStore.msg = null
            StoreProgressArtist.state.progress_artist[0].is_activate = true
        }
        else{
            ArtistStore.msg = null
        }
}

</script>
<template>
    <div class="flex flex-col w-2/4 h-full justify-center items-center p-5 mt-16 gap-5 overflow-hidden" >
        <InputGlobal  v-for="fields in fields_input" :key="fields.id" :field_name="fields.fieldname" :maxlength="fields.maxlength" :minlength="fields.minlength" :is_required="fields.required" :type="fields.type" :placeholder="fields.placeholder"  v-model:value="fields.value"  container_class="artist-fields-container"/>
        <ButtonGlobal  title="enviar" background="purple" color="white" width="150px" border_radius="10px" font_size="17px" @click="ArtistStore.createArtist(newartist, LoginStore.access)"/>
        <MsgGlobal v-show="ArtistStore.msg" :msg="ArtistStore.msg" :err="ArtistStore.err" @confirm="nextsection"/>
    </div>
</template>