<script setup lang="ts">

</script>

<template>
    <div class="spinner"></div>
</template>

<style scoped>
.spinner {
    width: 24px;
    height: 24px;

    border-radius: 50%;
    border: 4px solid var(--selection);
    border-top-color: #333;

    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
