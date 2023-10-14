<template>
    <div class="home-page">
        <div class="entrance-search">
            <img src="../assets/HeroImagemd.png" alt="Image" />
            <div class="overlapping">
                <div class="logo">
                    <h1>CatWiki</h1>
                    <i>🐈</i>
                </div>
                <span class="sub-tile">Get to know more about your cat breed</span>
                <SearchAutoComplete :breeds="breeds" />
            </div>
        </div>

        <div class="most-searched-breeds">
            <span class="name-section">Most Searched Breeds</span>
            <span class="breeds-to-discover">
                66+ Breeds For you to discover
            </span>
            <RouterLink :to="{ name: 'TopMostSearchedBreeds' }">See more ➡</RouterLink>
            <ul class="four-random-breeds">
                <li class="random-breed" v-for="(rndBreed, indexRnd) in randomBreeds" :key="indexRnd">
                    <figure>
                        <div class="wrapper">
                            <div class="first" v-if="indexRnd === 0"></div>
                            <img :src="rndBreed.image.url" alt="image of {{rndBreed.name}}" srcset="">
                        </div>
                        <figcaption>
                            <RouterLink :to="{ name: 'Breed', params: { breed_id: rndBreed.id } }">{{rndBreed.name}}</RouterLink>
                        </figcaption>
                    </figure>
                </li>
            </ul>
        </div>

        <div class="reason-to-have-a-cat">
            <div class="reason">
                <span class="question">Why should you have a cat?</span>
                <p>Having a cat around you can actually trigger the release of calming chemicals in your body which lower
                    your stress and anxiety leves</p>
                <a target="_blank" href="https://www.helpguide.org/articles/healthy-living/joys-of-owning-a-cat.htm#:~:text=Owning%20a%20cat%20can%20bring,and%20improve%20your%20heart%20health.">READ MORE ➡</a>
            </div>
            <div class="grid-of-cats">
                <img class="grid-item-cat" src="../assets/image 1.png">
                <img class="grid-item-cat" src="../assets/image 2.png">
                <img class="grid-item-cat" src="../assets/image 3.png">
            </div>
        </div>
    </div>
</template>
  
<script>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import SearchAutoComplete from '../components/SearchAutoComplete.vue'

export default {
    components: {
    SearchAutoComplete,
    RouterLink
},
    setup() {

        const breeds = ref([]);
        const randomBreeds = ref([]);

        onMounted(async() => {
            await getBreeds();
            await getRandomBreeds();
        })

        const getBreeds = async () => { 
            const resp = await fetch('http://127.0.0.1:8000/api/breeds')   
            const data = await resp.json();
            
            breeds.value = [...data.breeds]
        }
        const getRandomBreeds = async () => { 
            const resp = await fetch('http://127.0.0.1:8000/api/breeds/random/4')   
            const data = await resp.json();

            randomBreeds.value = [...data.breeds]
        }

        return {
            breeds,
            randomBreeds
        }
    }
}
</script>
  
<style>
.entrance-search {
    position: relative;
    background-image: url(../assets/HeroImagemd.png);
    background-repeat: no-repeat;
    border-radius: 24px 24px 0 0;
}

.entrance-search img {
    width: 100%;
    visibility: hidden;
    position: relative;
}

.overlapping {
    position: absolute;
    z-index: 9;
    top: 20%;
    padding: 0 4vw;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4vh 0;
}

.overlapping .logo {
    font-size: 4rem;
    gap: 15px;
}

.overlapping .logo h1 {
    color: #FFFFFF;
    font: 400 4rem 'Mystery Quest', cursive;
}

.overlapping .sub-tile {
    width: 30%;
    color: #FFFFFF;
    font: 500 1.5rem 'Montserrat', sans-serif;
}


.most-searched-breeds {
    /* min-height: 70vh; */
    background-color: #E3E1DC;
    border-radius: 0 0 24px 24px;
    padding: 6vh 4vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, auto);
    grid-template-areas:
        "name-section name-section"
        "breeds-to-discover link"
        "breeds-list breeds-list"
    ;
    gap: 3vh 0;
}

