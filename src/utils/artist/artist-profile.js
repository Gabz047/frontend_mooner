import { ref } from "vue";

export const artist = ref([
    {
        id: 1,
        artist: 'teste',
        img: 'https://tse1.mm.bing.net/th?id=OIP.lzt_MmLU-zP9jao6-x_wnAHaHU&pid=Api&P=0&h=180',
        detail: 'descricao do artista teste, descricao do artista test, descricao , descricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao, ao do artista testedescricao',
    },
    {
        id: 2,
        artist: 'teste',
        img: 'https://tse1.mm.bing.net/th?id=OIP.lzt_MmLU-zP9jao6-x_wnAHaHU&pid=Api&P=0&h=180',
        detail: 'descricao do artista teste, descricao do artista test, descricao , descricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao, ao do artista testedescricao',
    },
    {
        id: 3,
        artist: 'teste',
        img: 'https://tse1.mm.bing.net/th?id=OIP.lzt_MmLU-zP9jao6-x_wnAHaHU&pid=Api&P=0&h=180',
        detail: 'descricao do artista teste, descricao do artista test, descricao , descricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao do artista testedescricao, ao do artista testedescricao',
    },
])

export function findartist(id){
    const findartist = artist.value.find((art) => art.id === Number(id))

    if(findartist){
        return findartist
    }
    else{
        return 'artista não encontrado'
    }
}