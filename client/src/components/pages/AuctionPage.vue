<script setup>
import Header from "@/components/Header.vue";
import HowItWorks from "@/components/HowItWorks.vue";
import Footer from "@/components/Footer.vue";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const auction = ref(null);
const isLoading = ref(false);
const errorMessage = ref('');
const route = useRoute();

const fetchAuctionDetails = async (id) => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await fetch(`http://localhost:3000/auth/auctions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do leilão');
    }

    const data = await response.json();
    auction.value = data;
  } catch (error) {
    errorMessage.value = error.message || 'Erro desconhecido';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const auctionId = route.params.id;
  console.log("Auction ID:", auctionId);
  if (auctionId) {
    fetchAuctionDetails(auctionId);
  }
});

</script>

<template>
  <Header></Header>

  <div class="auction-contents">
    <div class="fake-header">
      <div class="line-effect"></div>
    </div>
    <h1 class="product-name">{{auction?.auction.product_name}}</h1>
    <div class="auction-infos">
      <div class="product">
        <div class="product-img">
          <img :src="auction?.auction?.banner_image" alt="product">

        </div>
        <div class="description-div">
          <h2>Descrição do produto:</h2>
          <h5>
            {{auction?.auction.description}}
          </h5>
        </div>
      </div>
      <div class="auction-bidding">
        <div class="bidding-container">
          <h2>Licitação atual</h2>
          <h1>{{auction?.auction.prices.auction_start_value}} €</h1>
          <div class="bid-div">
            <h3>Introduza a sua licitação:</h3>
            <div class="bid-input">
              <input placeholder="Montante...">
              <h1>€</h1>
            </div>
            <div class="raise-error error">
              <h4>Licitação necessita de ser superior ao valor atual</h4>
            </div>
            <button class="confirm">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <HowItWorks></HowItWorks>

  <Footer></Footer>
</template>

<style scoped>
  .auction-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .auction-contents .fake-header {
    display: flex;
    align-items: end;
    justify-content: center;
    width: 100%;
    height: calc(64px + 4vw);
    background: black;
    position: relative;
  }

  .auction-contents .fake-header .line-effect {
    position: fixed;
    top: calc(64px + 4vw);
    background: linear-gradient(90deg, #745811, #F5B81F, #BC973A, #C99A23, #BC973A, #745811);
    height: 4px;
    width: 100%;
  }

  .auction-contents .product-name {
    margin-top: 64px;
    padding: 0 2vw;
  }

  .auction-contents .auction-infos {
    display: flex;
    width: 80%;
    margin-top: 20px;
    position: relative;
    gap: 32px;
  }

  .auction-contents .auction-infos .product,
  .auction-contents .auction-infos .auction-bidding {
    width: 50%;
  }

  .auction-contents .auction-infos .product .product-img {
    width: 100%;
    height: 400px;
    position: relative;
  }

  .auction-contents .auction-infos .product .product-img img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s ease-in;
    z-index: 900;
  }

  .auction-contents .auction-infos .product .product-img:hover img {
    scale: 1.75;
    left: 50%;
  }

  .auction-contents .auction-infos .description-div {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    width: 100%;
    gap: 10px;
  }

  .auction-contents .auction-infos .auction-bidding {
    position: relative;
  }

  .auction-contents .auction-infos .auction-bidding .bidding-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: sticky;
    top: calc(132px + 4vw);
  }

  .auction-contents .auction-infos .auction-bidding .bidding-container .bid-div{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    width: 100%;
  }

  .auction-contents .auction-infos .auction-bidding .bidding-container .bid-div input {
    width: 100%;
    height: 48px;
    color: black;
    padding: 16px 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    border: 2px solid black;
    font-weight: 600;
    box-shadow: 2px 2px 8px rgba(232, 170, 29, 0.5);
  }

  .bid-div .bid-input {
    display: flex;
    position: relative;
    width: 70%;
    margin-top: 10px;
  }

  .bid-div .bid-input h1{
    position: absolute;
    right: 16px;
  }

  .bid-div .confirm {
    width: 50%;
    height: 48px;
    background: black;
    color: white;
    border: none;
    font-size: 28px;
    box-shadow: 2px 2px 8px rgba(232, 170, 29, 0.2);
    transition: all 0.3s ease;
    margin-top: 22px;
  }

  .bid-div .confirm:hover {
    cursor: pointer;
    color: #d3ac07;
    scale: 1.02;
  }

   .error {
    display: none;
    padding: 8px;
    background: rgba(255, 0, 0, 0.27);
     margin-top: 10px;
  }

  .raise-error.error {
    display: flex;
  }
  
  @media (max-width: 800px) {
    .auction-contents .auction-infos {
      flex-direction: column-reverse;
      width: 95%;
      gap: 20px;
    }

    .auction-contents .auction-infos .product .product-img img {
      object-fit: scale-down;
    }

    .auction-contents .auction-infos .product,
    .auction-contents .auction-infos .auction-bidding {
      width: 100%;
    }

    .auction-contents .auction-infos .product .product-img:hover img {
      scale: 1;
      left: 0;
      top: 0;
    }
  }

  @media screen and (max-width: 500px) {
    .auction-contents .product-name {
      font-size: 24px;
      margin-top: 32px;
    }
    .bid-div .bid-input, .bid-div .confirm {
      width: 95%;
    }
  }
</style>