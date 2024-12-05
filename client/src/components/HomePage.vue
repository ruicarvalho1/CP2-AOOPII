<script setup>
import AuctionCard from "@/components/AuctionCard.vue";
import HowItWorks from "@/components/HowItWorks.vue";
import "animate.css";
</script>

<template>
  <div class="contents">
    <video class="presentation animate__animated animate__fadeInDown" autoplay muted>
      <source src="../assets/apresentacao.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div class="top-auctions">
      <h1>Mais populares:</h1>
      <div class="auctions">
        <auction-card></auction-card>
        <auction-card></auction-card>
        <auction-card></auction-card>
        <auction-card></auction-card>
      </div>
      <div class="see-all">
        <button class="see-all-btn">Ver mais leilões</button>
      </div>
    </div>

    <HowItWorks></HowItWorks>
  </div>
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
    width: 300px;
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
</style>