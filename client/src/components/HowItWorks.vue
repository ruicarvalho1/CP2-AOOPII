<template>
  <div class="how-works" v-if="profile?.user.auth.role === 'user'">
      <h1>Como funciona?</h1>
    <div class="steps">
      <div class="step">
        <img src="./icons/online-store.svg" alt="">
        <p>Encontre o seu artigo favorito na nossa página</p>
      </div>
      <div class="step">
        <img src="./icons/online-shopping.svg" alt="">
        <p>Licite para continuar no topo do leilão</p>
      </div>
      <div class="step">
        <img src="./icons/auction-hammer.svg" alt="">
        <p>Após vencer o leilão, comunicaremos consigo para assentar a compra do seu produto</p>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {ref, onMounted} from 'vue';
  import api from './axios.js';
  import {useRouter} from 'vue-router';

  const router = useRouter();
  const profile = ref(null);
  const isError = ref(false);
  const errorMessage = ref('');


  const getProfile = async () => {
  try {
  const response = await api.get('auth/profile', {withCredentials: true});
  profile.value = response.data;
} catch (error) {
  isError.value = true;


  errorMessage.value = error.response?.data?.message || 'Erro ao carregar o perfil.';


  console.error(error);
}
};

  onMounted(() => {
  getProfile();
});
</script>

<style scoped>
.how-works {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 64px 0;
}

.how-works h1 {
  font-size: 50px;
}

.how-works .steps {
  display: flex;
  justify-content: space-evenly;
  align-items: start;
  width: 100%;
  margin-top: 32px;
}

.how-works .steps .step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
}

.how-works .steps .step img {
  width: 200px;
  height: 200px;
}

.how-works .steps .step p {
  margin-top: 10px;
    text-align: center;
  }
  
  @media (max-width: 840px) {
    .how-works {
      padding: 0 16px;
    }

    .how-works .steps {
      flex-direction: column;
      align-items: center;
      justify-content: start;
      gap: 10px;
    }

    .how-works h1 {
      font-size: 40px;
    }

    .how-works .steps .step {
      width: 100%;
    }
  }
</style>