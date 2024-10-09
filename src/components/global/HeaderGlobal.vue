<script setup>
import { useLoginStore } from '@/stores/user/login';
const store = useLoginStore()
</script>
<template>
    <header>
        <div>
            <RouterLink to="/"><img src="../../assets/images/Logo.png"></RouterLink>
        </div>
        <div>
            <p>{{store.state.user.email}}</p>
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
</style>