<template>
    <li class="breed-item" v-if="breed">
        <img class="image-breed" :src="breed.image.url" alt="">
        <span class="name-breed">{{ position+1 }}. {{ breed.name }}</span>
        <p class="description">{{ breed.description }}</p>
    </li>
</template>

<script>

export default {
    name: 'PopularBreedItem',
    props: ['breed', 'position'],
    setup() {
        return {}
    }
}
</script>

<style>
li.breed-item {
    display: grid;
    grid-template-columns: .25fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
        "img name"
        "img description";
}

.breed-item img {
    grid-area: img;
    border-radius: 24px;
    width: 170px;
    height: 170px;
    object-fit: cover;
    place-self: center;
}

.name-breed {
    grid-area: name;
    font: 600 2.25rem 'Montserrat', sans-serif;
    color: #291507;
}

.description {
    grid-area: description;
    font: 500 1.25rem 'Montserrat', sans-serif;
    color: #291507;
}</style>