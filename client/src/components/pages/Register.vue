<script setup>
import { ref } from 'vue';

const validate_register = () => {
  //VALIDACAO DE register RETORNA TRUE OU FALSE PARA A CLASSE SER APLICADA NO ELEMENTO DE ERRO
  ref(false);
};
</script>

<template>
  <div class="register-page">
    <div class="register-form">
      <div class="form">
        <h1>Criar conta</h1>
        <div class="name">
          <h3>Nome:</h3>
          <input class="register-input" type="text" placeholder="O seu nome">
          <div :class="{ 'raise-error-name': validate_register}" class="error">
            <h5>Nome inválido</h5>
          </div>
        </div>
        <div class="username">
          <h3>Nome de utilizador:</h3>
          <input class="register-input" type="text" placeholder="Nome utilizador">
          <div :class="{ 'raise-error-user': validate_register}" class="error">
            <h5>Nome de utilizador inválido</h5>
          </div>
        </div>
        <div class="password">
          <h3>Palavra-passe:</h3>
          <input class="register-input" type="password" placeholder="●●●●●●●●">
          <div :class="{ 'raise-error-pass': validate_register}" class="error">
            <h5>Palavra passe deve ter pelo menos 8 caracteres</h5>
          </div>
        </div>
        <button class="register-btn">Criar conta</button>
      </div>
      <h4>Já tem conta? <router-link to="/login" class="login-btn">Iniciar sessão</router-link></h4>
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
.register-page {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  overflow: clip;
  position: relative;
}

.register-page .register-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  position: relative;
}

.register-page .register-form h4 {
  position: absolute;
  bottom: -10%;
}

.register-page .register-form .register-btn {
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

.register-page .register-form .register-btn:hover {
  cursor: pointer;
  color: #d3ac07;
  scale: 1.02;
}

.register-page .register-form .form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  box-shadow: 2px 2px 8px rgba(236, 170, 18, 0.37);
  padding: 32px;
  background: white;
  border: 2px solid black;
}

.register-page .register-form .form .name {
  margin-top: 32px;
}

.register-page .register-form .form .name,
.register-page .register-form .form .username,
.register-page .register-form .form .password,
.register-page .register-form .form .name input,
.register-page .register-form .form .username input,
.register-page .register-form .form .password input
{
  width: 100%;
}

.register-page .register-form .form .name input,
.register-page .register-form .form .username input,
.register-page .register-form .form .password input {
  height: 48px;
  color: black;
  padding: 16px 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  margin-bottom: 10px;
  border: 2px solid black;
  font-weight: 600;
}

.register-page .register-form .form h3 {
  margin-bottom: 4px;
}

.register-page .presentation {
  width: 50%;
  height: 100%;
}

.register-page .presentation .presentation-vid {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  object-fit: cover;
}

.register-page .register-form .error {
  display: none;
  padding: 8px;
  background: rgba(255, 0, 0, 0.27);
}

.register-page .register-form .raise-error-name.error,
.register-page .register-form .raise-error-user.error,
.register-page .register-form .raise-error-pass.error {
  display: flex;
}

.login-btn {
  text-decoration: underline;
  transition: all 0.3s ease;
}

.login-btn:hover {
  color: #d3ac07;
}

@media (max-width: 991.98px) {
  .register-page .register-form {
    width: 100%;
  }

  .register-page .register-form h4, .login-btn {
    color: white;
  }

  .register-page .presentation {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
</style>