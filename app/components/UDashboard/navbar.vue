<template>
  <div class="navbar-container">
    <h2 class="truncate">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.navbar-container {
  background-color: #101f44;
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding-left: 280px;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: bold;
}
</style>
