<style scoped>
#main{
  height: 200vh;
}
</style>

<template>
  <top></top>
  <div ref="main" id="main">
     <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
     </RouterView>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import top from "./components/top.vue";
import { store } from "./store";
import { ref, watch } from "vue";
import gsap from "gsap";

const main = ref<HTMLElement>();
const {topSelectedItem}=storeToRefs(store());
watch(topSelectedItem,()=>{
  gsap.fromTo(main.value!,{
    opacity:0,
  },{
    opacity:1,
    duration:1.2,
    ease:'sine.in'
  })
})
</script>