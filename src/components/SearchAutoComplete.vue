<template>
    <div class="autocomplete" ref="root">
        <input type="text" placeholder="Search 🔍" v-model="search" @input="onChange" />
        <ul class="autocomplete-results" v-show="isOpen && !isResultEmpty">
            <li class="autocomplete-result" v-for="(result, i) in results" :key="i" @click="setResult(result)">
                {{ result.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'SearchAutoComplete',
    props: ['breeds'],
    setup(props) {

        const router = useRouter()

        const root = ref(null)

        const search  = ref('')
        const results = ref([])
        const isOpen  = ref(false)
        const isResultEmpty = computed(() => results.value.length === 0)

        const onChange = () => {
            filterResults();
            isOpen.value = true;
        }

        const setResult = (result) => {
            console.log(result);
            search.value = result.name;
            isOpen.value = false;
            router.push({ name: 'Breed', params: { breed_id: result.id } })
        }

        const filterResults = () => {
            results.value = props.breeds.filter(({ name }) => name.toLowerCase().indexOf(search.value.toLowerCase()) > -1);
        }

        const handleClickOutside = (event) => {
            if (!root.value.contains(event.target)) {
                isOpen.value = false;
            }
        }

        onMounted(() => {
            // the DOM element will be assigned to the ref after initial render
            // console.log(root.value) // this is your $el
            document.addEventListener('click', handleClickOutside);
        })

        onBeforeUnmount(() => {
            document.removeEventListener('click', handleClickOutside);
        })

        return {
            root,
            search,
            onChange,
            isOpen,
            results,
            setResult,
            isResultEmpty
        }
    }
}
</script>

<style>
.autocomplete {
    width: 25%;
    position: relative;
}

.autocomplete input {
    width: 100%;
    border-radius: 24px;
    outline: none;
    border: none;
    padding: .5rem 1rem;
    font: 500 1.125rem 'Montserrat', sans-serif;
}

.autocomplete-results {
    border-radius: 24px;
    background-color: #FFFFFF;
    padding: 8px;
    margin: 10px 0 0 0;
    border: 1px solid #eeeeee;
    height: 120px;
    min-height: 1em;
    max-height: 6em;
    overflow: auto;
    font: 500 1.125rem 'Montserrat', sans-serif;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
}

.autocomplete-result:hover {
    background-color: #9797971A;
}
</style>