<template>
    <div class="breed-page">
        <template v-if="breed">
            <div class="wrapper-img">
                <div class="first"></div>
                <img :src="breed.images[0]" alt="" srcset="">
            </div>
            <div class="description-column">
                <span class="breed-name">{{ breed.info.name }}</span>
                <p class="description">{{ breed.info.description }}</p>

                <ul class="characteristics-list">
                    <CharacteriscItem :type="'normal'" :label="'temperament'" :content="breed.info['temperament']" />
                    <CharacteriscItem :type="'normal'" :label="'origin'" :content="breed.info['origin']" />
                    <CharacteriscItem :type="'normal'" :label="'life span'" :content="`${breed.info['life_span']} years`" />
                    <CharacteriscItem :type="'pointed'" :label="'adaptability'" :content="breed.info['adaptability']" />
                    <CharacteriscItem :type="'pointed'" :label="'child friendly'" :content="breed.info['child_friendly']" />

                    <CharacteriscItem :type="'pointed'" :label="'grooming'" :content="breed.info['grooming']" />
                    <CharacteriscItem :type="'pointed'" :label="'intelligence'" :content="breed.info['intelligence']" />
                    <CharacteriscItem :type="'pointed'" :label="'health issues'" :content="breed.info['health_issues']" />
                    <CharacteriscItem :type="'pointed'" :label="'child friendly'" :content="breed.info['child_friendly']" />
                    <CharacteriscItem :type="'pointed'" :label="'social needs'" :content="breed.info['social_needs']" />
                    <CharacteriscItem :type="'pointed'" :label="'stranger friendly'"
                        :content="breed.info['stranger_friendly']" />
                </ul>
            </div>

            <div class="photos">
                <span class="title">Other photos</span>

                <ul class="grid-photos-list">
                    <li class="photo-item" v-for="(breedImage, indexImage) in breed.images" :key="indexImage">
                        <img :src="breedImage" alt="breed image">
                    </li>
                </ul>
            </div>
        </template>
        <template v-else>
            <span class="loading">Loading breed...</span>
        </template>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, computed, onBeforeMount } from 'vue'
import CharacteriscItem from '../components/CharacteristicItem.vue'

export default {
    components: {
        CharacteriscItem
    },
    setup() {
        const route = useRoute()
        const breed = ref(null)


        onBeforeMount(async () => {
            await getBreed();
        })

        const getBreed = async () => {
            const { params: { breed_id } } = route
            const resp = await fetch(`http://127.0.0.1:8000/api/breed/${breed_id}`)
            const { breed: info, images } = await resp.json();
            console.log({ info, images });

            await fetch(`http://127.0.0.1:8000/api/breed/update/${breed_id}`, {
                method: 'PUT',
            })

            breed.value = { info, images }
        }

        return {
            breed
        }
    }
}
</script>

<style>
.breed-page {
    display: grid;
    grid-template-columns: .5fr .5fr;
    grid-template-rows: repeat(3, auto);
    grid-template-areas:
        "image description"
        ".     description"
        "grid-photos grid-photos"
    ;
    gap: 5vh 0;
}

.wrapper-img {
    width: 70%;
    height: min-content;
    position: relative;
    display: grid;
}

.wrapper-img .first {
    position: absolute;
    left: -3%;
    height: 75%;
    width: 20%;
    background-color: #DEC68B;
    border-radius: 14px;
    place-self: center;
}


.wrapper-img img {
    position: relative;
    width: 100%;
    border-radius: 24px;
}


.description-column {
    display: flex;
    flex-direction: column;
    gap: 2vh 0;
}

.breed-name {
    font: 600 2.25rem 'Montserrat', sans-serif;
    color: #291507;
}

p.description {
    font: 500 1.25rem 'Montserrat', sans-serif;
    color: #291507;
}




ul.characteristics-list {
    display: flex;
    flex-direction: column;
    gap: 2vh 0;
}

.characteristic-item.has-points {
    /* width: 80%; */
    display: grid;
    grid-template-columns: .5fr 1fr;
    align-items: center;
}

.has-points strong {
    white-space: nowrap;
}

.points {
    width: 100%;
    height: 12px;
    display: flex;
    gap: 8px;
}

.point {
    width: 60px;
    height: 10px;
    background-color: #E0E0E0;
    border-radius: 8px;
}

.marked {
    background-color: #544439;
}

.photos {
    grid-area: grid-photos;
}

.photos .title {
    font: 600 2.25rem 'Montserrat', sans-serif;
    color: #291507;
}

ul.grid-photos-list {
    margin-top: 5vh;
    display: grid;
    grid-template-columns: repeat(auto-fill, 278px);
    grid-auto-rows: auto;
    justify-content: space-between;
    gap: 5vh 0;
}


li.photo-item img {
    width: 100%;
    height: 278px;
    border-radius: 24px;
    object-fit: cover;
}
</style>