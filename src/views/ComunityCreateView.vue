<script setup>
    import InputGlobal from '@/components/global/InputGlobal.vue';
    import { CommunityInputs } from '@/utils/community/community';
    import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
    import PerfilPhoto from '@/components/user/artist/PerfilPhoto.vue';
    import { useLoginStore, useCommunityStore, useUserStore } from '@/stores';
    import router from '@/router';
    import { onMounted, ref } from 'vue';
    
    const CommunityStore = useCommunityStore()
    const LoginStore = useLoginStore()
    const UserStore = useUserStore()
    const artist_name = ref(null)
    
    async function CreateNewCommunity(){
       const response = await CommunityStore.createCommunity({autor: artist_name.value, name: CommunityInputs.value[0].value, description: CommunityInputs.value[1].value, cover: CommunityStore.communitycover}, LoginStore.access)
       router.push(`/community/${response.id}/`)
    }

    onMounted(async () =>{
        artist_name.value = await UserStore.GetArtist(LoginStore.user.email, LoginStore.access)
    })
</script>
<template>
    <h1 class="text-white text-3xl text-center">Criar Comunidade</h1>
    <div class="flex justify-center items-center p-5 flex-col">
        <div class="w-2/4 flex flex-col justify-center items-center p-5">
            <PerfilPhoto :isCommunity="true"/>
            <InputGlobal v-for="data, index in CommunityInputs" :key="index" :field_name="data.field_name" :type="data.type" v-model:value="data.value" class="artist-fields-container"/>
            <ButtonGlobal title="Criar" width="150px" border_radius="20px" background="purple" color="white" @click="CreateNewCommunity"/>
        </div>
    </div>
</template>