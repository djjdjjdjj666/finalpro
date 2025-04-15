<template>
  <div>
    <div v-for="(values, key, index) in siteItem" :key="index"  class="site-item">

      <el-divider content-position="left" class="driver">{{ key }}</el-divider>
      <span v-for="(value, index) in values" :key="index">
        <!-- 修改 a 标签的 class 为 button 类 -->
        <a :href="value[1]" class="button">{{ value[0] }}</a>
      </span>
      <br><br><br>
    </div>
  </div>
  
</template>

<script setup>
import { ref,watch,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const router = useRoute();

const siteItem = ref([]);


//()=> router.path 等于 
//()=> {return router.path}
watch(() => router.path, (newPath) => {
switch(newPath) {

  case '/container/mainmenu/learn':
    axios.get('/api/selectLearnCategory').then((response) => {
      console.log(response.data);
      siteItem.value = response.data;
    });
    break; // 学习

  case '/container/mainmenu/entertain':
    axios.get('/api/selectEntertainCategory').then((response) => {
      siteItem.value = response.data;
    });
    break; // 娱乐

  case '/container/mainmenu/tool':
    axios.get('/api/selectToolCategory').then((response) => {
        siteItem.value = response.data;
      });
    break; // 工具
    }

})

onMounted(() => {
switch(router.path) {

  case '/container/mainmenu/learn':
    axios.get('/api/selectLearnCategory').then((response) => {
      console.log(response.data);
      siteItem.value = response.data;
    });
    break; // 学习

  case '/container/mainmenu/entertain':
    axios.get('/api/selectEntertainCategory').then((response) => {
      siteItem.value = response.data;
    });
    break; // 娱乐

  case '/container/mainmenu/tool':
    axios.get('/api/selectToolCategory').then((response) => {
        siteItem.value = response.data;
      });
    break; // 工具
    }
})

  





  
  



</script>

<style scoped>

.site-item {

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

}

/* 定义按钮样式 */
.button {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  margin-right: 10px;
  background-color: #e7ecf0;
  color: rgb(0, 0, 0);
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

/* 鼠标悬停效果 */
.button:hover {
  background-color: #0056b3;
}

/* 鼠标点击效果 */
.button:active {
  background-color: #003d80;
}



/* 覆盖 el-divider 的文字样式 */
.el-divider__text  {
    background-color: #f5f7fa !important;
} 
 

</style>

<style>

.el-divider__text  {
    background-color: #f5f7fa !important;
} 

</style>
    