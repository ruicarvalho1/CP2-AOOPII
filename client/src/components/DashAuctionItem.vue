<script setup>
import { ref, onMounted } from 'vue';
import EditAuction from "@/components/EditAuction.vue";
import SeeAuctionDetails from "@/components/SeeAuctionDetails.vue";

const isShowing = ref(false);
const isShowingEdit = ref(false);
const isShowingDetails = ref(false);
const selectedAuction = ref(null);
const auctions = ref([]);
const loading = ref(true);

const showEdit = (auction) => {
  selectedAuction.value = auction;
  isShowingEdit.value = !isShowingEdit.value;
  console.log('isShowingEdit:', isShowingEdit.value);
};

const showDetails = (auction) => {
  selectedAuction.value = auction;
};

const confirmDelete = (auction) => {
  selectedAuction.value = auction;
  isShowing.value = true;
  console.log('isShowing:', isShowing.value);
};


const cancelDelete = () => {
  isShowing.value = false;
  selectedAuction.value = null;
};

const deleteAuction = async (auctionId) => {
  if (!auctionId) {
    console.error('ID do leilão não fornecido');
    return;
  }

  const token = localStorage.getItem('jwt');
  if (!token) {
    console.error('Token não encontrado');
    return;
  }

  const url = `http://localhost:3000/auth/auctions/${auctionId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Resposta do servidor:', response);

    let data = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    }

    if (response.ok) {
      console.log('Leilão eliminado com sucesso', data);
      location.reload();
    } else {
      console.error('Erro ao eliminar o leilão', data || 'Sem mensagem de erro');
    }
  } catch (error) {
    console.error('Erro ao enviar a requisição', error);
  }
};


const fetchAuctions = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem('jwt');
    if (!token) throw new Error('Token não encontrado');

    const response = await fetch('http://localhost:3000/auth/auctions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Erro ao buscar os leilões');

    const data = await response.json();
    auctions.value = data.auctions;
  } catch (err) {
    console.error(err.message);
  } finally {
    loading.value = false;
  }
};




onMounted(() => {
  fetchAuctions();
});
</script>

<template>
  <div>
    <div v-if="loading">A carregar os leilões...</div>
    <div v-else>
      <div v-for="(auction, index) in auctions" :key="auction._id || index" class="element">
        <div @click="showDetails(auction)" class="product-img">
          <img :src="auction.banner_image || '../assets/lambo.jpeg'" alt="">
        </div>
        <div class="product">
          <h4>{{ auction.product_name }}</h4>
        </div>
        <div class="price">
          <h4>{{ auction.prices?.auction_start_value }}€</h4>
        </div>
        <div class="status">
          <div class="state" :class="{ ended: auction.internal_info?.auction_ended }">
            <h4>{{ auction.internal_info?.auction_ended ? 'Inativo' : 'Ativo' }}</h4>
          </div>
        </div>
        <div class="actions">
          <button @click="showEdit(auction)" class="edit-btn"><img src="./icons/edit_icon.svg" alt=""></button>
          <button @click="confirmDelete(auction)" class="delete-btn"><img src="./icons/trash-96.svg" alt=""></button>
        </div>
      </div>
    </div>
    <div :class="['confirmation-modal', { show: isShowing }]">
      <div class="modal">
        <h2>Tem a certeza que pretende eliminar este leilão?</h2>
        <h4>{{ selectedAuction?.product_name }}</h4>
        <h3>Esta ação não é reversível!</h3>
        <div class="modal-buttons">
          <button @click="deleteAuction(selectedAuction?._id)" class="delete">Confirmar</button>
          <button @click="cancelDelete">Cancelar</button>
        </div>
      </div>
    </div>

    <SeeAuctionDetails v-if="isShowingDetails" :auction="selectedAuction"/>
    <EditAuction :isShowingEdit="isShowingEdit" :auction="selectedAuction" @close="isShowingEdit = false" />
  </div>
</template>

<style scoped>
.confirmation-modal.show {
  display: flex;
}

.confirmation-modal {
  display: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.confirmation-modal .modal {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: white;
  box-shadow: 2px 2px 4px rgba(232, 170, 29, 0.2);
  padding: 2vw;
  text-align: center;
  gap: 10px;
}

.confirmation-modal .modal h3 {
  text-decoration: underline;
}

.confirmation-modal .modal h2 {
  font-family: "Ubuntu", sans-serif !important;
  font-weight: 700;
}

.confirmation-modal .modal .modal-buttons {
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 16px;
  margin-top: 10px;
}

.confirmation-modal .modal .modal-buttons button {
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

.confirmation-modal .modal .modal-buttons button:hover {
  cursor: pointer;
  scale: 1.02;
}

.confirmation-modal .modal .modal-buttons button.delete {
  color: rgba(255, 0, 0, 0.65);
}

.confirmation-modal .modal .modal-buttons button.delete:hover {
  color: white;
  background: rgba(255, 0, 0, 0.65);
}

.element {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  border-bottom: 2px solid black;
  max-height: 96px;
}

.state {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  background: rgba(0, 255, 0, 0.27);
}

.state.ended {
  background: rgba(255, 0, 0, 0.27);
}

.edit-modal {
  z-index: 9999;
}

.edit-btn, .delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 48px;
  background: white;
  color: #ff9900;
  border: none;
  font-size: 28px;
  box-shadow: 2px 2px 8px rgba(232, 170, 29, 0.2);
  transition: all 0.3s ease;
}

.delete-btn img, .edit-btn img {
  width: 32px;
  height: 32px;
}

.edit-btn:hover {
  cursor: pointer;
  scale: 1.02;
}

.delete-btn:hover {
  cursor: pointer;
  background: rgba(255, 0, 0, 0.65);
  color: white;
  scale: 1.02;
}

.element .product-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  min-width: 48px;
}

.element .product-img:hover {
  cursor: pointer;
}

.element .product {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  min-width: 64px;
  padding: 10px;
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

.element .actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 10%;
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

  .element .product, .element .price,
  .element .status {
    border: none;
  }

  .element .price,
  .element .status,
  .element .actions {
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

  .confirmation-modal .modal {
    width: 95%;
  }
}
</style>
