<script setup>
import { ref } from 'vue';

const auction = ref({
  banner_image: '',
  product_name: '',
  description: '',
  prices: {
    auction_start_value: 0
  },
  internal_info: {
    auction_visible: true
  },
  dates: {
    date_auction_started: ''
  }
});

const emit = defineEmits();

const cancelCreate = () => {
  emit('close');
};



const createAuction = async () => {
  console.log("Função createAuction chamada");
  const token = localStorage.getItem('jwt');
  if (!token) {
    console.error('Token não encontrado');
    return;
  }

  const startPrice = parseInt(auction.value.prices.auction_start_value, 10);
  const startDate = new Date(auction.value.dates.date_auction_started).getTime();

  const url = 'https://project-assignment-2-27638-27628-27643-3dd5.onrender.com/auth/auctions';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        banner_image: auction.value.banner_image,
        product_name: auction.value.product_name,
        description: auction.value.description,
        start_price: startPrice,
        is_visible: auction.value.internal_info.auction_visible,
        start_date: startDate
      }),
    });

    let data = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    }

    if (response.ok) {
      console.log('Leilão criado com sucesso', data);
      location.reload();
      emit('close');
    } else {
      console.error('Erro ao criar leilão', data || 'Sem mensagem de erro');
    }
  } catch (error) {
    console.error('Erro ao enviar dados', error);
  }
};


</script>


<template>
  <div  v-show="isShowingCreate" class="create-modal">
    <div class="modal">
      <h2>Criar Leilão</h2>
      <div class="auction-fields">
        <div class="input-section">
          <h3>Imagem:</h3>
          <input v-model="auction.banner_image" type="text" placeholder="Imagem do Leilão">
        </div>
        <div class="input-section">
          <h3>Produto:</h3>
          <input v-model="auction.product_name" type="text" placeholder="Nome do Produto">
        </div>
        <div class="input-section description">
          <h3>Descrição:</h3>
          <textarea v-model="auction.description" placeholder="Descrição do produto"></textarea>
        </div>
        <div class="input-section price">
          <h3>Preço inicial:</h3>
          <div class="bid-input">
            <input v-model="auction.prices.auction_start_value" type="number" placeholder="Preço Inicial">
            <h1>€</h1>
          </div>
        </div>
        <div class="input-section visible">
          <h3>Visivível ?</h3>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="auction.internal_info.auction_visible">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="input-section date">
          <h3>Data de abertura:</h3>
          <input v-model="auction.dates.date_auction_started"  type="datetime-local">
        </div>
      </div>
      <div class="modal-buttons">
        <button @click="cancelCreate" class="delete">Fechar</button>
        <button @click="createAuction" class="save">Criar</button>
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