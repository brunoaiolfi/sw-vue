<script setup lang="ts">

import type { TextInputProps } from '../../../@types/components/textInput';

defineProps<TextInputProps>()

</script>

<template>
    <input @change="onChange" @submit="onChange" class="input"/>
</template>

<style scoped>
.input {
    width: 100%;
    height: 48px;
    padding: 10px;

    border-radius: 5px;
    border-bottom: 1px solid #ccc;
    border-width: 0px 0px 1px 0px;
    
    background-color: var(--color-background-soft);
    
    color: var(--vt-c-text-dark-2)
}
</style>
