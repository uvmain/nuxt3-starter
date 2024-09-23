<script setup lang="ts">
const { loggedIn, clear, fetch, user } = useUserSession()
const loginFailed = ref(false)
const username = ref<string | undefined>()
const password = ref<string | undefined>()

async function login() {
  loginFailed.value = false
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        username: username.value,
        password: password.value
      }
    })
    fetch()
  }
  catch(error) {
    console.warn(error)
    loginFailed.value = true
  }
}

function logout() {
  clear()
}

onMounted(() => {
  fetch()
})
</script>

<template>
  <div class="flex items-center justify-center">
    <template v-if="loggedIn">
      <div>
        <p>
          Hi {{ user }}, you are logged in
        </p>
        <button
            type="button"
            class="flex justify-center items-center h-12 text-xl rounded-lg text-center font-medium px-5 border-1 border-solid border-zinc-500 bg-white w-full text-zinc-600"
            @click="logout()"
          >
            <Icon name="uil:padlock" class="size-6 text-zinc-600" />
            Logout
          </button>
      </div>
    </template>
    <template v-else>
      <div>
        <p>
          Hi guest, please login:
        </p>
        <div class="w-50 flex flex-col gap-4">
          <input
            id="username"
            v-model="username"
            placeholder="username"
            type="text"
            class="focus:placeholder-op-0 text-dark border-1 border-solid border-zinc-500 bg-white outline-none rounded-sm"
          >
          <input
            id="password"
            v-model="password"
            placeholder="password"
            type="text"
            class="focus:placeholder-op-0 text-dark border-1 border-solid border-zinc-500 bg-white outline-none rounded-sm"
            @keyup.enter="login()"
          >
          <button
            type="button"
            class="flex justify-center items-center h-12 text-xl rounded-lg text-center font-medium px-5 border-1 border-solid border-zinc-500 bg-white w-full text-zinc-600"
            @click="login()"
          >
            <Icon name="uil:padlock" class="size-6 text-zinc-600" />
            Login
          </button>
          <p v-if="loginFailed" class="text-red">
            Login Failed
          </p>
        </div>
      </div>
    </template>
  </div>
</template>