<script setup>
import { defineProps } from 'vue';


const props = defineProps({
  auction: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <router-link to="/auction-page" class="auction-card">

    <img :src="auction?.banner_image || '/assets/default-banner.jpg'" alt="product" />
    <div class="info">
      <h3>{{ auction?.product_name || 'Produto desconhecido' }}</h3>
      <h3><span class="mobile-text">Licitação Inicial:</span> {{ auction?.prices?.auction_start_value || 'N/A' }}€</h3>
      <h4><span class="mobile-text">Vendido por:</span> {{ auction?.seller || 'Desconhecido' }}</h4>
      <h4>Vencedor: {{ auction.internal_info?.auction_winner || 'Não determinado' }}</h4>
    </div>
    <div class="state" :class="{ ended: auction.internal_info?.auction_ended }">
      <h4>{{ auction.internal_info?.auction_ended ? 'Leilão Finalizado' : 'Leilão Ativo' }}</h4>
    </div>
  </router-link>
</template>
<style scoped>
.auction-card {
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 400px;
  width: 100%;
  padding: 10px;
  box-shadow: 2px 2px 8px rgba(232, 170, 29, 0.2);
  background: white;
  position: relative;
  transition: all 0.3s ease;
}
.auction-card:hover {
  scale: 1.04;
}
.auction-card img {
  width: 100%;
  height: 60%;
  object-fit: cover;
}
.auction-card .info {
  margin-top: 10px;
}
.auction-card .info h4, .auction-card .info h3 {
  max-height: 24px;
  overflow: clip;
}
.auction-card .info h4:not(:last-child) {
  margin-top: 4px;
}
.auction-card .info h4, h3 {
  text-overflow: ellipsis;
}
.auction-card .state {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: calc(100% - 20px);
  background: rgba(0, 255, 0, 0.27);
  position: absolute;
  bottom: 10px;
}

.auction-card .state.ended {
  background: rgba(255, 0, 0, 0.27);
}
@media (max-width: 540px) {
  .mobile-text {
    display: none;
  }
}
</style>
