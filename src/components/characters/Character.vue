<script setup lang="ts">
import type { Character } from '@/@types/models/characters';

defineProps<{
    character: Character
}>()

</script>

<template>
    <h1>{{ character.name }}</h1>

    <p>Ano: {{ character.birth_year }}</p>
    <p>Cor dos olhos: {{ character.eye_color }}</p>
    <p>Genero: {{ character.gender }}</p>

    <p v-for="film in character.films">
        {{film}}
    </p>
</template>

<style scoped>
.charactersList {
    list-style: none;
    padding: 0;
    margin-top: 8px;

    width: 100%;
    max-height: 300px;

    overflow-y: scroll;

    gap: 0;
}

.characterContainer {
    margin: 0;
}

.name {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;

    background-color: var(--vt-c-black-soft);

    padding: 8px;

    text-align: center;

    width: 100%;

    cursor: pointer
}

.name:hover {
    background-color: var(--selection);
}

.characterContainer+.characterContainer {
    margin-top: 8px;
}
</style>
