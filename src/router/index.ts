import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import index from "../components/main/index.vue";
import message from "../components/main/message.vue";
import myShop from "../components/main/my_shop.vue";
import shoppingCard from "../components/main/shopping_card.vue";
import lower from "../components/main/lower.vue";
import type { Component } from "vue";
const createRoute=(path:string,name:string,component:Component):RouteRecordRaw=>({path,name,component})
const routes=[
  {path:'/',redirect:'/index'},
  createRoute('/index','index',index),
  createRoute('/message','message',message),
  createRoute('/shoppingCard','shoppingCard',shoppingCard),
  createRoute('/lower','lower',lower),
  createRoute('/myShop','myShop',myShop),
]
export default createRouter({
  history:createWebHistory(),
  routes
})