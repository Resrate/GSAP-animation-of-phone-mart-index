<style scoped>
#outer {
  display: flex;
  flex-direction: row;
  height: 21px;
  border: none;
}
:deep(a) {
  text-decoration: none;
}
.items {
  position: relative;
  z-index: 10;
  width: 20vw;
  color: white;
  background-color: var(--maincolor);
  text-align: center;
  line-height: 21px;
  font-size: 108%;
  box-shadow: 4px 4px 1px rgba(0, 0, 0, 0.3);
  border-left: 1px solid white;
  border-right: 1px solid white;
  transition: font-weight 300ms ease-in-out;
  font-family: 楷体;
  &:hover {
    font-weight: bold;
  }
}
</style>

<template>
  <div id="outer">
    <router-link v-for="item in selectItem" :to="item.path">
      <div
        class="items"
        ref="items"
        @click="() => item.click()"
        @mouseover="() => item.over()"
        @mouseleave="() => item.leave()"
      >
        {{ item.name }}
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { store } from "../store";
import { onMounted, ref } from "vue";
import gsap from "gsap";
const { topSelectedItem } = storeToRefs(store());

const items = ref<HTMLElement[]>([]);
const preparedItemNames = [
  "首页",
  "消息",
  "购物车",
  "优惠",
  "我的商城",
] as const;
const preparedItemPathes = [
  "/index",
  "/message",
  "/shoppingCard",
  "/lower",
  "/myShop",
] as const;
const Item = class {
  static theLastClickId = 1;
  constructor(
    public name: "首页" | "消息" | "购物车" | "优惠" | "我的商城",
    public id: number,
    public path: string
  ) {}
  get element() {
    return items.value[this.id];
  }
  click(first = false) {
    topSelectedItem.value = this.name;
    if (this.id == Item.theLastClickId && !first) return;
    gsap.defaults({ duration: 0.4, ease: "sine.in" });
    selectItem.forEach((e) => {
      gsap.to(e.element!, {
        borderRadius: 0,
        borderColor: "white",
      });
    });
    gsap.to(selectItem[Item.theLastClickId]!.element!, {
      y: 0,
      color: "white",
      backgroundColor: "rgb(196,86,86)",
      boxShadow: "4px 4px 1px rgba(0,0,0,0.2)",
    });
    gsap.to(this.element!, {
      y: 3,
      color: "rgb(196, 86, 86)",
      backgroundColor: "rgba(0,0,0,0)",
      boxShadow: "0px 0px 0px white",
      borderColor: "rgba(0,0,0,0)",
    });
    Item.theLastClickId = this.id;
    if (this.id + 1 <= 4) {
      gsap.to(selectItem[this.id + 1]?.element!, {
        borderBottomLeftRadius: 15,
      });
    }
    if (this.id - 1 >= 0) {
      gsap.to(selectItem[this.id - 1]?.element!, {
        borderBottomRightRadius: 15,
      });
    }
  }
  over() {
    if(this.id==Item.theLastClickId) return;
    gsap.to(this.element!, {
      zIndex:20,
      boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.4)",
      duration:0.4
    });
  }
  leave(){
    if(this.id==Item.theLastClickId) return;
    gsap.to(this.element!,{
      zIndex:10,
      boxShadow:'4px 4px 1px rgba(0, 0, 0, 0.2)',
      duration:0.4
    })
  }
};
const selectItem = Array.from(
  { length: 5 },
  (_, index) =>
    new Item(preparedItemNames[index]!, index, preparedItemPathes[index]!)
);
onMounted(() => {
  selectItem[0]?.click(true);
  gsap.from(items.value!,{
    opacity:0,
    y:-21,
    duration:2,
    ease:'power1.out'
  });
});
</script>
