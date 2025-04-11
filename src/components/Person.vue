<template>
    
    <h1>Hello{{ name }}</h1>

</template>

<script setup>
import { ref,watch,computed } from 'vue';
import { reactive } from 'vue';

//v-bind单向绑定 一个冒号:即可
//v-model双向绑定


//ref是响应式数据，reactive是响应式对象
//一般全用ref
let name = ref("djj")

function changeName() {
    //ref定义的数据在修改时要用.value
    name.value = "djjj"
}

watch(name,(newValue,oldValue) => {
    console.log("name的值发生了变化",newValue,oldValue)
}, {deep:true, immediate:true})
//第一个参数是要监听的值，第二个参数是回调函数，第三个参数是选项对象
//deep:true表示深度监听能监视内部属性的变化，immediate:true表示立即执行回调函数

</script>

<style scoped>

</style>