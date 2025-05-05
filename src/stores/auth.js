import auth from "@/api/endpoints/auth";
import router from "@/router";
import { defineStore } from "pinia";


export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: null,
        isAuthenticated: false,
    }),
    actions: {
        async login(email, password) {
            try {
                let credentials = {
                    email: email,
                    password: password,
                };
                const response = await auth.login(credentials)

                //Guardamos el token en el localStorage
                //Guardamos el usuario en el localStorage
                this.user = response.data.user;
                this.token = response.data.token;
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", response.data.user)

                //router.push("/");
            } catch (error) {
                console.error(error);
            }
        },
        async logout() {
            try {
                let credentials = {
                    token: localStorage.getItem("token"),
                };
                //Llamamos a la API para cerrar sesión
                const response = await auth.logout(credentials)
            } catch (error) {
                console.error(error);
            } finally {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                this.user = null;
                this.token = null;
                router.push("/login");
            }
        },

        async register(name, correo, password) {
            try {
                let credentials = {
                    name: name,
                    correo: correo,
                    password: password,
                };
                //Llamamos a la API para registrar un nuevo usuario
                const response = await auth.register(credentials)
                if(response.status === 201) {
                    //Si el registro es exitoso, redirigimos al usuario a la página de inicio de sesión
                    router.push("/login");
                }else{
                    //Si el registro no es exitoso, mostramos un error
                    console.error("No se pudo registrar el usuario");
                }
            } catch (error) {
                console.error(error);
            }
        },

        initialize() {
            //Verificamos si hay un token en el localStorage
            if (localStorage.getItem("token")) {
                //Si hay un token, lo guardamos en el estado
                this.token = localStorage.getItem("token");
                this.user = localStorage.getItem("user");
                //Verificamos si el token es válido
                if (this.token) {
                    //Si el token es válido, lo guardamos en el estado
                    this.isAuthenticated = true;
                }
            }
        }
    },
}); 
