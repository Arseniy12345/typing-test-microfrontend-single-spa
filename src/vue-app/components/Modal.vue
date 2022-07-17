<template>
  <div v-if="open" :class="$style.Modal" @click="onClose()">
    <div :class="$style.Modal__content" @click.stop>
      <div :class="$style.Modal__header">
        <span :class="$style.Modal__header_title">{{ title }}</span>
        <icon-button :on-click="onClose"><IconClose /></icon-button>
      </div>

      <div :class="$style.Modal__slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "./IconButton.vue";
import IconClose from "../assets/icons/close.svg";

export default {
  props: {
    open: Boolean,
    onClose: Function,
    title: String,
  },
  components: { IconButton, IconClose },
};
</script>

<style module>
.Modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.Modal__content {
  background: #c4c3c3;
  border-radius: 8px;
}

.Modal__header {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 18px;
  background: #a20bc0;
  width: 100%;
  height: 44px;
  border-radius: 8px 8px 0px 0px;
}

.Modal__header_title {
  color: #f7f3e9;
  font-size: 16px;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
}

.Modal__header_close {
  background: #495af2;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  color: white;
}

.Modal__header_close:hover {
  background: #273ae3;
}

.Modal__slot {
  padding: 18px;
}
</style>
