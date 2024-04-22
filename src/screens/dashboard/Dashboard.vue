<script setup lang="ts">

import { reactive, ref } from "vue";
import TextInput from "@/components/forms/inputs/TextInput.vue";
import { apiStarWars, limit } from "@/infra/axios/api";
import type { Character as TypeCharacter } from "@/@types/models/characters";
import CharactersList from "@/components/characters/list/CharactersList.vue";
import Character from "@/components/characters/Character.vue";
import Spinner from "@/components/forms/spinner/Spinner.vue";

const search = ref(""),
  isLoading = ref(false),
  page = ref(1),
  characters = reactive<TypeCharacter[]>([]);

let characterSelect = reactive<TypeCharacter>({} as TypeCharacter);

const onChangeSearch = (async (event: Event) => {
  try {
    const searchFor = (event.target as HTMLInputElement).value;

    search.value = searchFor;
    page.value = 1;
    const result = await getCharacters(searchFor, 1)

    addCharacter(result)
  } catch (error) {
    alert(`Erro ao buscar por personagens ${error}`)
  }
})

const getCharacters = (async (search?: string, page = 1) => {
  try {
    isLoading.value = true;

    const { data } = await apiStarWars.get(`people`, {
      params: {
        search,
        page,
      }
    });

    return data.results
  } catch (error) {
    alert(`Erro ao buscar por personagens ${error}`)
  } finally {
    isLoading.value = false;
  }
})

const onReachEnd = async () => {
  page.value += 1;

  if ((characters.length % limit) !== 0) return;

  const newcharacters = await getCharacters(search.value, page.value);
  addCharacter(newcharacters);
}

const addCharacter = (newCharacters: TypeCharacter[]) => {
  page.value == 1 ? characters.splice(0, characters.length, ...newCharacters) : characters.push(...newCharacters);
}

const clearSearch = () => {
  search.value = ""
  page.value = 1;
  characters.splice(0, characters.length)
}

const selectCharacter = (character: TypeCharacter) => {
  characterSelect = character;
  clearSearch();
}

</script>

<template>
  <header>
    <img alt="Vue logo" src="@/assets/images/star-wars-logo.png" />
  </header>

  <container>
    <TextInput placeholder="Pesquisar personagem" :onChange="onChangeSearch" />

    <section class="filterSection">

      <div v-if="!!search" class="filteredBy">
        <p>Filtrado por: {{ search }}</p>
      </div>

      <button v-if="!!search || !!characters.length" class="clearSection" :onClick="clearSearch">
        <p>{{ characters.length }} resultado(s)</p>
        <img alt="Vue logo" class="logo" src="@/assets/close.svg" width="24" height="24" />
      </button>

      <div class="loadingContainer">
        <Spinner v-if="isLoading" />
      </div>
    </section>

    <CharactersList :characters="characters" :onSelectCharacter="selectCharacter" :onReachEnd="onReachEnd" />

    <Character :character="characterSelect" v-if="!!characterSelect.name"/>

  </container>
</template>

<style scoped>
header {
  width: 100%;

  display: flex;
  justify-content: center;

  margin-bottom: 2rem;
}

.filterSection {
  width: 100%;

  margin: 8px 0;

  display: flex;
  align-items: center;

  gap: 8px;

}

.clearSection {
  height: 2.5rem;

  background-color: var(--vt-c-black-soft);
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 8px;

  padding: 0 4px 0 8px;

  border-radius: 4px;
  border: 1px solid var(--vt-c-danger);

  color: var(--vt-c-danger);

  cursor: pointer;
}

.filteredBy {
  height: 2.5rem;

  background-color: var(--vt-c-black-soft);
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 18px;

  border-radius: 999px;

}

.loadingContainer {
  height: 24px;

  margin-left: auto;
}
</style>
