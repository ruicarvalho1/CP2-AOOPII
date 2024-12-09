<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  // Reactive variable to track the scroll state
  const isScrolled = ref(false);
  const isHovered = ref(false);

  // Function to handle the scroll event
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
  };

  // Functions to handle hover and click for the popout
  const showPopout = () => {
    isHovered.value = true;
  };

  const hidePopout = () => {
    isHovered.value = false;
  };

  // Set up the event listener when the component mounts
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  // Clean up the event listener when the component unmounts
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>


<template>
  <header :class="{ 'scrolled': isScrolled || isHovered }">
    <div class="header-inner">
      <router-link to="/" class="logo">
          <img src="../assets/logo.svg" alt="logo">
          <h1>Lux Auctions</h1>
      </router-link>
      <div class="tools" @mouseenter="showPopout" @mouseleave="hidePopout">
        <router-link to="/auctions"><h2>Leilões</h2></router-link>
        <div id="acc">
          <h2>Conta</h2>
          <div class="acc-popout">
            <h2>Bem-vindo, utilizador</h2>
            <router-link to="/account"><h3>Perfil</h3></router-link>
            <router-link to="/login"><h3>Terminar sessão</h3></router-link>
            <div class="line-effect-popout"></div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div :class="{ 'scrolled': isScrolled || isHovered }" class="line-effect"></div>
</template>

<style scoped>
  header {
    display: flex;
    align-items: center;
    padding: 2vw;
    width: 100%;
    height: fit-content;
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 999;
    transition: background 0.3s ease;
  }

  header.scrolled  {
    background: black;
  }

  .line-effect {
    position: fixed;
    top: calc(64px + 4vw);
    background: transparent;
    height: 4px;
    width: 100%;
    transition: background 0.3s ease;
  }

  .line-effect.scrolled {
    position: fixed;
    top: calc(64px + 4vw);
    background: linear-gradient(90deg, #745811, #F5B81F, #BC973A, #C99A23, #BC973A, #745811);
    height: 4px;
    width: 100%;
    transition: background 0.3s ease;
    z-index: 998;
  }

  header .header-inner {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  header .header-inner .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  header .header-inner .logo img{
    object-fit: contain;
    width: auto;
    height: 64px;
  }

  header .header-inner .logo h1 {
    font-size: 32px;
    color: white;
    transition: all 0.3s ease;
  }

  header .header-inner .tools {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  header .header-inner .tools h2 {
    color: white;
    transition: all 0.3s ease;
    height: 64px;
    line-height: 64px;
  }

  header .header-inner .tools h2:hover,
  header .header-inner .logo:hover h1,
  .acc-popout h3:hover{
    cursor: pointer;
    color: #d3ac07;
  }

  #acc {
    padding-left: 2vw;
  }

  .acc-popout {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: -10vh;
    right: -2vw;
    padding: 2vw;
    width: 25vw;
    background: black;
    transition: top 0.3s ease, opacity 0.2s ease;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }

  .acc-popout h2 {
    line-height: 32px !important;
    height: auto !important;
    color: white !important;
    cursor: default !important;
  }

  #acc:hover .acc-popout,
  .acc-popout:hover {
    opacity: 1;
    pointer-events: all;
    visibility: visible;
    margin-top: 64px;
    z-index: 1003;
    top: 0;
  }

  #acc:hover .line-effect.scrolled {
    left: -25vw !important;
  }

  .acc-popout h3 {
    transition: all 0.3s ease;
    color: white;
    margin-top: 10px;
  }

  .acc-popout .line-effect-popout {
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, #745811, #F5B81F, #BC973A, #C99A23, #BC973A, #745811);
    height: 4px;
    width: 100%;
    z-index: 1000;
  }

  @media (max-width: 640px) {
    header .header-inner .logo h1 {
      display: none;
    }
    .acc-popout {
      width: 100% !important;
    }

  }

  @media (max-width: 991.98px) {
    .acc-popout {
      width: 50vw;
    }

    #acc {
      padding-left: 8vw;
    }
  }
</style>