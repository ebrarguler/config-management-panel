<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const email = ref('');
const password = ref('');
const router = useRouter();

async function handleSignIn() {
    try {
        const response = await axios.post('http://localhost:3003/api/auth/signin', {
            email: email.value,
            password: password.value
        });
        
        localStorage.setItem("authToken", response.data.idToken);
        console.log(localStorage.getItem("authToken"));
        router.push('/');
    } catch (error) {
        console.error("Sign-in failed:", error);
    }
}
</script>

<template>
    <div class="login-container">
        <div class="login-content">
            <img src="../assets/icon.png" alt="Logo" class="logo" />
            <h2>Please sign in</h2>
            <form @submit.prevent="handleSignIn">
                <div class="input-container">
                    <input type="text" v-model="email" placeholder="E-mail address" required />
                </div>
                <div class="input-container">
                    <input type="password" v-model="password" placeholder="Password" required />
                </div>
                <button type="submit" class="signin-btn">Sign in</button>
            </form>
        </div>
        <footer>
            Codeway © 2024
        </footer>
    </div>
</template>

<style scoped>
/* General Layout */
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1e1e2f;
    color: #bfc0c0;
    font-family: Arial, sans-serif;
}
.login-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 400px;
    width: 100%;
}
.logo {
    width: 100px;
    margin-bottom: 20px;
}
h2 {
    color: #bfc0c0;
    margin-bottom: 20px;
    font-size: 1.2rem;
}

/* Input Fields */
.input-container {
    width: 100%;
    margin-bottom: 20px;
}
input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    background-color: transparent;
    border: 1px solid #555;
    border-radius: 8px;
    color: #bfc0c0;
    font-size: 1rem;
}
input[type="text"]::placeholder,
input[type="password"]::placeholder {
    color: #888;
}

/* Button Styles */
.signin-btn {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background: linear-gradient(90deg, #4e54c8, #8f94fb);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
}
.signin-btn:hover {
    background: linear-gradient(90deg, #6b6ee1, #a1a6fb);
}

/* Footer */
footer {
    margin-top: 20px;
    color: #666;
    font-size: 0.875rem;
}
</style>
