<script setup>
import InputGlobal from '@/components/global/InputGlobal.vue';
import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCommunityStore, useLoginStore } from '@/stores';
const CommunityStore = useCommunityStore()
const route = useRoute()
const LoginStore = useLoginStore()
const route_id = route.params.id
const info = ref([])

const communityPosts = reactive({
    description: '',
    autor: LoginStore.user.email,
    community: route_id
})


onMounted( async () => {
    const community = await CommunityStore.getCommunitys(LoginStore.access)
    const FindCommunity = community.find(c => c.id === Number(route_id))
    info.value = FindCommunity
    await CommunityStore.getCommunitysPostsByCommunity(route_id, LoginStore.access)
})

</script>
<template>
    <div class="w-full flex justify-center items-center flex-col">
        <div class="h-[500px] overflow-y-auto  w-3/4 flex flex-col p-5 items-end gap-5  ml-20">
            <div v-for="item in CommunityStore.communitysPostsByCommunity" :key="item.id"  class="w-16 h-10 p-2 rounded-xl  bg-purple-700 text-white">
                <p>{{ item.description }}</p>
            </div>
        </div>
        <div class="flex justify-center gap-2">
            <InputGlobal placeholder="ola" id="luuna-input" v-model:value="communityPosts.description"/>
            <ButtonGlobal class="flex justify-center items-center" width="50px" height="40px" background="#6340AE" border="none" border_radius="10px"  :is_arrow="true" @click="CommunityStore.createCommunityPost(communityPosts, LoginStore.access)"/>
        </div>
    </div>
</template>
<style scoped>
    ::-webkit-scrollbar {
        width: 10px; 
        border-radius: 20px;
        height: 50px
    }
  
  ::-webkit-scrollbar-track {
    border-radius: 20px; 
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 20px; 
  }
</style>