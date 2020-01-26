<template>
  <div>
    <section>
      <form
        ref="form"
        @submit.prevent="authenticate"
        class="max-w-sm mx-auto mt-20 bg-gray-100 p-8 shadow-xl"
      >
        <header class="">
          <h2 class="font-semibold text-2xl">Login</h2>
        </header>

        <input
          v-model="email"
          class="mt-8 bg-transparent focus:outline-none focus:border-gray-500 border-b border-gray-300 py-2 block w-full appearance-none leading-normal"
          type="email"
          placeholder="user"
          autocomplete="off"
          @focus="error = ''"
        />
        <input
          v-model="password"
          class="mt-8 bg-transparent focus:outline-none focus:border-gray-500 border-b border-gray-300 py-2 block w-full appearance-none leading-normal"
          type="password"
          placeholder="password"
          autocomplete="off"
          @focus="error = ''"
        />
        <input
          v-model="repeatedPassword"
          v-if="!isLogin"
          class="mt-8 bg-transparent focus:outline-none focus:border-gray-500 border-b border-gray-300 py-2 block w-full appearance-none leading-normal"
          type="password"
          placeholder="repeat password"
          autocomplete="off"
          @focus="error = ''"
        />
        <button
          class="mt-8 bg-blue-500 text-white px-8 py-2 block w-full"
          v-text="!isLogin ? 'Register' : 'Login'"
        />
        <p class="mt-8 text-gray-500 text-center">
          <span
            v-text="
              !isLogin ? 'Already got an account?' : 'Doesnt have an account?'
            "
          ></span>
          <span
            @click="isLogin = !isLogin"
            v-text="!isLogin ? 'Login' : 'Register'"
            class="underline"
          ></span>
        </p>
        <p class="mt-8 text-sm text-red-500 text-center">{{ error }}</p>
      </form>
    </section>
  </div>
</template>

<script>
import { auth } from "@/plugins/firebase.js";

export default {
  asyncData() {
    return {
      isLogin: true,
      email: "",
      password: "",
      repeatedPassword: "",
      error: ""
    };
  },
  methods: {
    authenticate() {
      this.isLogin ? this.login() : this.register();
    },

    register() {
      if (this.password === this.repeatedPassword) {
        this.dispatchAuthenticateToStore("createUserWithEmailAndPassword");
      } else {
        this.error = "Passwords are not equal";
      }
    },

    login() {
      this.dispatchAuthenticateToStore("loginWithEmailAndPassword");
    },

    dispatchAuthenticateToStore(method) {
      this.$store
        .dispatch(method, {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$refs.form.reset();
        })
        .catch(e => {
          this.error = e.message;
        });
    }
  },

  created() {
    auth.onAuthStateChanged(user => {
      this.$store.commit("setUser", user);

      if (this.$store.state.user) {
        this.$router.push("/admin");
      } else {
        this.$router.push("/");
      }
    });
  }
};
</script>

<style></style>
