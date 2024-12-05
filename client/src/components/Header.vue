<template>
  <header class="header">
    <div class="header-inner">
      <div class="logo">
        <a href="">
          <img src="../assets/logo-full-wht.svg" alt="logo">
        </a>
      </div>
      <div class="tools">
        <h2>Leilões</h2>
        <h2 id="acc">Conta</h2>
      </div>
    </div>
  </header>
</template>

<style scoped>
  header {
    display: flex;
    align-items: center;
    padding: 2vw;
    width: 100%;
    height: fit-content;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 4px solid #FFD00C;
    background: black;
  }

  header .header-inner {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  header .header-inner .logo img{
    object-fit: contain;
    width: auto;
    height: 64px;
  }

  header .header-inner .tools {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2vw;
  }

  header .header-inner .tools h2 {
    color: white;
    transition: all 0.3s ease;
  }

  header .header-inner .tools h2:hover {
    cursor: pointer;
    color: #C99A23;
  }

</style>