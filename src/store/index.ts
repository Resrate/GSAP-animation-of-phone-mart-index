import { defineStore } from "pinia";
import { ref } from "vue";

export const store= defineStore('aaa',()=>{
  let topSelectedItem=ref('首页' as '首页'|'消息'|'购物车'|'优惠'|'我的商城');
  return {topSelectedItem};
})