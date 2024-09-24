<script setup lang="ts">

const { loggedIn, clear, fetch } = useUserSession()
const loginFailed = ref(false)

const username = ref<string | undefined>()
const password = ref<string | undefined>()
const loginDialog = ref()

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
      <button
        type="button"
        class="flex justify-center items-center h-6 text-sm rounded-sm text-center font-medium px-5 border-1 border-solid border-zinc-500 bg-white w-full text-zinc-600"
        @click="logout()"
      >
        <Icon name="game-icons:padlock-open" class="size-4 text-zinc-600" />
        <span>
          Logout
        </span>
      </button>
    </template>
    <template v-else>
        <div class="w-full flex flex-col gap-4">
          <dialog ref="loginDialog">
            <form method="dialog" class="flex flex-col gap2 m-6">
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
                class="flex justify-center items-center h-6 text-sm rounded-sm text-center font-medium px-5 border-1 border-solid border-zinc-500 bg-white w-full text-zinc-600"
                @click="login()"
              >
                <Icon name="game-icons:padlock" class="size-4 text-zinc-600" />
                <span>
                  Login
                </span>
              </button>
              <p v-if="loginFailed" class="text-red">
                Login Failed
              </p>
            </form>
          </dialog>
          <button
            type="button"
            class="flex justify-center items-center h-6 text-sm rounded-sm text-center font-medium px-5 border-1 border-solid border-zinc-500 bg-white w-full text-zinc-600"
            @click="loginDialog.showModal(); loginFailed = false;"
          >
            <Icon name="game-icons:padlock" class="size-4 text-zinc-600" />
            <span>
              Login
            </span>
          </button>
        </div>
    </template>
  </div>
</template>