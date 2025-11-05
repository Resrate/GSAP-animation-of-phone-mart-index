<style scoped>
#outer {
  height: 200vh;
  color: var(--maincolor);
  margin: 10px 5vw;
  display: flex;
  flex-direction: column;
  #logo {
    display: flex;
    flex-direction: row;
    height: 10vh;
    margin-left: 6vw;
  }
  h1 {
    margin: 0;
    padding: 0;
    font-size: 300%;
    height: 10vh;
    line-height: 10vh;
    font-family: 楷体;
    position: relative;
    overflow: hidden;
    #light {
      left: 0;
      top: 0;
      position: absolute;
      height: 10vh;
      width: 50px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.7),
        transparent
      );
      transform: rotate(45deg);
    }
  }
  #middle {
    display: flex;
    flex-direction: row;
    height: 260px;
    background-color: white;
    border-radius: 20px;
    box-shadow: inset -4px -4px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>

<template>
  <div id="outer">
    <div id="logo" ref="logo">
      <h1 ref="h1">
        手机商城
        <div id="light" ref="light"></div>
      </h1>
      <my-input />
    </div>
    <div id="middle" ref="middle">
      <my-select></my-select>
      <my-show></my-show>
    </div>
    <div id="last" ref="lsat">
      <card></card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import myInput from "./index-components/input.vue";
import mySelect from "./index-components/select.vue";
import myShow from "./index-components/show.vue";
import card from "./index-components/card.vue";
import gsap from "gsap";

const vhToPixels = (vh: number) => Math.floor((vh * window.innerHeight) / 100);
const h1 = ref<HTMLElement>();
const light = ref<HTMLElement>();
const logo = ref<HTMLElement>();
onMounted(() => {
  gsap
    .timeline({ defaults: { duration: 1 } })
    .to(light.value!, { x: 500 })
    .to(h1.value!, { y: -30, scale: 0, opacity: -5 })
    .to(logo.value!, { height: vhToPixels(6) });
});
</script>
