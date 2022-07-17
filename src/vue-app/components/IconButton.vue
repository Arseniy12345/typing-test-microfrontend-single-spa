<template>
  <div :class="$style.IconButton" @click="onClick()">
    <div :class="$style.IconButton__icon"><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    onClick: Function,
  },
};
</script>

<style module>
.IconButton {
  width: 30px;
  height: 30px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.IconButton * path {
  fill: #c4c3c3;
}

.IconButton:hover {
  background: rgba(255, 255, 255, 0.4);
}

.IconButton:hover * path {
  fill: #f7f3e9;
}

.IconButton__icon {
  width: 24px;
  height: 24px;
}
</style>
