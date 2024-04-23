<script async setup lang="ts">

import { onMounted, reactive, ref } from "vue";
import { apiStarWars, limit } from "./infra/axios/api";
import type { Character as CharacterType } from '@/@types/models/characters';
import CharactersList from "./components/characters/list/CharactersList.vue";
import TextInput from "./components/forms/inputs/TextInput.vue";
import Character from "./components/characters/Character.vue";
import Spinner from "./components/forms/spinner/Spinner.vue";

const isLoading = ref(false),
  page = ref(1),
  search = ref(""),
  characterSelected = ref<CharacterType>({} as CharacterType),
  allCharacters = reactive<CharacterType[]>([]),
  charactersToShow = reactive<CharacterType[]>([]);

onMounted(() => {
  const characters = JSON.parse(localStorage.getItem('characters') ?? '[]')

  allCharacters.push(...characters);
  setCharactersToShow(characters)

  if (!characters.length) recursiveGetRequests();
})

const recursiveGetRequests = async (page = 1, characters: CharacterType[] = []): Promise<void> => {
  try {
    isLoading.value = true;
    const response = await getData(page);

    characters.push(...response);

    if (characters.length % limit === 0) {
      return recursiveGetRequests(page + 1, characters);
    } else {
      localStorage.setItem('characters', JSON.stringify(characters));

      allCharacters.push(...characters)
      setCharactersToShow(characters)

      isLoading.value = false
    }
  } catch (error) {
    alert('Ocorreu um erro ao buscar os personagens!')
  }
};

const onReachEnd = async () => {
  page.value += 1;

  if ((charactersToShow.length % limit) !== 0) return;

  const result = await getData(page.value, search.value);
  setCharactersToShow(result, page.value)
}

const onChangeSearch = (async (event: Event) => {
  try {
    const searchFor = (event.target as HTMLInputElement).value;

    search.value = searchFor;
    page.value = 1;

    if (!searchFor) {
      setCharactersToShow(allCharacters, 1)
      return;
    }

    const result = await getData(page.value, searchFor)
    setCharactersToShow(result, page.value)

  } catch (error) {
    alert(`Erro ao buscar por personagens ${error}`)
  }
})

const getData = async (page = 1, search = "") => {
  try {
    const { data } = await apiStarWars.get(`people`, {
      params: {
        page,
        search
      }
    });

    return data.results
  } catch (error: any) {
    throw new Error(error)
  }
}

const setCharactersToShow = (newCharacters: CharacterType[], page = 1) => {
  page === 1 ? charactersToShow.splice(0, charactersToShow.length, ...newCharacters) : charactersToShow.push(...newCharacters);
}

const handleSelectCharacter = async (character: CharacterType) => {
  try {
    if (characterSelected.value.name === character.name) return;

    const { films: filmsRequestURLS } = character;

    const films: string[] = await Promise.all(filmsRequestURLS.map(async (f) => {

      if (!f) return 'Filme não encontrado';

      const res = await getFilm(f);
      return res.title;
    }))

    characterSelected.value = character;
    characterSelected.value.films = films;

  } catch (error) {
    alert('Erro ao buscar personagem')
  }
}

const getFilm = async (baseurl: string) => {
  const { data } = await apiStarWars({
    method: 'GET',
    baseURL: baseurl
  })

  return data
}

</script>

<template>
  <header>
    <img alt="Star wars logo" src="./assets/images/star-wars-logo.png" />
  </header>

  <container class="loading" v-if="isLoading">
    <Spinner />
    <p>Carregando</p>
  </container>

  <container>
    <TextInput placeholder="Pesquisar personagem" :onChange="onChangeSearch" />

    <p> Total: {{ charactersToShow.length }}</p>
    <CharactersList :characters="charactersToShow" :onReachEnd="onReachEnd" :onSelectCharacter="handleSelectCharacter" />

    <Character v-if="characterSelected?.name" :character="characterSelected" />
  </container>
</template>

<style scoped>
header {
  width: 100%;

  display: flex;
  justify-content: center;

  margin-bottom: 2rem;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 48px;
}
</style>
