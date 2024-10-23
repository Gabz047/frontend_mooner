<script setup>
import { useLoginStore } from '@/stores/user/login';
const store = useLoginStore()
</script>
<template>
    <div class="flex justify-end w-[97.5%] mb-3 mx-auto right-0 h-8 text-white p-2">
     
        <div>
            <p>{{store.state.user.email}}</p>
        </div>
    </div>
</template>
<style scoped>
    header{
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        & p{
            color: white;
            font-weight: 200;
            margin-right: 10px
        }
        & img{
            margin-left: 10px
        }
    }
</style>