import firebase from "firebase";
import config from "./FirebaseConfig";

/** Firebase Class: Instancia el servidor de Firebase Client y contiene los métodos
 * para el manejo del inicio de sesión y el estado en localStorage.
 *
 */
class Firebase {
  constructor() {
    // bloque try-catch para instanciar firebase
    try {
      // si no existe la instancia, la crea.
      if (firebase.apps.length == 0) firebase.initializeApp(config);
      this.auth = firebase.auth();
    } catch (error) {
      console.log(error);
    }
  }

  // logea al usuario
  async login(email, password) {
    try {
      return await this.auth
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          return {
            user: { displayName: result.user.displayName, uid: result.user.uid }
          };
        })
        .catch(error => {
          let message = "";
          // genera un mensaje de error basado en el código de error de firebase auth.
          // https://firebase.google.com/docs/reference/js/firebase.auth.Auth?hl=es-419#signInWithEmailAndPassword
          switch (error.code) {
            case "operation-not-allowed":
              message =
                "El servidor no admite el tipo de sesión. Contacte a soporte.";
              break;
            case "auth/user-disabled":
              message = "El usuario ha sido deshabilitado.";
              break;
            case "auth/user-not-found":
              message = "Usuario o contraseña incorrecta. Intente de nuevo.";
              break;
            case "auth/wrong-password":
              message = "Usuario o contraseña incorrecta. Intente de nuevo.";
              break;
            default:
              message =
                "Error no manejado: " + error.code + ". Contacte a soporte.";
              break;
          }

          return { user: null, error: message };
        });
    } catch (error) {
      console.log(error);
      return { user: null, error: "Algo ha fallado. Contacte a soporte." };
    }
  }

  // desloguea al usuario
  logout() {
    return this.auth.signOut();
  }

  // revisa la sesión de storage por las credenciales
  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
  // Verifica si hay un usuario logeado.
  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}

export default new Firebase();
