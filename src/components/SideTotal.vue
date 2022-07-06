<script setup lang="ts">
import { computed, defineProps } from 'vue'

defineProps<{
  total: number
}>()

//const  = computed(():number => {

//})

</script>

<template>
  <div class="greetings">
    <h1 v-if="total > 0" class="green">IDR {{ total.toLocaleString() }}</h1>
    <h1 v-else class="green">Total you paid will shown in here.</h1>
    <h3>
      This form is to calculate how much you pay if you want to bidding in <a href="https://www.facebook.com/gamerousity" target="blank" rel="noopener">Gamerousity</a>
    </h3>
  </div>
</template>

<style scoped>
.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
