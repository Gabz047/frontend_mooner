<script setup>
import InputGlobal from '@/components/global/InputGlobal.vue';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCommunityStore, useLoginStore, useUserStore } from '@/stores';
import GlobalBlur from '@/components/global/GlobalBlur.vue';
const CommunityStore = useCommunityStore()


const route = useRoute()
const LoginStore = useLoginStore()
const UserStore = useUserStore()
const artist = ref(null)
const description = ref('')
const route_id = Number(route.params.id)

onMounted( async () => {
    artist.value = await UserStore.GetArtist(LoginStore.user.email, LoginStore.access)
    await CommunityStore.GetCommunityChat(route_id, LoginStore.access)
    await CommunityStore.getCommunitysPostsByCommunity(route_id, LoginStore.access)
    await CommunityStore.getCommunityUser(route_id, LoginStore.access)
})
</script>
<template>
    <GlobalBlur light_color="#1700FF" dark_color="#ffffff"/>
    <div class="w-full flex justify-center items-center flex-col">
        <div class="w-full gap-5 flex justify">
            <img :src="CommunityStore.CommunityChat?.cover?.url" class="w-32 h-32 rounded-full">
            <div class="flex flex-col justify-center items-center gap-2 text-white">
                <h1 class="text-5xl">{{CommunityStore.CommunityChat.name}}</h1>
                <p>{{ CommunityStore.CommunityUser.length }} seguidores</p>
            </div>
        </div>
        <div :class="artist === CommunityStore.CommunityChat?.autor?.artistic_name ? 'h-[400px] overflow-y-auto w-full flex flex-col p-2 z-20 items-end gap-5 ' : 'h-[550px] overflow-y-auto w-full flex flex-col p-2 z-20 gap-5  items-start justify-start'">
            <div v-for="item in CommunityStore.communitysPostsByCommunity" :key="item.id"  class="w-4/6 rounded-xl p-5  bg-neutral-900 text-white">
                    <div class="flex gap-2 ">
                        <img :src="item.autor.user.perfil?.url" class="rounded-full w-14 h-14 object-cover" >
                    <p class="text-lg">{{item.autor.artistic_name}}</p>
                    </div>
                    <div class="flex justify-center items-center p-2">
                        <p class="text-lg w-4/5 text-center">{{ item?.description }}</p>
                    </div>
                    <div>
                        <i class="mdi mdi-thumb-up"></i>
                    </div>
                </div>
            </div>
        <div class="bg-[#282828] rounded-full p-1 flex justify-center z-10 items-center mt-5" v-if="artist === CommunityStore.CommunityChat?.autor?.artistic_name">
            <InputGlobal placeholder="Digite algo...." id="luuna-input" v-model:value="description"/>
            <ButtonGlobal class="flex justify-center items-center" width="40px" height="40px" background="#6340AE" border="none" border_radius="50px"  :is_arrow="true" @click="CommunityStore.createCommunityPost({autor: artist, description: description, community: route_id}, LoginStore.access), description = '' "/>
        </div>
    </div>
</template>