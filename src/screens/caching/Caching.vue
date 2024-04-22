<script async setup lang="ts">

import Spinner from "../../components/forms/spinner/Spinner.vue";
import { onMounted } from "vue";
import { apiStarWars, limit } from "../../infra/axios/api";
import type { Character } from '@/@types/models/characters';
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const characters = JSON.parse(localStorage.getItem('characters') ?? '[]')

  if (characters.length) return router.push({ path: 'dashboard' })
  recursiveGetRequests();
})


const recursiveGetRequests = async (page = 1, characters: Character[] = []): Promise<void> => {
  try {
    const response = await getData(page);

    characters.push(...response);

    if (characters.length % limit === 0) {
      localStorage.setItem('characters', JSON.stringify(characters));
      return recursiveGetRequests(page + 1, characters);
    }

    router.push({ path: '/dashboard' });
  } catch (error) {
    alert('Ocorreu um erro ao buscar os personagens!')
    console.log(error)
  }
};

const getData = async (page = 1) => {
  try {

    const { data } = await apiStarWars.get(`people`, {
      params: {
        page,
      }
    });

    return data.results
  } catch (error: any) {
    throw new Error(error)
  }
}

</script>

<template>
  <header>
    <img alt="Vue logo" src="../../assets/images/star-wars-logo.png" />
  </header>

  <container>
    <Spinner />
    <p>Carregando</p>
  </container>
</template>

<style scoped>
header {
  width: 100%;

  display: flex;
  justify-content: center;

  margin-bottom: 2rem;
}

container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 48px;
}
</style>
