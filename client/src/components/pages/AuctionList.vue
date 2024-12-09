<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AuctionCard from "@/components/AuctionCard.vue";
import HowItWorks from "@/components/HowItWorks.vue";
</script>

<template>
  <Header></Header>
  <div class="contents">
    <div class="banner animate__animated animate__fadeInDown">
      <img src="../../assets/auction-banner.jpg">
      <div class="shadow"></div>
      <h1>Os nossos leilões</h1>
    </div>

    <div class="auctions animate__animated animate__fadeInUp">
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
      <auction-card></auction-card>
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
    top: 50%;
    bottom: 50%;
    color: white;
    font-size: 50px;
    height: 78px;
  }

  .contents .auctions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;
    margin-top: 64px;
    width: 80%;
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