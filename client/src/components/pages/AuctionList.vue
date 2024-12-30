<script setup>
import { ref, onMounted } from 'vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AuctionCard from "@/components/AuctionCard.vue";
import HowItWorks from "@/components/HowItWorks.vue";

const isLoading = ref(false);
const errorMessage = ref('');
const auctions = ref([]);

const fetchAuctions = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await fetch('https://project-assignment-2-27638-27628-27643-3dd5.onrender.com/auth/auctions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar leilões');
    }

    const data = await response.json();
    console.log('Leilões recebidos:', data.auctions);
    auctions.value = data.auctions || [];
  } catch (error) {
    errorMessage.value = error.message || 'Erro desconhecido';
  } finally {
    isLoading.value = false;
  }
};


onMounted(() => {
  fetchAuctions();
});
</script>

<template>
  <Header></Header>
  <div class="contents">
    <div class="banner animate__animated animate__fadeInDown">
      <img src="../../assets/auction-banner.jpg"/>
      <div class="shadow"></div>
      <h1>Os nossos leilões</h1>
    </div>

    <div v-if="isLoading" class="loading-indicator">Carregando...</div>

    <div class="auctions animate__animated animate__fadeInUp" v-if="!isLoading && auctions.length > 0">
      <auction-card v-for="auction in auctions" :key="auction._id" :auction="auction"/>
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <HowItWorks></HowItWorks>
  </div>
  <Footer></Footer>
</template>

<style scoped>
.loading-indicator {
  font-size: 24px;
  text-align: center;
  margin-top: 50px;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 50px;
}

.contents {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
}

.contents .banner {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
}

.contents .banner img {
  width: 100%;
  height: auto;
  max-height: 30vh;
  object-fit: cover;
}

.contents .banner .shadow {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgb(0, 0, 0, 0.5);
  pointer-events: none;
}

.contents .banner h1 {
  position: absolute;
  bottom: 64px;
  color: white;
  font-size: 50px;
  height: 78px;
  text-align: center;
}

.contents .auctions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
  margin-top: 64px;
  width: 80%;
}

@media (max-width: 640px) {
  .contents .banner h1 {
    font-size: 32px;
    width: 95%;
    height: auto;
  }
}

@media (max-width: 400px) {
  .contents .banner h1 {
    bottom: 24px;
  }
}

@media (max-width: 1090px) {
  .contents .auctions {
    width: 95%;
  }

  .contents .auctions {
    grid-template-columns: 2fr 2fr;
  }
}
</style>
