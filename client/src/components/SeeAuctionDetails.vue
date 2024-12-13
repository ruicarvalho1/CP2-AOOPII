<script setup>
  const emit = defineEmits();

  const cancelEdit = () => {
    emit('close');
  };
</script>

<template>
  <div  v-show="isShowingEdit" class="info-modal">
    <div class="modal">
      <h2>Informações de Leilão</h2>
      <div class="auction-fields">
        <div class="input-section row1">
          <h3>Imagem:</h3>
          <h4>{{auction?.product_name}}</h4>
        </div>
        <div class="input-section row1">
          <h3>Produto:</h3>
          <h4>{{auction?.product_name}}</h4>
        </div>
        <div class="input-section description">
          <h3>Descrição:</h3>
          <h4>{{auction?.product_name}}</h4>
        </div>
        <div class="input-section row3">
          <h3>Preço inicial:</h3>
          <h4>{{auction?.product_name}}</h4>
        </div>
        <div class="input-section row3">
          <h3>Preço final:</h3>
          <h4>{{auction?.product_name}}</h4>
        </div>
        <div class="input-section row3">
          <h3>Visivível ?</h3>
          <h4>{{auction?.product_name}}</h4>
        </div>
        <div class="input-section row3">
          <h3>Encerrado ?</h3>
          <h4>{{auction?.product_name}}</h4>
        </div>
        <div class="input-section row4">
          <h3>Vencedor:</h3>
          <h4>{{auction?.product_name}}</h4>
        </div>
        <div class="input-section row4">
          <h3>Data de criação:</h3>
          <h4>{{auction?.product_name}}</h4>
        </div>
        <div class="input-section row4">
          <h3>Data de abertura:</h3>
          <h4>{{auction?.product_name}}</h4>
        </div>
        <div class="input-section row4">
          <h3>Data de encerramento:</h3>
          <h4>{{auction?.product_name}}</h4>
        </div>
      </div>
      <div class="modal-buttons">
        <button @click="cancelEdit" class="delete">Fechar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .info-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1999;
  }

  .info-modal .modal {
    display: flex;
    align-items: center;
    flex-direction: column;
    background: white;
    box-shadow: 2px 2px 4px rgba(232, 170, 29, 0.2);
    padding: 2vw;
    text-align: center;
    gap: 10px;
    width: 80%;
    max-height: calc(100vh - 2vw);
  }

  .info-modal .modal .auction-fields {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .info-modal .modal .input-section {
    padding: 12px;
  }

  .info-modal .modal .input-section.row1 {
    width: 50%;
  }

  .info-modal .modal .input-section.description {
    width: 100%;
    max-height: 200px;
    overflow-y: scroll;
  }

  .info-modal .modal .input-section.row3,
  .info-modal .modal .input-section.row4 {
    width: 25%;
  }

  .info-modal .modal .modal-buttons {
      display: flex;
      width: 100%;
      justify-content: end;
      gap: 16px;
      margin-top: 10px;
  }

  .info-modal .modal .modal-buttons button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    min-width: fit-content;
    height: 48px;
    background: black;
    color: white;
    border: none;
    font-size: 28px;
    box-shadow: 2px 2px 8px rgba(232, 170, 29, 0.2);
    transition: all 0.3s ease;
    padding: 0 10px;
  }

  .info-modal .modal .modal-buttons button:hover {
    cursor: pointer;
    scale: 1.02;
  }

  .info-modal .modal .modal-buttons button.delete {
    color: white;
  }

  .info-modal .modal .modal-buttons button.delete:hover {
    background: rgba(255, 0, 0, 0.65);
  }

  @media (max-width: 750px) {
    .info-modal .modal {
      width: 95%;
    }

    .info-modal .modal .input-section.row3,
    .info-modal .modal .input-section.row4 {
      width: 50%;
    }
  }
</style>