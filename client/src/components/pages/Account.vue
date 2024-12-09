<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { ref } from 'vue';

// Reactive variable to control disabled state
const editInfo = ref(true);

// Function to toggle edit mode
const toggleEdit = () => {
  editInfo.value = !editInfo.value;
};
</script>

<template>
  <Header></Header>

  <div class="account-contents">
    <div class="fake-header">
      <div class="line-effect"></div>
    </div>
    <button @click="toggleEdit" id="edit-info-btn">{{ editInfo ? 'Editar' : 'Cancelar' }}</button>
    <div class="profile">
      <div class="profile-img">
        <div class="border">
          <img src="../../assets/profile.jpg_large" alt="">
        </div>
      </div>
      <div class="profile-info">
        <h2>Informações Pessoais</h2>

        <div class="input-section">
          <h3>Nome:</h3>
          <input v-model="firstName" :disabled="editInfo" class="register-input" type="text" :placeholder="editInfo? `${profile?.user.first_name}` : 'Novo nome'">
          <div :class="{ 'raise-error-name': firstNameError }" class="error">
            <h5>Nome inválido</h5>
          </div>
        </div>


        <div class="input-section">
          <h3>Apelido:</h3>
          <input v-model="lastName" :disabled="editInfo" class="register-input" type="text" :placeholder="editInfo? `${profile?.user.last_name}` : 'Novo nome'">
          <div :class="{ 'raise-error-name': lastNameError }" class="error">
            <h5>Apelido inválido</h5>
          </div>
        </div>


        <div class="input-section">
          <h3>Nome de utilizador:</h3>
          <input v-model="username" :disabled="editInfo" class="register-input" type="text" :placeholder="editInfo? `${profile?.user.username}` : 'Novo nome utilizador'">
          <div :class="{ 'raise-error-user': usernameError }" class="error">
            <h5>Nome de utilizador inválido</h5>
          </div>
        </div>

        <!-- Email -->
        <div class="input-section">
          <h3>Email:</h3>
          <input v-model="email" :disabled="editInfo" class="register-input" type="email" :placeholder="editInfo? `${profile?.user.email}` : 'Novo email'">
          <div :class="{ 'raise-error-email': email }" class="error">
            <h5>Email inválido</h5>
          </div>
        </div>

        <div class="input-section">
          <h3>Cartão de crédito:</h3>
          <input v-model="creditCard" :disabled="editInfo" class="register-input" type="text" :placeholder="editInfo? `${profile?.user.credit}` : 'Novo nome'">
          <div :class="{ 'raise-error-credit-card': creditCardError }" class="error">
            <h5>Cartão de crédito inválido</h5>
          </div>
        </div>
      </div>
    </div>
    <button @click="toggleEdit" id="save-info-btn" :class="editInfo? 'hide' : 'show'">Guardar</button>
  </div>

  <Footer></Footer>
</template>

<style scoped>
  .account-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100vw;
  }

  .account-contents .fake-header {
    display: flex;
    align-items: end;
    justify-content: center;
    width: 100%;
    height: calc(64px + 4vw);
    background: black;
    position: relative;
  }

  .account-contents .fake-header .line-effect {
    position: fixed;
    top: calc(64px + 4vw);
    background: linear-gradient(90deg, #745811, #F5B81F, #BC973A, #C99A23, #BC973A, #745811);
    height: 4px;
    width: 100%;
  }

  .account-contents #edit-info-btn,
  .account-contents #save-info-btn {
    display: flex;
    align-self: end;
    align-items: center;
    justify-content: center;
    margin: 32px;
    width: 240px;
    height: 48px;
    background: black;
    color: white;
    border: none;
    font-size: 28px;
    box-shadow: 2px 2px 8px rgba(232, 170, 29, 0.2);
    transition: all 0.3s ease;
  }

  .account-contents #edit-info-btn:hover,
  .account-contents #save-info-btn:hover {
    cursor: pointer;
    color: #d3ac07;
    scale: 1.02;
  }

  #save-info-btn.show {
    display: flex;
  }

  #save-info-btn.hide {
    display: none;
  }

  .account-contents .banner h1 {
    color: white;
    padding: 2vw;
  }

  .account-contents .profile {
    display: flex;
    width: 80%;
  }

  .account-contents .profile .profile-img {
    width: 50%;
  }

  .account-contents .profile .profile-img img {
    width: 400px;
    height: 400px;
    object-fit: cover;
    z-index: 2;
  }

  .account-contents .profile .profile-img .border {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 408px;
    height: 408px;
    background: linear-gradient(90deg, #745811, #F5B81F, #BC973A, #C99A23, #BC973A, #745811);
    box-shadow: 2px 2px 8px rgba(236, 170, 18, 0.37);
  }

  .account-contents .profile .profile-info h2 {
    margin-bottom: 10px;
  }

  .account-contents .profile .profile-info .input-section:first-child {
    margin-top: 32px;
  }

  .account-contents .profile .profile-info .input-section,
  .account-contents .profile .profile-info .input-section input {
    width: 100%;
  }

  .account-contents .profile .profile-info .input-section input {
    height: 48px;
    color: black;
    padding: 16px 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    margin-bottom: 10px;
    border: 2px solid black;
    font-weight: 600;
  }

  .account-contents .profile .profile-info .input-section input:disabled {
    height: 48px;
    color: black;
    padding: 16px 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    margin-bottom: 10px;
    border: none;
    font-weight: 600;
  }

  .account-contents .profile .profile-info .error {
    display: none;
    padding: 8px;
    background: rgba(255, 0, 0, 0.27);
  }

  .account-contents .profile .profile-info .raise-error-name.error,
  .account-contents .profile .profile-info .raise-error-user.error,
  .account-contents .profile .profile-info .raise-error-email.error,
  .account-contents .profile .profile-info .raise-error-credit-card.error {
    display: flex;
  }

  .account-contents .profile .profile-info .input-section input:disabled {
    color: black;
    padding: 0;
  }

  .account-contents .profile .profile-info .input-section input:disabled::placeholder {
    color: black;
  }

</style>