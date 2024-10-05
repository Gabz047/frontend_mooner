<script setup>
    import ButtonGlobal from '@/components/global/ButtonGlobal.vue';
    import InputGlobal from '@/components/global/InputGlobal.vue';
    defineProps({
        info_page: {
            type: Object,
            required: true
        },
        inputs_page:{
            type: Array,
            required: true
        },
        action_btn: {
            type: Function,
            required: true
        }
    })
</script>
<template>
<div class="container">
    <div :class="info_page.is_login_page ? 'main-login' : 'main-signup'">
    </div>
    <div class="content-container">
        <div class="content">
            <div class="text-content">
                <img src="../../assets/images/Logo.png">
                <h1>{{info_page.title_session}}</h1>
                <p>{{info_page.subtitle_session}}</p>
            </div>
            <div class="auth-content">
                <h1>{{info_page.title_content}}</h1>
                <InputGlobal v-for="info in inputs_page" :key="info.id" :type="info.type" :field_name="info.fieldname" :maxlength="info.maxlength" :is_required="info.required" :minlength="info.minlength" :placeholder="info.placeholder" v-model:value="info.value"></InputGlobal>
                <div class="actions-container">
                    <div class="actions">
                        <RouterLink :to="info_page.links.link1">{{info_page.link1_title}}</RouterLink>
                        <RouterLink :to="info_page.links.link2">{{info_page.link2_title}}</RouterLink>
                    </div>
                    <div class="btn-container">
                        <ButtonGlobal :btn_id="info_page.btn_id" :title="info_page.btn_title" @click="action_btn"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>