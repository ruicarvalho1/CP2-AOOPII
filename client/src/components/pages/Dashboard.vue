<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import DashAuctionItem from "@/components/DashAuctionItem.vue";
import CreateAuction from "@/components/CreateAuction.vue";
import {ref} from 'vue';

const isShowingCreate = ref(false);

const showCreate = () => {
  isShowingCreate.value = !isShowingCreate.value;
};
</script>

<template>

  <Header></Header>

  <CreateAuction v-show="isShowingCreate" @close="showCreate"></CreateAuction>

  <div class="dash-contents">
    <div class="fake-header">
      <div class="line-effect"></div>
    </div>
    <div class="auctions">
      <h1>Gestão de leilões</h1>
      <button @click="showCreate" class="create-btn">Criar leilão</button>
      <div class="auction-list">
        <div class="element">
          <div class="product-img">
            <h4>Imagem</h4>
          </div>
          <div class="product">
            <h4>Produto</h4>
          </div>
          <div class="price">
            <h4>Preço inicial</h4>
          </div>
          <div class="status">
            <h4>Estado</h4>
          </div>
          <div class="actions">
            <h4>Ações</h4>
          </div>
        </div>
        <DashAuctionItem></DashAuctionItem>
        <DashAuctionItem></DashAuctionItem>
        <DashAuctionItem></DashAuctionItem>
        <DashAuctionItem></DashAuctionItem>
        <DashAuctionItem></DashAuctionItem>
        <DashAuctionItem></DashAuctionItem>
        <DashAuctionItem></DashAuctionItem>
        <DashAuctionItem></DashAuctionItem>
        <DashAuctionItem></DashAuctionItem>
      </div>
    </div>
  </div>

  <Footer></Footer>
</template>

<style scoped>
  .dash-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dash-contents .fake-header {
    display: flex;
    align-items: end;
    justify-content: center;
    width: 100%;
    height: calc(64px + 4vw);
    background: black;
    position: relative;
  }

  .dash-contents .fake-header .line-effect {
    position: fixed;
    top: calc(64px + 4vw);
    background: linear-gradient(90deg, #745811, #F5B81F, #BC973A, #C99A23, #BC973A, #745811);
    height: 4px;
    width: 100%;
  }

  .dash-contents .auctions {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-bottom: 64px;
  }

  .dash-contents .auctions h1 {
    text-align: center;
    margin-top: 32px;
  }

  .dash-contents .auctions .create-btn {
    display: flex;
    align-self: end;
    align-items: center;
    justify-content: center;
    margin: 32px 0;
    width: 240px;
    height: 48px;
    background: black;
    color: white;
    border: none;
    font-size: 28px;
    box-shadow: 2px 2px 8px rgba(232, 170, 29, 0.2);
    transition: all 0.3s ease;
  }

  .dash-contents .auctions .create-btn:hover,
  .dash-contents .auctions .create-btn:hover {
    cursor: pointer;
    color: #d3ac07;
    scale: 1.02;
  }

  .dash-contents .element {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    border-bottom: 2px solid black;
  }

  .dash-contents .element .product-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
    min-width: 48px;
    padding: 0 5px;
  }

  .dash-contents .element .product {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    min-width: 64px;
    padding: 0 5px;
  }

  .dash-contents .element .price {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    min-width: 32px;
    padding: 0 5px;
  }

  .dash-contents .element .status {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
    min-width: 32px;
    padding: 0 5px;
  }

  .dash-contents .element .actions {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
    min-width: 64px;
    padding: 0 5px;
  }

  @media (max-width: 950px) {
    .auction-list {
      border-top: 2px solid black;
    }

    .dash-contents .element {
      display: none;
    }

    .dash-contents .auctions {
      width: 95%;
    }
  }

  @media (max-width: 550px) {
    .dash-contents .auctions .create-btn {
      align-self: center;
    }
  }

</style>