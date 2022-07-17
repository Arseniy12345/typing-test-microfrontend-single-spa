<template>
  <Modal :open="showModal" :on-close="closeSelectModal" title="Выберите текст"
    ><div :class="$style.SelectText">
      <TextBlock
        v-for="(item, index) in items"
        :key="index"
        :text="item"
        :on-click="onClickText"
      /></div
  ></Modal>
</template>

<script>
import Modal from "./Modal.vue";
import TextBlock from "./TextBlock.vue";
import { text1, text2, text3 } from "../constants.js";

export default {
  data() {
    return {
      showModal: false,
      items: [text1, text2, text3],
    };
  },
  methods: {
    showSelectModal(showModal) {
      this.showModal = showModal;
    },
    closeSelectModal() {
      window.store.showSelectModal(false);
    },
    onClickText(text) {
      window.store.setPrintableText(text);
      this.closeSelectModal();
    },
  },
  mounted() {
    window.store.subscribeVue(() => {
      const { showModal } = window.store.state;
      this.showSelectModal(showModal);
    });
  },
  components: { Modal, TextBlock },
};
</script>

<style module>
.SelectText {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
