<script setup>
  import { ref } from 'vue';

  const emit = defineEmits();

  const cancelCreate = () => {
    emit('close');
  };


  const today = new Date().toISOString().split('T')[0];

</script>

<template>
  <div  v-show="isShowingCreate" class="create-modal">
    <div class="modal">
      <h2>Criar Leilão</h2>
      <div class="auction-fields">
        <div class="input-section">
          <h3>Imagem:</h3>
          <input type="text" placeholder="Url">
        </div>
        <div class="input-section">
          <h3>Produto:</h3>
          <input type="text" placeholder="Nome do produto">
        </div>
        <div class="input-section description">
          <h3>Descrição:</h3>
          <textarea type="text" placeholder="Descrição do produto"></textarea>
        </div>
        <div class="input-section price">
          <h3>Preço inicial:</h3>
          <div class="bid-input">
            <input type="number" placeholder="Preço inicial">
            <h1>€</h1>
          </div>
        </div>
        <div class="input-section visible">
          <h3>Visivível ?</h3>
          <label class="custom-checkbox">
            <input type="checkbox" />
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="input-section date">
          <h3>Data de abertura:</h3>
          <input type="datetime-local" :min="today" placeholder="DD/MM/YYYY HH:MM"/>
        </div>
      </div>
      <div class="modal-buttons">
        <button @click="cancelCreate" class="delete">Cancelar</button>
        <button @click="" >Confirmar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .create-modal {
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

  .create-modal .modal {
    display: flex;
    align-items: center;
    flex-direction: column;
    background: white;
    box-shadow: 2px 2px 4px rgba(232, 170, 29, 0.2);
    padding: 2vw;
    text-align: center;
    gap: 10px;
    width: 80%;
  }

  .create-modal .modal .auction-fields {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .create-modal .modal .input-section {
    padding: 12px;
    width: 50%;
  }

  .create-modal .modal .input-section.description {
    width: 100%;
  }

  .create-modal .modal .input-section textarea {
    height: 120px !important;
    resize: vertical;
  }

  .create-modal .modal .input-section input,
  .create-modal .modal .input-section textarea {
    height: 48px;
    color: black;
    padding: 16px 8px;
    font-size: 16px;
    transition: all 0.3s ease;
    margin-bottom: 10px;
    border: 2px solid black;
    font-weight: 600;
    width: 100%;
  }

  .bid-input {
    display: flex;
    position: relative;
  }

  .bid-input h1{
    position: absolute;
    right: 16px;
  }

  .create-modal .modal .input-section.date {
    width: 30%;
  }

  .create-modal .modal .input-section.visible {
    width: 20%;
  }

  .create-modal .modal .input-section.visible input:hover,
  .create-modal .modal .input-section.date input:hover {
    cursor: pointer;
  }

  .create-modal .modal .input-section.visible input {
    border: 2px solid black;
    width: 48px;
    color: red;
  }

  .custom-checkbox input[type="checkbox"] {
    display: none;
  }

  .custom-checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    position: relative;
  }

  .custom-checkbox .checkmark {
    width: 48px;
    height: 48px;
    border: 2px solid black;
    display: flex;
    position: relative;
    background-color: white;
    transition: all 0.3s ease;
  }


  .custom-checkbox input[type="checkbox"]:checked + .checkmark {
    background-color: black;
    border-color: black;
  }

  .custom-checkbox input[type="checkbox"]:checked + .checkmark::after {
    content: "";
    position: absolute;
    top: 7px;
    left: 17px;
    width: 13px;
    height: 24px;
    border: solid #d3ac07;
    border-width: 0 4px 4px 0;
    transform: rotate(45deg);
    box-shadow: 2px 2px 8px rgba(232, 170, 29, 0.2);
  }

  .create-modal .modal .modal-buttons {
      display: flex;
      width: 100%;
      justify-content: end;
      gap: 16px;
      margin-top: 10px;
  }

  .create-modal .modal .modal-buttons button {
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

  .create-modal .modal .modal-buttons button:hover {
    cursor: pointer;
    scale: 1.02;
    color: #ffcd04;
  }

  .create-modal .modal .modal-buttons button.delete {
    color: white;
  }

  .create-modal .modal .modal-buttons button.delete:hover {
    background: rgba(255, 0, 0, 0.65);
  }

  @media (max-width: 550px) {
    .create-modal .modal {
      width: 95%;
    }
  }

  @media (max-width: 750px) {
    .create-modal .modal .input-section.visible {
      width: 30%;
    }

    .create-modal .modal .input-section.price {
      width: 70%;
    }

    .create-modal .modal .input-section.date {
      width: 100%;
    }
  }
</style>