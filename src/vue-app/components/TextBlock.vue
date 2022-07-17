<template>
  <div :class="$style.TextBlock" @click="onClick(text)">{{ text }}</div>
</template>

<script>
export default {
  props: {
    text: String,
    onClick: Function,
  },
};
</script>

<style module>
.TextBlock {
  box-sizing: border-box;
  width: 600px;
  height: 124px;
  border: 1px solid #a1a1a1;
  border-radius: 8px;
  padding: 12px 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  color: #282829;
  cursor: pointer;
}

.TextBlock:not(:last-child) {
  margin-bottom: 8px;
}

.TextBlock:hover {
  background: #a8a7a7;
  box-shadow: inset 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
}
</style>
