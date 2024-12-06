<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  // Reactive variable to track the scroll state
  const isScrolled = ref(false);

  // Function to handle the scroll event
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
  };

  // Set up the event listener when the component mounts
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });

  // Clean up the event listener when the component unmounts
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>

<template>
  <header :class="{ 'scrolled': isScrolled }">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <a href="">
          <img src="../assets/logo.svg" alt="logo">
          <h1>Lux Auctions</h1>
        </a>
      </router-link>
      <div class="tools">
        <router-link to="/auctions"><h2>Leilões</h2></router-link>
        <h2 id="acc">Conta</h2>
      </div>
    </div>
  </header>
  <div :class="{ 'scrolled': isScrolled }" class="line-effect"></div>
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

  header.scrolled {
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
    z-index: 1000;
  }

  header .header-inner {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  header .header-inner .logo a {
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
    gap: 2vw;
  }

  header .header-inner .tools h2 {
    color: white;
    transition: all 0.3s ease;
  }

  header .header-inner .tools h2:hover,
  header .header-inner .logo a:hover h1{
    cursor: pointer;
    color: #d3ac07;
  }

  @media (max-width: 640px) {
    header .header-inner .logo h1 {
      display: none;
    }
  }

</style>