<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header></Header>

  <div class="about-contents">
    <div class="fake-header">
      <div class="line-effect"></div>
    </div>
    <h1>Sobre nós</h1>
    <div class="content">
      <h2>Projeto desenvolvido por:</h2>
      <div class="us">
        <div class="wannabe-profile">
          <div class="awesome-profile">
            <div class="border-div"></div>
            <img src="../../assets/AndreCosta.png" alt="">
          </div>
          <div class="about-us-infos">
            <h3>André Costa</h3>
            <h4>Curso: Engenharia Informática</h4>
            <h4>Nº: 27638</h4>
            <h4>Biografia: Gosto demasiado de front-end.</h4>
          </div>
        </div>
        <div class="wannabe-profile">
          <div class="awesome-profile">
            <div class="border-div"></div>
            <img src="../../assets/RuiCarvalho.png" alt="">
          </div>
          <div class="about-us-infos">
            <h3>Rui Carvalho</h3>
            <h4>Curso: Engenharia Informática</h4>
            <h4>Nº: 27628</h4>
            <h4>Biografia: Farto de logins.</h4>
          </div>
        </div>
        <div class="wannabe-profile">
          <div class="awesome-profile">
            <div class="border-div"></div>
            <img src="../../assets/MiguelCruz.jpg" alt="">
          </div>
          <div class="about-us-infos">
            <h3>Miguel Cruz</h3>
            <h4>Curso: Engenharia Informática</h4>
            <h4>Nº: 27643</h4>
            <h4>Biografia: Amo java.</h4>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer></Footer>
</template>

<style scoped>
  .about-contents .fake-header {
    display: flex;
    align-items: end;
    justify-content: center;
    width: 100%;
    height: calc(64px + 4vw);
    background: black;
    position: relative;
    overflow-x: clip;
  }

  .about-contents .fake-header .line-effect {
    position: fixed;
    top: calc(64px + 4vw);
    background: linear-gradient(90deg, #745811, #F5B81F, #BC973A, #C99A23, #BC973A, #745811);
    height: 4px;
    width: 100%;
  }

  .about-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  .about-contents h1 {
    padding: 0 2vw;
    margin-top: 64px;
  }

  .about-contents .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin-top: 10px;
  }

  .about-contents .content .us {
    display: flex;
    justify-content: center;
    margin-top: 32px;
    gap: 32px;
    width: 100%;
  }

  .about-contents .content .us .wannabe-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2vw;
    background: white;
    box-shadow: 2px 2px 8px rgba(232, 170, 29, 0.2);
    color: white;
    width: 30%;
    min-width: 220px;
  }

  .about-contents .content .us .wannabe-profile .awesome-profile {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 208px;
    width: 208px;
    position: relative;
  }

  .about-contents .content .us .wannabe-profile .awesome-profile img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    z-index: 1;
  }

  .about-contents .content .us .wannabe-profile .awesome-profile .border-div {
    position: absolute;
    top: 0;
    bottom: 0;
    background: linear-gradient(90deg, #745811, #F5B81F, #BC973A, #C99A23, #BC973A, #745811);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: 0;
    transform: rotate(45deg);
  }

  .about-contents .content .us .wannabe-profile .about-us-infos {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }

  @media (max-width: 860px) {
    .about-contents .content {
      width: 95%;
      margin-bottom: 64px;
    }

    .about-contents .content .us {
      flex-wrap: wrap;
    }

    .about-contents {
      height: fit-content;
    }
  }

  @media (max-width: 500px) {
    .about-contents .content .us .wannabe-profile {
      width: 100%;
    }
  }

</style>