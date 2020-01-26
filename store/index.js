import Vuex from "vuex";
import { auth } from "@/plugins/firebase.js";

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload;
      }
    },
    actions: {
      createUserWithEmailAndPassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
          auth
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
              commit("setUser", user);
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      },

      loginWithEmailAndPassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
          auth
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
              commit("setUser", user);
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      },

      logout({ commit }) {
        auth
          .signOut()
          .then(() => {})
          .catch(err => console.log(error));
      }
    }
  });
};

export default createStore;
