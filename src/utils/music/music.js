import { trash, wave, heart, disc, artist, copy } from "@/assets/images/icons/settingsIndex"
import Logo from '@/assets/images/Logo.png'
import monn from '@/assets/images/monn.jpg'
export const data = [
    {tittle: 'Remover', img: trash},
    {tittle: 'Iniciar MoonWave', img: wave},
    {tittle: 'Curtir', img: heart},
    {tittle: 'Album', img: disc},
    {tittle: 'Artista', img: artist},
    {tittle: 'Copiar Link', img: copy},
]

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

export const data_music = [
    {tittle: 'Melhores do ano', artist: 'monn'},
    {tittle: 'Treino pesado', artist: 'wave'},
    {tittle: 'Melhores do ano com certeza tropa', artist: 'monn'},
    {tittle: 'Treino pesado', artist: 'wave'},
    {tittle: 'Melhores do ano', artist: 'monn'},
    {tittle: 'Treino pesado', artist: 'wave'},
]
