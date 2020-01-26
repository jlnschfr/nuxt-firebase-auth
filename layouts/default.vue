<template>
  <div>
    <header class="flex justify-between items-center bg-gray-100 shadow-lg p-8">
      <h1 class="text-xl font-semibold">Nuxt Firebase Authentication</h1>
      <nav v-if="user" class="flex items-center">
        <p class="text-gray-500 mr-3">logged in as {{ user.email }}</p>
        <button
          @click.prevent="logout"
          class="bg-blue-500 text-white px-8 py-2"
        >
          Logout
        </button>
      </nav>
    </header>
    <nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {})
        .catch(e => {
          console.log(e.message);
        });
    }
  }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
