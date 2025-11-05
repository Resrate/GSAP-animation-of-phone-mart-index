<style scoped>
#show_outer {
  position: relative;
  height: 220px;
  width: 70vw;
  margin-top: 20px;
  margin-left: 3vw;
  padding-left: 2vw;
  display: flex;
  flex-direction: row;
  #light {
    left: -50px;
    top: 0;
    z-index: 100;
    position: absolute;
    height: 10vh;
    width: 300px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.9),
      transparent
    );
    transform: rotate(-45deg);
  }
  .items {
    border: 3px solid var(--maincolor);
    position: absolute;
    color: var(--maincolor);
    background-color: white;
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    height: 100px;
    width: 200px;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
    transition: box-shadow 300ms ease;
    &:hover {
      box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.4);
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-family: 楷体;
      font-weight: bold;
    }
    .img {
      height: 100px;
      width: 100px;
      img {
        height: 100px;
        width: 100px;
        border-radius: 16px;
      }
    }
    .f1 {
      color: black;
    }
    .f2 {
      padding-top: 10px;
      font-size: 120%;
    }
    span {
      font-size: 150%;
      display: inline-block;
    }
  }
}
</style>

<template>
  <div id="show_outer">
    <div v-for="value in phoneArr" ref="items" class="items" @mouseenter="()=>value.mouseenter()">
      <div class="img">
        <img src="@/assets/img/OPPO.png" v-if="value.name == '荣耀'" />
        <img src="@/assets/img/苹果.png" v-if="value.name == '苹果'" />
        <img src="@/assets/img/华为.png" v-if="value.name == '华为'" />
        <img src="@/assets/img/OPPO.png" v-if="value.name == 'OPPO'" />
        <img src="@/assets/img/VIVO.png" v-if="value.name == 'VIVO'" />
        <img src="@/assets/img/小米.png" v-if="value.name == '小米'" />
      </div>
      <div class="right">
        <div class="f1">{{ value.name }}手机</div>
        <div class="f2">
          低至<span ref="spans">{{ value.prase }}</span>折
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref } from "vue";

const spans=ref<HTMLElement[]>([]);
const items = ref<HTMLElement[]>([]);
class ShowItem {
  static toId = 0;
  constructor(public name: string, public id: number, public prase: number) {}
  get element() {
    return items.value[this.id];
  }
  start() {
    gsap.set(this.element!, {
      x: (this.id % 4) * 230,
      y: Math.floor(this.id / 4) * 110,
    });
  }
  up() {
    gsap.to(this.element!, {
      y: Math.floor(this.id / 4) * 110 - 10,
      delay: (this.id % 4) * 0.05,
      duration: 0.08,
      repeat: 3,
      yoyo: true,
      ease: "power1.out",
    });
  }
  mouseenter(){
    gsap.fromTo(spans.value[this.id]!,{
      y:0,
    },{
      y: -10,
      duration: 0.08,
      repeat: 7,
      yoyo: true,
      ease: "power1.out",
    })
  }
}
const phoneArr = Array.from(
  { length: 8 },
  (_, i) =>
    new ShowItem(
      ["苹果", "华为", "小米", "OPPO", "VIVO", "荣耀", "苹果", "华为"][i]!,
      i,
      5
    )
);
onMounted(() => {
  phoneArr.forEach((e) => {
    e.start();
  });
  setTimeout(async () => {
    phoneArr.forEach((e) => {
      e.up();
    });
  }, 500);
});
</script>
