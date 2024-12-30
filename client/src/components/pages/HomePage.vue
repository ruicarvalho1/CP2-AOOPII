<script setup>
import { ref, onMounted } from "vue";
import AuctionCard from "@/components/AuctionCard.vue";
import HowItWorks from "@/components/HowItWorks.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import "animate.css";
import api from '../axios.js';
import { useRouter } from 'vue-router';


const profile = ref(null);
const isError = ref(false);



const auctions = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");

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


const getProfile = async () => {
  try {
    const response = await api.get('auth/profile', { withCredentials: true });
    profile.value = response.data;
  } catch (error) {
    isError.value = true;


    errorMessage.value = error.response?.data?.message || 'Erro ao carregar o perfil.';


    console.error(error);
  }
};




const router = useRouter();

const goToAuctions = () => {
  router.push('/auctions');
};

onMounted(() => {
  fetchAuctions();
  getProfile();
});
</script>

<template>
  <Header></Header>
  <div class="contents" >
    <video class="presentation animate__animated animate__fadeInDown" autoplay muted>
      <source src="../../assets/apresentacao.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div class="top-auctions animate__animated animate__fadeInUp" v-if="profile?.user.auth.role === 'user'">
      <h1>Mais populares:</h1>
      <div class="auctions animate__animated animate__fadeInUp" v-if="!isLoading && auctions.length > 3">
        <auction-card v-for="auction in auctions.slice(0,4)" :key="auction._id" :auction="auction"/>
      </div>
      <div v-else-if="isLoading" class="loading">
        <p>A carregar...</p>
      </div>
      <div v-else>
        <p>Nenhum leilão disponível.</p>
      </div>
      <div class="see-all">
        <button class="see-all-btn" @click="goToAuctions">Ver mais leilões</button>
      </div>
    </div>

    <HowItWorks></HowItWorks>
  </div>
  <Footer></Footer>
</template>

<style scoped>
.contents {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
}

.contents .presentation {
  width: 100%;
  height: auto;
  max-height: calc(100vh - 64px - 4vw);
  object-fit: cover;
}

.contents .top-auctions {
  margin-top: 32px;
  width: 80%;
}

.contents .top-auctions .auctions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
  margin-top: 10px;
}

.contents .top-auctions .see-all {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 32px;
}

.contents .top-auctions .see-all .see-all-btn {
  width: 80%;
  max-width: 300px;
  height: 48px;
  background: black;
  color: white;
  border: none;
  font-size: 28px;
  box-shadow: 2px 2px 8px rgba(232, 170, 29, 0.2);
  transition: all 0.3s ease;
}

.contents .top-auctions .see-all .see-all-btn:hover {
  cursor: pointer;
  color: #d3ac07;
  scale: 1.02;
}

@media (max-width: 1090px) {
  .contents .top-auctions {
    width: 95%;
  }

  .contents .top-auctions .auctions {
    grid-template-columns: 2fr 2fr;
  }
}

@media (max-width: 550px) {
  .contents .presentation {
    height: 300px;
  }
}
</style>
