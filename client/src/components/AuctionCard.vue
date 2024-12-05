<script setup>

</script>

<template>
  <a href="" class="auction-card">
    <img src="../assets/lambo.jpeg" alt="product">
    <div class="info">
      <h3>Lamborghini Aventador SV</h3>
      <h3>Licitação Inicial: 300,000€</h3>
      <h4>Vendido por: Premium Autos</h4>
      <h4>Vencedor: António Costa</h4>
    </div>
<!--    CLASSE ended DEFINE O BACKGROUND A VERMELHO NO CASO DE ESTAR ENCERRADO O LEILAO-->
    <div class="state">
      <h4>Aberto</h4>
    </div>
  </a>
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
</style>