import { ref } from "vue"

export const artistinputs = ref([
    {
        fieldname: 'Nome artistico',
        minlength: '2',
        maxlength: '50',
        required: true,
        type: "text",
        value: ''
    },
    {
        fieldname: 'telefone',
        required: true,
        value: ''
    },
    {
        fieldname: 'instagram(opcional)',
        required: false,
        value: ''
    },
    {
        fieldname: "twitter(opcional)",
        required: true,
        value: ''
    },
    {
        fieldname: 'youtube(opcional)',
        required: true,
        value: ''
    },
    {
        fieldname: 'facebook(opcional)',
        required: true,
        value: ''
    },
])