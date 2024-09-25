<script setup lang="ts">
const { loggedIn, user } = useUserSession()

</script>

<template>
  <div class="flex flex-col gap-2 items-center justify-center">
    <p v-if="loggedIn">
      Welcome {{ user }}
    </p>
    <p v-else>
      Please log in
    </p>
  </div>
</template>