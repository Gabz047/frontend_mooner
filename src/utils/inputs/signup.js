import { ref } from "vue"

export const signupinputs = ref([
    {
        id: 1,
        fieldname: 'email',
        placeholder: 'exemplo@email.com',
        minlength: '3',
        maxlength: '100',
        required: true,
        type: "email",
        value: ''
    },
    {
        id: 2,
        fieldname: 'senha',
        placeholder: 'senha1234@',
        minlength: '8',
        maxlength: '25',
        required: true,
        type: 'password',
        value: ''
    },
    {
        id: 3,
        fieldname: 'confirme sua senha',
        placeholder: 'senha1234@',
        minlength: '8',
        maxlength: '25',
        required: true,
        type: 'password',
        value: ''
    }
])