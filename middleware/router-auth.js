export default function({ store, redirect, route }) {
  store.state.user != null && route.name === "index" ? redirect("/admin") : "";
  store.state.user == null && route.name === "admin" ? redirect("/") : "";
}
