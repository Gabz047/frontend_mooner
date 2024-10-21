<script setup>
import { onMounted, ref } from 'vue';
import { findartist } from '@/utils/artist/artist-profile';
import { artistsongs } from '@/utils/artist/artist-songs';
import { artistalbuns } from '@/utils/artist/artist-albuns';
import { useRoute } from 'vue-router';
const route = useRoute()
const artist = ref([])


onMounted(() => {
    const id = route.params.id
    artist.value = findartist(id)
})
</script>
<template>
    <main class="main-container">
        <div class="artist-container">
            <section class="section-container">
                <div class="background-img-container">
                    <img :src="artist.img">
                    <div class="overlay"></div>
                </div>
                <div class="description">
                    <img :src="artist.img" alt="" srcset="" id="artist-photo">
                    <h1 id="theartist">{{ artist.artist }}</h1>
                    <h1>Sobre o Artista</h1>
                    <p>{{ artist.detail }}</p>
                    <button id="see-more-btn">ver mais...</button>
                </div>
            </section>
            <section>
                <div class="songs-container">
                    <h1>discografia</h1>
                    <h2>musicas</h2>
                    <div class="discography-container">
                        <div class="songs-card-container">
                            <div v-for="songs in artistsongs" :key="songs.id" class="songs-card">
                                <div class="famous-cover-description">
                                    <img :src="songs.capa" id="capa" />
                                    <p>{{ songs.top }}</p>
                                </div>
                                <div class="artist-song-description">
                                    <p>{{ songs.nome }}</p>
                                    <p>artista: {{ songs.artista }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="albuns-container">
                            <h1>albuns</h1>
                            <div class="albuns-card-container">
                            <div v-for="albuns in artistalbuns" :key="albuns.id" class="albuns-card">
                                <img :src="albuns.capa">
                                <h1>{{ albuns.nome }}</h1>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>
<style scoped>
.main-container {
    background-color: black;
    width: 100%;
    height: 100vh;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.artist-container {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgb(30, 30, 30);
    gap: 100px;
    border-radius: 20px;
}

.section-container {
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 20px;
}

.background-img-container {
    width: 100%;
    height: 100%;
}

.discography-container {
    display: flex;
    width: 100%;
    gap: 100px;
}

.background-img-container img {
    width: 100%;
    height: 100%;
    right: 0;
    left: 0;
    position: absolute;
    z-index: 1;
    border-radius: 20px;
}

.overlay {
    background: linear-gradient(180deg, rgba(0, 212, 255, 1) 0%, rgba(9, 9, 121, 0) 0%, rgba(0, 0, 0, 1) 70%);
    z-index: 2;
    position: absolute;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.description {
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: white;
    height: 100%;
    margin-bottom: 20px;

    & p {
        text-align: justify;
        font-size: 15px;
        padding: 20px;
    }
}

.songs-container {
    height: 100%;
    color: white;
}

.songs-card-container {
    height: 500px;
    width: 350px;
    position: relative;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.songs-card-container::-webkit-scrollbar {
    background-color: rgb(20, 20, 20);
    width: 12px;
}

.songs-card-container::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.584);
    border-radius: 20px;
}

.songs-card {
    display: flex;
    align-items: center;
    gap: 20px;
}

#see-more-btn {
    width: 150px;
    background-color: blueviolet;
    color: white;
    padding: 5px;
    border-radius: 10px;
    font-size: 17.5px;
    border: none;
}

#theartist {
    font-size: 35px;
}

#artist-photo {
    width: 250px;
    height: 200px;
}

.artist-song-description {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.famous-cover-description {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 20px;
}

.famous-cover-description img {
    width: 60px;
    height: 60px;
}
.albuns-container{
    background-color: rgb(78, 78, 78);
    padding: 20px;
    border-radius: 20px;
    width: 300px;
    & h1{
        text-align: center;
    }
    
}
.albuns-card-container{
    display: flex;
    flex-direction: column;
    height: 400px;
    gap: 20px;
    overflow: auto;
}
.albuns-card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.albuns-card img{
    width: 200px;
    height: 200px;
}
</style>