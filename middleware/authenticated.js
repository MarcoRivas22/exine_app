//Si el usuario no tiene toke lo envio a login

export default function ({ store, redirect }) {
  store.dispatch("readToken");

  if (!store.state.auth) {
    return redirect("/login");
  }
}
