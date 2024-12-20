import { useStorage } from "@vueuse/core"
import { defineStore } from "pinia"
export const useArtistProgress = defineStore('artistprogress', () =>{
    const state = useStorage('storage_artist', {
        progress_artist: [
            {   
                img: 'src/assets/images/Certificate.png' ,
                hint: 'Se seu certificado for compativel ele será mandado para a analise',
                is_activate: false
            },
            {
                img: 'src/assets/images/Check.png' ,
                hint: 'certificado analisado e confirmado, torne-se um artista oficial do mooner',
                is_activate: false
            },
            {
                img: 'src/assets/images/Vector.png' ,
                hint: 'crie seu primeiro som/albuns como artista oficial do app mooner ',
                is_activate: false
            }
        ],
        progress_artist_fields: [
            {
                fieldname: 'Nome artistico',
                minlength: '2',
                maxlength: '50',
                required: true,
                type: "text",
                value: ''
            },
            {
                fieldname: 'instagram(opcional)',
                required: false,
                type: "text",
                value: ''
            },
            {
                fieldname: "twitter(opcional)",
                required: true,
                type: "text",
                value: ''
            },
            {
                fieldname: 'youtube(opcional)',
                required: true,
                type: "text",
                value: ''
            },
            {
                fieldname: 'Biografia',
                required: true,
                type: 'textarea',
                value: '',
            }
        ],
        artist_create_song_fields: [
            {
                fieldname: 'titulo',
                type: 'text',
                required: true,
                value: ''
            },
            {
                fieldname: 'generos',
                type: 'choices',
                required: true,
                options: [],
                value: '',
            },
            {
                fieldname: 'letra da música (opcional)',
                type: 'textarea',
                required: true,
                value: ''
            }
        ],
        Select_song_option: [
            { title: 'Música', active: true }, 
            { title: 'Album', active: false }
        ]
    })

    return {state}
})
