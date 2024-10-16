<script setup>
import { useLoginStore } from '@/stores/user/login';
import UserOptions from '../user/UserOptions.vue';
const store = useLoginStore()

</script>
<template>
    <header>
        <div>
            <RouterLink to="/"><img src="../../assets/images/Logo.png"></RouterLink>
        </div>
        <div class="user-config">
            <div class="flex items-center mt-2  gap-2">
                <img class="w-9 rounded-full" src="https://th.bing.com/th/id/R.47d1cc4b137f211cb1c3dfa2135bacba?rik=WfNjlHz94xdl5g&pid=ImgRaw&r=0">
                <p >{{store.state.user.email}}</p>
            </div>
            <div id="options">
                <UserOptions/>
            </div>
        </div>
    </header>
</template>
<style scoped>
    header{
        background-color: black;
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
    .user-config{
        color: white;
        position: absolute;
        right: 0;
        margin-right: 20px;
    }
    #options{
        display: none;
    }
    .user-config:hover{
        background-color: blueviolet;
        border-radius: 10px 10px 0px 0px ;
    }
    .user-config:hover #options{
        display: flex;
        flex-direction: column;
        position: absolute;
        background-color: blueviolet;
        gap: 5px;
        width: 100%;
        border-radius: 0px 0px 10px 10px;
        right: 0.005px;
        font-size: 17px;
        padding: 10px
    }
</style>