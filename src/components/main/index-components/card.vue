<style scoped>
#outer_card {
  position: relative;
  margin-top: 20px;
  .card {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 13vw;
    height: 330px;
    background-color: white;
    border-radius: 16px;
    box-shadow: inset -4px -4px 2px rgba(0, 0, 0, 0.2);
  }
  .img {
    width: 13vw;
    height: 13vw;
    padding: 0.5vw;
    img {
      width: 12vw;
      height: 12vw;
      border-radius: 13px;
    }
  }
  #f1 {
    color: black;
    width: 12.8vw;
    border-top: 2px solid var(--maincolor);
    text-align: center;
    height: 48px;
    line-height: 48px;
  }
  #f2 {
    font-size: 250%;
    font-weight: bolder;
    margin: 0px auto;
    background-color: var(--maincolor);
    color: white;
    border-radius: 20px;
    padding: 10px 15px;
    margin-top: 10px;
    line-height: 100%;
  }
  .f3{
    font-size: 200% !important;
  }
}
</style>

<template>
  <div id="outer_card">
    <div v-for="value in phoneArr" ref="cards" class="card">
      <div class="img">
        <img src="@/assets/img/OPPO.png" v-if="value.name.startsWith('OPPO')" />
        <img
          src="@/assets/img/苹果.png"
          v-if="value.name.startsWith('iPhone')"
        />
        <img src="@/assets/img/华为.png" v-if="value.name.startsWith('华为')" />
        <img src="@/assets/img/荣耀.png" v-if="value.name.startsWith('荣耀')" />
        <img src="@/assets/img/VIVO.png" v-if="value.name.startsWith('vivo')" />
        <img src="@/assets/img/小米.png" v-if="value.name.startsWith('小米')" />
      </div>
      <div id="f1">{{ value.name }}</div>
      <div id="f2" :class="value.prase.toString().length==5?'f3':'f4'">{{ value.prase }}|抢</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import phoneObj from "@/assets/json/phone.json";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
const cards = ref<HTMLElement[]>([]);
const vwToPixels = (vw: number) => Math.floor((vw * window.innerWidth) / 100);
class ShowItem {
  constructor(public name: string, public id: number, public prase: number) {}
  get element() {
    return cards.value[this.id];
  }
  start() {
    gsap.set(this.element!, {
      x: vwToPixels((this.id % 6) * 15.2),
      y: Math.floor(this.id / 6) * 340,
    });
  }
}
const brandArr = ["苹果", "华为", "小米", "OPPO", "VIVO", "荣耀"] as const;
let index = 0,
  pageIndex = 0;
const phoneArr = reactive([] as ShowItem[]);
const add = () => {
  const arr = [] as ShowItem[];
  for (const str of brandArr) {
    for (let i in phoneObj[str]) {
      let a=i as keyof typeof phoneObj[typeof str]
      arr.push(new ShowItem(i, index, phoneObj[str][a]));
      index++;
    }
  }
  for (const [i, item] of arr.entries()) {
    const index = Math.floor(Math.random() * arr.length);
    arr[i] = arr[index]!;
    arr[index] = item;
  }
  phoneArr.push(...arr);
  pageIndex++;
  nextTick(() => {
    arr.forEach((e) => {
      e.start();
    });
    gsap.registerPlugin(ScrollTrigger);
    cards.value.forEach((el) => {
      gsap.fromTo(el, {
        opacity: 0,
      },{
        opacity:1,
        duration: 0.8,
        ease: "power1.in",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    });
  });
};
onMounted(() => {
  add();
});
window.addEventListener("scroll", () => {
  if (window.scrollY >= window.innerHeight * 6 * pageIndex) {
    add();
  }
});
</script>
