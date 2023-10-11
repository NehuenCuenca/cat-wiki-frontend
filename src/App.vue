<template>
  <header>
        <div class="logo">
            <h1>CatWiki</h1>
            <i>🐈</i>
        </div>

        <!-- <RouterLink :to="{ name: 'Home' }">To the Home Page</RouterLink> -->
        <!-- <RouterLink :to="{ name: 'Breed', params: { breed: 'nameOrId' }}"> To the Breed page </RouterLink> |  -->
        <!-- <RouterLink :to="{ name: 'TopMostSearchedBreeds' }"> To the TopMostSearchedBreeds page </RouterLink> |  -->
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
        <div class="logo">
            <h1>CatWiki</h1>
            <i>🐈</i>
        </div>
        <div class="created-by">
            <i>©</i>
            <span>created by Nehuen - devChallenge.io 2023</span>
        </div>
    </footer>
</template>

<script>

export default {
  setup () {
  }
}
</script>

<style>
header,
main,
footer {
    padding: 0 5vw;
}

header {
    display: flex;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1.5rem;
    color: #291507;
}

.logo h1 {
    font: 400 1.5rem 'Mystery Quest', cursive;
    margin: 0;
}

/* main {} */


footer {
    margin-top: 5vh;
    width: 90%;
    place-self: stretch center;
    color: white;
    background-color: #000000;
    padding: 2vh 4vw;
    border-radius: 24px 24px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

footer .logo {
    color: white;
}

.created-by {
    font: 400 1.125rem 'Montserrat', sans-serif;
}

@media (max-width: 375px) {
    footer {
        flex-wrap: wrap;
        gap: 4vh 0;
    }

    footer .logo h1 {
        font-size: 14px;
    }

    .created-by {
        font: 400 12px 'Montserrat', sans-serif;
    }
}
</style>