<script setup>
import { ref } from 'vue';

const emit = defineEmits();

const auction = ref({
  product_name: '',
  description: '',
  start_price: 0,
  end_price: 0,
  is_visible: true,
  is_ended: false,
  winner: '',
  created_at: '',
  start_date: '',
  end_date: ''
});

const cancelCreate = () => {
  emit('close');
};

const createAuction = async () => {
  const url = '/api/create-auction';
  const method = 'POST';

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auction.value),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Leilão criado com sucesso', data);
      emit('close');
    } else {
      console.error('Erro ao criar leilão', data);
    }
  } catch (error) {
    console.error('Erro ao enviar dados', error);
  }
};
</script>

<template>
  <div v-show="isShowingCreate" class="info-modal">
    <div class="modal">
      <h2>Criar Leilão</h2>

      <div class="auction-fields">
        <div class="input-section row1">
          <h3>Imagem:</h3>
          <input v-model="auction.banner_image" type="text" placeholder="Imagem do Leilão">
        </div>

        <div class="input-section row1">
          <h3>Produto:</h3>
          <input v-model="auction.product_name" type="text" placeholder="Nome do Produto">
        </div>

        <div class="input-section description">
          <h3>Descrição:</h3>
          <textarea v-model="auction.description" placeholder="Descrição do produto"></textarea>
        </div>

        <div class="input-section row3">
          <h3>Preço inicial:</h3>
          <input v-model="auction.prices.auction_start_value" type="number" placeholder="Preço Inicial">
        </div>

        <div class="input-section row3">
          <h3>Preço final:</h3>
          <input v-model="auction.prices.auction_end_value" type="number" placeholder="Preço Final">
        </div>

        <div class="input-section row3">
          <h3>Visível ?</h3>
          <input type="checkbox" v-model="auction.internal_info.auction_visible">
        </div>

        <div class="input-section row3">
          <h3>Encerrado ?</h3>
          <input type="checkbox" v-model="auction.internal_info.auction_ended">
        </div>

        <div class="input-section row4">
          <h3>Vencedor:</h3>
          <input v-model="auction.winner" type="text" placeholder="Nome do vencedor">
        </div>

        <div class="input-section row4">
          <h3>Data de criação:</h3>
          <input v-model="auction.created_at" type="date">
        </div>

        <div class="input-section row4">
          <h3>Data de abertura:</h3>
          <input v-model="auction.start_date" type="date">
        </div>

        <div class="input-section row4">
          <h3>Data de encerramento:</h3>
          <input v-model="auction.end_date" type="date">
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
