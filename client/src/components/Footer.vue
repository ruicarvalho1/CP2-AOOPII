<template>
  <footer class="footer">
    <div class="line"></div>
    <div class="container">
      <router-link to="/" class="logo">
        <a href="">
          <img src="../assets/logo.svg" alt="logo">
          <h1>Lux Auctions</h1>
        </a>
      </router-link>
      <div class="infos">
        <router-link to="/auctions" v-if="profile?.user.auth.role === 'user'">
          <h3>Leilões</h3>
        </router-link>
        <router-link to="/about-us">
          <h3>Sobre nós</h3>
        </router-link>
      </div>
    </div>
  </footer>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import api from './axios.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const profile = ref(null);
const isError = ref(false);
const errorMessage = ref('');



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

onMounted(() => {
  getProfile();
});
</script>


<style scoped>
  footer {
    display: flex;
    background: black;
    position: relative;
    align-items: center;
    padding: 2vw;
    width: 100%;
    height: fit-content;
    top: 0;
    left: 0;
    z-index: 998;
  }

  footer .line {
    position: absolute;
    top: -4px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #745811, #F5B81F, #BC973A, #C99A23, #BC973A, #745811);
  }

  footer .container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  footer .container .logo a {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  footer .container .logo img {
    object-fit: contain;
    width: auto;
    height: 48px;
  }

  footer .container .logo h1 {
    color: white;
    transition: all 0.3s ease;
    font-size: 26px;
  }

  footer .container .infos {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2vw;
  }

  footer .container .infos h3 {
    color: white;
    transition: all 0.3s ease;
  }

  footer .container .infos a:hover h3,
  footer .container .logo a:hover h1{
    cursor: pointer;
    color: #d3ac07;
  }

  @media (max-width: 640px) {

    footer {
      padding: 4vw;
    }

    footer .container .logo h1 {
      display: none;
    }
  }

  @media (max-width: 991.98px) {
    footer .container .infos {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8vw;
    }
  }
</style>
<script setup lang="ts">
</script>