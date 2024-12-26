<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { onMounted, ref } from "vue";
import api from "@/components/axios.js";
import AuctionHistoryElement from "@/components/AuctionHistoryElement.vue";


const editInfo = ref(true);
const profileImg = ref("");
const firstName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const creditCard = ref("");


const profile = ref(null);
const isError = ref(false);
const errorMessage = ref("");


const toggleEdit = () => {
  if (!editInfo.value) {
    // Reset input values to current profile data
    profileImg.value = profile.value?.user.image_profile || "";
    firstName.value = profile.value?.user.first_name || "";
    lastName.value = profile.value?.user.last_name || "";
    username.value = profile.value?.user.username || "";
    email.value = profile.value?.user.email || "";
    creditCard.value = profile.value?.user.credit_card || "";
  }
  editInfo.value = !editInfo.value;
};



const getProfile = async () => {
  try {
    const response = await api.get("auth/profile", { withCredentials: true });
    profile.value = response.data;


    profileImg.value = profile.value?.user.image_profile || "";
    firstName.value = profile.value?.user.first_name || "";
    lastName.value = profile.value?.user.last_name || "";
    username.value = profile.value?.user.username || "";
    email.value = profile.value?.user.email || "";
    creditCard.value = profile.value?.user.credit_card || "";
  } catch (error) {
    isError.value = true;
    errorMessage.value = error.response?.data?.message || "Erro no perfil.";
  }
};

const updateProfile = async () => {
  const userData = {
    image_profile: profileImg.value,
    first_name: firstName.value,
    last_name: lastName.value,
    username: username.value,
    email: email.value,
    credit_card: creditCard.value,
  };

  try {
    const response = await api.put("auth/profile", userData, {
      withCredentials: true,
    });


    profile.value = response.data;


    editInfo.value = true;
    console.log("Perfil atualizado:", response.data);
  } catch (error) {
    console.error(
        "Erro ao atualizar perfil:",
        error.response ? error.response.data : error.message
    );
  }
};

onMounted(() => {
  getProfile();
});
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
          <img :src="profile?.user.image_profile" alt="">
        </div>
        <div v-show="!editInfo" class="input-section">
          <h3>Imagem:</h3>
          <input v-model="profileImg" class="register-input" type="text" placeholder="Url da nova imagem de perfil">
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
          <div :class="{ 'raise-error-email': raise-error-email }" class="error">
            <h5>Email inválido</h5>
          </div>
        </div>

        <div class="input-section">
          <h3>Cartão de crédito:</h3>
          <input v-model="creditCard" :disabled="editInfo" class="register-input" type="text" :placeholder="editInfo? `${profile?.user.credit_card}` : 'Novo nome'">
          <div :class="{ 'raise-error-credit-card': creditCardError }" class="error">
            <h5>Cartão de crédito inválido</h5>
          </div>
        </div>
      <button @click="toggleEdit" id="edit-info-btn-mobile">{{ editInfo ? 'Editar' : 'Cancelar' }}</button>
      </div>
    </div>
    <button @click="updateProfile" id="save-info-btn" :class="editInfo ? 'hide' : 'show'">Guardar</button>
    <div class="auction-history-section">
      <h2>Histórico</h2>
      <div class="history">
        <AuctionHistoryElement></AuctionHistoryElement>
        <AuctionHistoryElement></AuctionHistoryElement>
        <AuctionHistoryElement></AuctionHistoryElement>
        <AuctionHistoryElement></AuctionHistoryElement>
        <AuctionHistoryElement></AuctionHistoryElement>
        <AuctionHistoryElement></AuctionHistoryElement>
        <AuctionHistoryElement></AuctionHistoryElement>
        <AuctionHistoryElement></AuctionHistoryElement>
      </div>
    </div>
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
  #edit-info-btn-mobile,
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
  #edit-info-btn-mobile:hover,
  .account-contents #save-info-btn:hover {
    cursor: pointer;
    color: #d3ac07;
    scale: 1.02;
  }

  #save-info-btn.show {
    display: flex;
  }

  #save-info-btn.hide, #edit-info-btn-mobile {
    display: none;
  }

  .account-contents .banner h1 {
    color: white;
    padding: 2vw;
  }

  .account-contents .profile {
    display: flex;
    gap: 32px;
    width: 80%;
  }

  .account-contents .profile .profile-img {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    aspect-ratio: 1 / 1;
  }

  .account-contents .profile .profile-img img {
    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: calc(100% - 8px);
    max-height: calc(100% - 8px);
    object-fit: cover;
    z-index: 2;
  }

  .account-contents .profile .profile-img .border {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1 / 1;
    background: linear-gradient(90deg, #745811, #F5B81F, #BC973A, #C99A23, #BC973A, #745811);
    box-shadow: 2px 2px 8px rgba(236, 170, 18, 0.37);
  }

  .account-contents .profile .profile-info {
    width: 100%;
  }

  .account-contents .profile .profile-info h2 {
    margin-bottom: 10px;
  }

  .account-contents .profile .profile-info .input-section:first-child {
    margin-top: 32px;
  }

  .account-contents .profile .profile-info .input-section:has(input:disabled) {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 48px;
    color: black;
    padding: 16px 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    margin-bottom: 20px;
    border: 2px solid black;
    font-weight: 600;
    background: white;
    box-shadow: 2px 2px 8px rgba(236, 170, 18, 0.37);
  }

  .account-contents .profile .profile-info .input-section h3 {
    text-wrap: nowrap;
  }

  .account-contents .profile .profile-info .input-section,
  .account-contents .profile .profile-info .input-section input {
    width: 100%;
  }

  .account-contents .profile .profile-info .input-section input,
  .account-contents .profile .profile-img input {
    height: 48px;
    color: black;
    padding: 16px 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    margin-bottom: 10px;
    border: 2px solid black;
    font-weight: 600;
    background: white;
    width: 100%;
  }

  .account-contents .profile .profile-info .input-section input:disabled {
    height: 48px;
    color: black;
    padding: 16px 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    margin-bottom: 0;
    border: none;
    font-weight: 600;
    background: transparent;
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

  .auction-history-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 32px 0;
  }

  .auction-history-section .history {
    width: 100%;
    border-top: 2px solid black;
  }

  .auction-history-section h2 {
    margin-bottom: 10px;
  }

  @media (max-width: 950px) {
    .account-contents .profile {
      flex-direction: column;
    }
  }

  @media (max-width: 550px) {
    .account-contents .profile .profile-info {
      display: flex;
      flex-direction: column;
    }

    #edit-info-btn-mobile,
    .account-contents #save-info-btn {
      align-self: center;
    }

    .account-contents #edit-info-btn {
      display: none;
    }

    #edit-info-btn-mobile {
      display: flex;
      margin-bottom: 0;
    }

    .account-contents .profile {
      margin-top: 5%;
    }

    .account-contents .profile,
    .auction-history-section {
      width: 95%;
    }

  }
</style>