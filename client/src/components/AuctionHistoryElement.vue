<script setup>

</script>

<template>
  <div class="element">
    <div class="product-img">
      <img src="../assets/lambo.jpeg" alt="">
    </div>
    <div class="product">
      <h4>Lamborghini Aventador SV LP750-4 6.5 V12</h4>
    </div>
    <div class="price">
      <h4>Licitação: 350 000€</h4>
    </div>
    <div class="date">
      <h4>Data: 23/12/2024</h4>
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

</style>