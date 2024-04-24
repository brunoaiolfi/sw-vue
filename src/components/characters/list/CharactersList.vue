<script setup lang="ts">
import type { ICharacterToShow } from '@/@types/models/characters';

defineProps<{
    characters: ICharacterToShow[]
    onSelectCharacter: (character: ICharacterToShow) => void
    onReachEnd: () => void;
}>()

</script>

<template>
    <ul @scrollend="onReachEnd" class="charactersList">
        <li class="characterContainer"  v-for="character in characters" :key="character.name">
            <h2 class="name" :onclick="() => onSelectCharacter({...character})"> {{ character.name }} </h2>
        </li>
    </ul>
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
