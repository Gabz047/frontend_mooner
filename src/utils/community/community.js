import { ref } from "vue";

export const CommunityInputs = ref([
    {
        field_name: 'nome',
        value: ''
    },
    {
        field_name: 'descrição',
        value: '',
        type: 'textarea'
    }
])