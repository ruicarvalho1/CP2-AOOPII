<script setup>

</script>

<template>
  <div class="contents">
    <video class="presentation" autoplay muted>
      <source src="../assets/apresentacao.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<style scoped>
  .contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;
    margin-top: calc(64px + 4vw);
  }

  .contents .presentation {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
</style>