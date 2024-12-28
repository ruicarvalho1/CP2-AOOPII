<script setup>
import { ref, onMounted } from 'vue';

const auctions = ref([]);
const isLoading = ref(false);
const errorMessage = ref(null);

onMounted(async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem('jwt');

    if (!token) {
      errorMessage.value = 'Token não encontrado';
      isLoading.value = false;
      return;
    }

    const response = await fetch('http://localhost:3000/auth/historyauctions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.auctions)) {
        auctions.value = data.auctions;
      } else {
        errorMessage.value = 'Erro: Histórico de leilões inválido';
      }
    } else {
      const errorData = await response.json();
      errorMessage.value = errorData.message || 'Erro desconhecido';
    }
  } catch (error) {
    errorMessage.value = 'Erro de rede: ' + error.message;
  } finally {
    isLoading.value = false;
  }
});


const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  console.log('Date created from timestamp:', date);
  return date.toLocaleString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Lisbon',
  });
};



</script>


<template>
  <div v-if="isLoading">Carregando...</div>
  <div v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </div>

  <div v-for="auction in auctions" :key="auction._id" class="element" v-if="auctions && auctions.length">
    <div class="product-img">
      <img :src="auction.banner_image" alt="product">
    </div>
    <div class="product">
      <h4>{{ auction.product_name }}</h4>
    </div>
    <div class="price">
      <h4>Licitação: {{ auction.prices.auction_end_value }}€</h4>
    </div>
    <div class="date">
      <h4>Data: {{ formatDate(auction.dates.date_auction_ended) }}</h4>
    </div>
    <div class="status">
      <div class="state winner">
        <h4>Venceu</h4>
      </div>
    </div>
  </div>
</template>



<style scoped>
.element {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  border-bottom: 2px solid black;
  max-height: 96px;
}

.state.winner {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  background: rgba(0, 255, 0, 0.27);
}

.state {
  display: none;
}

.element .product-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  min-width: 48px;
}

.element .product {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  min-width: 64px;
  padding: 10px;
  overflow: clip;
  text-overflow: ellipsis;
}

.element .price {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  min-width: 64px;
  padding: 10px;
}

.element .status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  min-width: 32px;
  padding: 10px;
}

.element .date {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 20%;
  min-width: 64px;
  padding: 10px;
}

.element .product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 950px) {
  .element {
    flex-wrap: wrap;
    justify-content: start;
    width: 100%;
    border-bottom: 2px solid black;
    max-height: none;
  }

  .element .product-img,
  .element .product {
    width: 50%;
  }

  .element .price,
  .element .date {
    justify-content: start;
  }

  .element .price,
  .element .status,
  .element .date {
    width: 100%;
  }
}

@media (max-width: 550px) {
  .element .product-img,
  .element .product {
    max-height: 100px;
    overflow: clip;
    text-overflow: ellipsis;
  }
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>
