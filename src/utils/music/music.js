import {ref, computed} from 'vue'
import { trash, wave, heart, disc, artist, copy, unlike } from "@/assets/images/icons/settingsIndex"
import Logo from '@/assets/images/Logo.png'
import monn from '@/assets/images/monn.jpg'

export const verify_active = ref(false)

export const data =  ref([
    {tittle: 'Remover', img: trash},
    {tittle: 'Iniciar MoonWave', img: wave},
    {tittle: 'Curtir', img: [heart, unlike], liked: false},
    {tittle: 'Album', img: disc},
    {tittle: 'Artista', img: artist},
    {tittle: 'Copiar Link', img: copy},
])

export const data_playlist = [
    {tittle: 'Melhores do ano', img: monn},
    {tittle: 'Treino pesado', img: wave},
    {tittle: 'Melhores do ano com certeza tropa', img: monn},
    {tittle: 'Treino pesado', img: wave},
    {tittle: 'Melhores do ano', img: monn},
    {tittle: 'Treino pesado', img: wave},
]

export const adjusteSize = (item, lenght, index) => {
    if (item.length > lenght) {
        item = item.replace(item.substring(index), '') + '...'
    }
    return item
}

export const data_music = ref([
    {tittle: 'Melhores do ano', artist: 'monn', has_playlist: false},
    {tittle: 'Treino pesado', artist: 'wave', has_playlist: false},
    {tittle: 'Melhores do ano com certeza tropa', artist: 'monn', has_playlist: false},
    {tittle: 'Treino pesado', artist: 'wave', has_playlist: false},
    {tittle: 'Melhores do ano', artist: 'monn', has_playlist: false},
    {tittle: 'Treino pesado', artist: 'wave', has_playlist: false},
])