.name-section {
    grid-area: name-section;
    font: 500 1.125rem 'Montserrat', sans-serif;
    color: #291507;
    text-decoration-line: underline;
    text-decoration-thickness: 2px;
    text-decoration-color: #291507;
    text-underline-offset: 3px;
}

.breeds-to-discover {
    grid-area: breeds-to-discover;
    font: 700 3rem 'Montserrat', sans-serif;
    color: #291507;
}

.most-searched-breeds a {
    grid-area: link;
    place-self: center end;
    font: 700 1.125rem 'Montserrat', sans-serif;
    text-transform: uppercase;
    color: #29150799;
}

ul.four-random-breeds {
    grid-area: breeds-list;
    display: flex;
    justify-content: space-between;
}

li.random-breed {
    width: 20%;
}

li.random-breed:first-child .wrapper {
    position: relative;
    display: grid;
}

.random-breed .first {
    position: absolute;
    left: -5%;
    height: 75%;
    width: 20%;
    background-color: #DEC68B;
    border-radius: 14px;
    place-self: center;
}

.random-breed figure {
    display: flex;
    flex-direction: column;
    gap: 2vh 0;
}

figure img {
    position: relative;
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 24px;
}

.random-breed figure figcaption > *{
    font: 600 1.125rem 'Montserrat', sans-serif;
    color: #291507;
}

.reason-to-have-a-cat {
    padding: 6vh 4vw;
    display: grid;
    grid-template-columns: .5fr .5fr;
    grid-template-rows: auto;
    gap: 0 2vw;
}

.reason {
    display: flex;
    flex-direction: column;
    gap: 4vh 0;
}

.question {
    font: 700 3rem 'Montserrat', sans-serif;
    color: #291507;
}

.reason p {
    font: 500 1.125rem 'Montserrat', sans-serif;
    color: #291507;
}

.reason a {
    font: 700 1.125rem 'Montserrat', sans-serif;
    color: #29150799;
}

.grid-of-cats {
    display: grid;
    grid-template-columns: .5fr .5fr;
    grid-template-rows: auto auto;
    grid-template-areas:
        "two three"
        "one three";
    gap: 4vh 2vw;
    place-items: start end;
}

.grid-item-cat {
    width: 100%;
}

.grid-item-cat:nth-child(1) {
    grid-area: one;
    width: 80%;
}

.grid-item-cat:nth-child(2) {
    grid-area: two;
}

.grid-item-cat:nth-child(3) {
    grid-area: three;
}


@media (max-width: 375px) {

    .entrance-search {
        background-image: url(../assets/HeroImagesm.png);
        background-size: cover;
    }

    .overlapping {
        gap: 2vh 0;
    }

    .overlapping .logo {
        font-size: 14px;
    }

    .overlapping .logo i {
        display: none;
    }

    .overlapping .logo h1 {
        font: 400 14px 'Mystery Quest', cursive;
    }

    .overlapping .sub-tile {
        width: 45%;
        color: #FFFFFF;
        font: 500 10px 'Montserrat', sans-serif;
    }

    .autocomplete {
        width: 100%;
    }

    .autocomplete input {
        font: 500 12px 'Montserrat', sans-serif;
    }


    .most-searched-breeds {
        grid-template-columns: 1fr 1fr;
    }

    .name-section {
        font: 500 12px 'Montserrat', sans-serif;
    }

    .breeds-to-discover {
        font: 700 1.125rem 'Montserrat', sans-serif;
    }

    .most-searched-breeds a {
        display: none;
    }

    ul.four-random-breeds {
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 3vh 0;
    }

    li.random-breed {
        width: 45%;
    }

    .random-breed figure {
        gap: 1vh 0;
    }

    figure figcaption {
        font: 600 12px 'Montserrat', sans-serif;
    }

    .reason-to-have-a-cat {
        grid-template-columns: 1fr;
        gap: 5vh 2vw;
        padding: 6vh 0;
    }

    .reason {
        display: flex;
        flex-direction: column;
        gap: 4vh 0;
    }

    .question {
        font: 700 2.5rem 'Montserrat', sans-serif;
    }

    .reason p {
        font: 500 1.125rem 'Montserrat', sans-serif;
    }

    .reason a {
        font: 700 12px 'Montserrat', sans-serif;
    }

    .grid-of-cats {
        gap: 2vh 4vw;
    }
}
</style>