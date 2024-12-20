<script setup>
import GlobalBlur from '@/components/global/GlobalBlur.vue';
import { useCommunityStore, useLoginStore, useUserStore } from '@/stores';
import CommunityCreateSlide from '@/components/profile/CommunityCreateSlide.vue';
import { onMounted } from 'vue';
import CommunityUpdated from '@/components/profile/CommunityUpdated.vue';
import BeAnArtistSlide from '@/components/profile/BeAnArtistSlide.vue';

const storeUser = useUserStore()
const LoginStore = useLoginStore()
const storeCommunity = useCommunityStore()


onMounted( async () =>{
    const artist = await storeUser.GetArtist(LoginStore.user.email, LoginStore.access)
    await storeCommunity.getCommunitysByAutor(artist, LoginStore.access)
    console.log(artist)
})
</script>

<template>
    <GlobalBlur/>
    <BeAnArtistSlide :IsArtist="LoginStore.user.is_artist" />
    <CommunityCreateSlide v-if="!storeCommunity.communitysByAutor[0]?.name && LoginStore.user.is_artist"/> 
    <CommunityUpdated :name="storeCommunity.communitysByAutor[0]?.name" :id="storeCommunity.communitysByAutor[0]?.id" :description="storeCommunity.communitysByAutor[0]?.description"  :photo="storeCommunity.communitysByAutor[0]?.cover?.url"  v-if="storeCommunity.communitysByAutor[0]?.name && LoginStore.user.is_artist"/>
</template>