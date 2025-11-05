<style scoped>
#outer_input {
  background-color: var(--maincolor);
  height: 8vh;
  margin-top: 1vh;
  border-radius: 4vh;
  display: flex;
  flex-direction: row !important;
  width: 60vw;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
  transition: box-shadow 300ms ease;
  &:hover{
    box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
  }
  input {
    color: var(--maincolor);
    height: 6vh;
    border-radius: 3vh;
    width: 53vw;
    margin: 0;
    padding: 0;
    margin-top: 1vh;
    margin-left: 1vh;
    border: none;
    padding-left: 10px;
    font-size: 120%;
    box-shadow: inset -3px 3px 1px rgba(0,0,0,0.2);
    transition: box-shadow 300ms ease;
    &:focus-within {
      outline: none;
      text-decoration: underline;
      box-shadow: inset -3px 3px 1px rgba(0,0,0,0.3)
    }
  }
  #search {
    color: white;
    width: 6vh;
    height: 6vh;
    margin-top: 1vh;
    margin-left: 1vh;
  }
}
</style>

<template>
  <div id="outer_input" ref="outer">
    <input type="text" v-model="inputValue" ref="input" />
    <div id="search" ref="search"><Search/></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import gsap from "gsap";
const inputValue = ref("");
const outer = ref<HTMLElement>();
const input = ref<HTMLElement>();
const search = ref<HTMLElement>();

const vhToPixels = (vh: number) => Math.floor((vh * window.innerHeight) / 100);
const vwToPixels = (vw: number) => Math.floor((vw * window.innerWidth) / 100);

onMounted(() => {
  setTimeout(() => {
    gsap.defaults({duration:1.5})
    gsap.to(outer.value!, {
      width: vwToPixels(80),
      x: vwToPixels(-5),
      height: vhToPixels(4),
      marginTop: vhToPixels(0.3)
    });
    gsap.to(input.value!, {
      width:vwToPixels(75),
      height: vhToPixels(3),
      marginTop: vhToPixels(0.5),
      marginLeft: vhToPixels(0.5),
    });
    gsap.to(search.value!, {
      scale:0.5,
      x:-10,
      y:-10,
      marginTop: vhToPixels(0.5),
      marginLeft: vhToPixels(0.5),
    });
  }, 1500);
});
</script>