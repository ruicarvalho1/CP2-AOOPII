<template>
  <div class="how-works">
      <h1>Como funciona?</h1>
    <div class="steps">
      <div class="step">
        <img src="./icons/online-store.svg" alt="">
        <p>Encontre o seu artigo favorito na nossa página</p>
      </div>
      <div class="step">
        <img src="./icons/online-shopping.svg" alt="">
        <p>Licite para continuar no topo do leilão</p>
      </div>
      <div class="step">
        <img src="./icons/auction-hammer.svg" alt="">
        <p>Após vencer o leilão, comunicaremos consigo para assentar a compra do seu produto</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .how-works {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 64px 0;
  }

  .how-works h1 {
    font-size: 50px;
  }

  .how-works .steps {
    display: flex;
    justify-content: space-evenly;
    align-items: start;
    width: 100%;
    margin-top: 32px;
  }

  .how-works .steps .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
  }

  .how-works .steps .step img {
    width: 200px;
    height: 200px;
  }

  .how-works .steps .step p {
    margin-top: 10px;
    text-align: center;
  }
</style>