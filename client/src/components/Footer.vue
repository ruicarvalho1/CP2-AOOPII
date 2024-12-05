<template>
  <footer class="footer">
    <div class="line"></div>
    <div class="container">
      <div class="logo">
        <a href="">
          <img src="../assets/logo.svg" alt="logo">
          <h1>Lux Auctions</h1>
        </a>
      </div>
      <div class="infos">
        <a href="">
          <h3>Leilões</h3>
        </a>
        <a href="">
          <h3>Sobre nós</h3>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    display: flex;
    background: black;
    position: relative;
    align-items: center;
    padding: 1vw 2vw;
    width: 100%;
    height: fit-content;
    top: 0;
    left: 0;
    z-index: 998;
  }

  footer .line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #745811, #F5B81F, #BC973A, #C99A23, #BC973A, #745811);
  }

  footer .container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  footer .container .logo a {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  footer .container .logo img {
    object-fit: contain;
    width: auto;
    height: 64px;
  }

  footer .container .logo h1 {
    color: white;
    transition: all 0.3s ease;
  }

  footer .container .infos {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2vw;
  }

  footer .container .infos h3 {
    color: white;
    transition: all 0.3s ease;
  }

  footer .container .infos a:hover h3,
  footer .container .logo a:hover h1{
    cursor: pointer;
    color: #d3ac07;
  }

  @media (max-width: 640px) {
    footer .container .logo h1 {
      display: none;
    }
  }
</style>