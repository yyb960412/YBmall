<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>

  export default {
    name: 'TaBar',
    
  }
</script>

<style scoped>
  #tab-bar{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #f6f6f6;

    display: flex;
  }
</style>