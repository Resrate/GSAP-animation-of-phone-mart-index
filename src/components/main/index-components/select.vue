<style scoped>
#outer_select {
  position: relative;
  margin-top: 20px;
  margin-left: 5vw;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 3px solid var(--maincolor);
  border-radius: 20px;
  color: var(--maincolor);
  width: 8vw;
  height: 210px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
  transition: box-shadow 300ms ease;
  &:hover{
    box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.4);
  }
  .item{
    text-align: center;
    font-size: 160%;
    font-weight: bold;
    font-family: 楷体;
    padding: 3px;
    transition: text-shadow 400ms ease,transform 400ms ease;
    &:hover{
      text-shadow: 3px 3px 2px rgba(196, 86, 86, 0.6);
      transform: translateY(-3px);
    }
  }
  #boxin{
    background-color: rgba(196, 86, 86, 0.2);
    position: absolute;
    top: -35px;
    height: 35px;
    width: 8vw;
    opacity: 0;
    pointer-events: none;
  }
}
</style>

<template>
  <div id="outer_select" @mouseleave="SelectDiv.leave">
    <div id="boxin" ref="boxin"></div>
    <div
      v-for="item in selectDivArr"
      class="item"
      ref="items"
      @mouseenter="()=>item.hover()"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import gsap from "gsap"
class SelectDiv{
  static over=false;
  constructor(
    public name:string,
    public id:number,
  ){}
  hover(){
    gsap.defaults({duration:0.4,ease:'sine'})
    if(SelectDiv.over){
      gsap.to(boxin.value!,{y:this.id*35+35,opacity:1});
    }else{
      gsap.fromTo(boxin.value!,{y:this.id*35+35,opacity:0},{opacity:1}); 
    }
    if(this.name=="苹果"||this.name=="荣耀"){
      gsap.to(boxin.value!,{borderRadius:20});
    }else{
      gsap.to(boxin.value!,{borderRadius:10})
    }
    gsap.to(boxin.value!,{boxShadow:' inset -2px -2px 1px rgba(196,86,86,0.6)'})
    SelectDiv.over=true
  }
  static leave(){
    SelectDiv.over=false;
    gsap.to(boxin.value!,{opacity:0}).then(()=>{
      gsap.set(boxin.value!,{y:-35});
    })
  }
}
const items=ref<HTMLElement>()
const boxin=ref<HTMLElement>()
const phone=['苹果','华为','小米','OPPO','VIVO','荣耀']
const selectDivArr=Array.from({length:6},(_,i)=>new SelectDiv(phone[i]!,i))
</script>
