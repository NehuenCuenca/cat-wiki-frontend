<template>
    <div class="most-searched-breeds-page">
        <template v-if="popularBreeds.length > 0">
            <span class="title">Top {{ popularBreeds.length }} most searched breeds</span>
            <ul class="most-searched-breeds-list">
                <PopularBreedItem v-for="(breed, breedIndex) in popularBreeds" :key="breedIndex" :breed="breed"
                    :position="breedIndex" />
            </ul>
        </template>
        <template v-else>
            <span class="loading">Loading breeds...</span>
        </template>
    </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import PopularBreedItem from '../components/PopularBreedItem.vue'

export default {
    components: {
        PopularBreedItem
    },
    setup() {

        const popularBreeds = ref([])

        const getMostPopularBreeds = async () => {
            const resp = await fetch(`http://127.0.0.1:8000/api/breeds/most-popular`)
            const data = await resp.json()

            const breeds = data.breeds
            const allPromises = Promise.all(breeds.map((breed) => fetch(`http://127.0.0.1:8000/api/breed/${breed.api_id}`)))

            const responses = await allPromises;
            const parsedResponses = await Promise.all(responses.map(async (response) => {
                const data = await response.json();
                return { info: data.breed, images: data.images };
            }));

            popularBreeds.value = [...parsedResponses]
        }

        onBeforeMount(async () => {
            await getMostPopularBreeds()
        })

        return {
            popularBreeds
        }
    }
}
</script>

<style>
.most-searched-breeds-page {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3vh 0;
}

.title {
    font: 700 2.25rem 'Montserrat', sans-serif;
    color: #291507;
}

ul.most-searched-breeds-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3vh 0;
}
</style>