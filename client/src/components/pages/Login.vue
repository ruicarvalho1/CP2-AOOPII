<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Definindo as variáveis reativas
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const isError = ref(false);  // Controla se deve exibir a mensagem de erro

// Usando o Vue Router para navegação
const router = useRouter();

// Função para lidar com o login
const handleLogin = async () => {
  if (!username.value || !password.value) {
    isError.value = true;
    errorMessage.value = 'Por favor, preencha ambos os campos.';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      router.push('/profile');
    } else {
      isError.value = true;
      errorMessage.value = data.message || 'Falha ao iniciar sessão.';
    }
  } catch (error) {
    console.error('Erro no login:', error);
    isError.value = true;
    errorMessage.value = 'Erro ao realizar login, tente novamente.';
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-form">
      <div class="form">
        <h1>Iniciar sessão</h1>
        <div class="username">
          <h3>Nome de utilizador:</h3>
          <input
              v-model="username"
              class="login-input"
              type="text"
              placeholder="Nome utilizador"
          />
        </div>
        <div class="password">
          <h3>Palavra-passe:</h3>
          <input
              v-model="password"
              class="login-input"
              type="password"
              placeholder="●●●●●●●●"
          />
        </div>

        <!-- Exibe a mensagem de erro se isError for verdadeiro -->
        <div v-if="isError" class="error">
          <h5>{{ errorMessage }}</h5>
        </div>

        <!-- Botão de Login -->
        <button @click="handleLogin" class="login-btn">Iniciar sessão</button>
      </div>

      <h4>Não tem conta? <router-link to="/register" class="register-btn">Registar</router-link></h4>
    </div>

    <div class="presentation">
      <video class="presentation-vid animate__animated animate__fadeInRight" autoplay muted loop>
        <source src="../../assets/login.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para a página de login */
.login-page {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  overflow: clip;
  position: relative;
}

.login-page .login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  position: relative;
}

.login-page .login-form h4 {
  position: absolute;
  bottom: -20%;
}

.login-page .login-form .login-btn {
  width: 100%;
  height: 48px;
  background: black;
  color: white;
  border: none;
  font-size: 28px;
  box-shadow: 2px 2px 8px rgba(232, 170, 29, 0.2);
  transition: all 0.3s ease;
  margin-top: 22px;
}

.login-page .login-form .login-btn:hover {
  cursor: pointer;
  color: #d3ac07;
  scale: 1.02;
}

.login-page .login-form .form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  box-shadow: 2px 2px 8px rgba(236, 170, 18, 0.37);
  padding: 32px;
  background: white;
  border: 2px solid black;
}

.login-page .login-form .form .username {
  margin-top: 32px;
}

.login-page .login-form .form .username,
.login-page .login-form .form .password,
.login-page .login-form .form .username input,
.login-page .login-form .form .password input {
  width: 100%;
}

.login-page .login-form .form .username input,
.login-page .login-form .form .password input {
  height: 48px;
  color: black;
  padding: 16px 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  margin-bottom: 10px;
  border: 2px solid black;
  font-weight: 600;
}

.login-page .login-form .form h3 {
  margin-bottom: 4px;
}

.login-page .presentation {
  width: 50%;
  height: 100%;
}

.login-page .presentation .presentation-vid {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  object-fit: cover;
}

/* Estilo para o erro */
.login-page .login-form .error {
  display: flex;
  padding: 8px;
  background: rgba(255, 0, 0, 0.27);
}

.register-btn {
  text-decoration: underline;
  transition: all 0.3s ease;
}

.register-btn:hover {
  color: #d3ac07;
}

@media (max-width: 991.98px) {
  .login-page .login-form {
    width: 100%;
  }

  .login-page .login-form h4, .register-btn {
    color: white;
  }

  .login-page .presentation {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
</style>
