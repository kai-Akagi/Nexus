const BASE_URL = 'http://localhost:8080/PostsAPI/api';

class AuthService {
    static async login(email, password) {
        const resp = await fetch(`${BASE_URL}/auth/login`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })

        });

        const data = await resp.json()

        if (!resp.ok) throw new Error("Error al iniciar sesión");

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({email}));
            window.dispatchEvent(new CustomEvent('auth-change'))
        }


        return data;

    }

    static async register(name, email, password) {
        const resp = await fetch(`${BASE_URL}/auth/register`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })

        });

        const data = await resp.json()

        if (!resp.ok) throw new Error(data.message || "Error al registrar al usuario");

        return data;

    }

    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.dispatchEvent(new CustomEvent('auth-change'))
    }

    static isAuthenticate() {
        return !!localStorage.getItem('token');
    }

    static getToken(){
        return localStorage.getItem('token');
        
    }

    static getUser(){
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null

    }



}

export default AuthService;