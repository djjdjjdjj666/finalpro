<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >

      <el-sub-menu index="2">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>常用网址</span>
            </template>
      <el-menu-item-group>
              <el-menu-item index="/container/mainmenu/learn">学习</el-menu-item>
              <el-menu-item index="/container/mainmenu/entertain">娱乐</el-menu-item>
              <el-menu-item index="/container/mainmenu/tool">工具</el-menu-item>
            </el-menu-item-group>
      </el-sub-menu>

        <el-menu-item @click="outerVisible = true">
          <el-icon><document /></el-icon>
          <span>关于</span>
        </el-menu-item>
      </el-menu>
      <div class="toggle-btn" @click="toggleCollapse">
        <el-icon>
          <arrow-left v-if="!isCollapse" />
          <arrow-right v-else />
        </el-icon>
      </div>
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <div class="header-left">
          <span>常用网址</span>
        </div>
        <div class="header-right">
          <el-button type="text" @click="openLoginDialog">
            <el-icon><user /></el-icon> 登录
          </el-button>
          <!-- 设置下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <el-button type="text">
              <el-icon><setting /></el-icon> 设置
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="add">添加</el-dropdown-item>
                <el-dropdown-item command="delete">删除</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主内容 -->
      <el-main class="main">
        <router-view />

        <!-- 弹出对话框 -->
    <el-dialog v-model="outerVisible" title="Thanks" width="500" align-center="true">
    <span>
      Github地址：https://github.com/djjdjjdjj666/finalpro.git
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>

      </el-main>
    </el-container>

  </el-container>
  
</template>

<script setup>
import { ref } from "vue";
import {
  Menu as IconMenu,
  HomeFilled,
  Document,
  User,
  Setting,
  ArrowLeft,
  ArrowRight,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const outerVisible = ref(false)
// 菜单展开/收起状态
const isCollapse = ref(false);
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

// 当前激活菜单
const activeMenu = ref("/");

// 登录对话框
const loginVisible = ref(false);

const openLoginDialog = () => {
  loginVisible.value = true;
};
const loginForm = ref({
  username: "",
  password: "",
});

const handleLogin = () => {
  alert(`登录成功！用户名：${loginForm.value.username}`);
  loginVisible.value = false;
};

function handleCommand(command) {
  switch (command) {
    case "add":
      console.log("添加功能未实现");
      router.push("/container/mainmenu/add");
      break;
    case "delete":
      router.push("/container/mainmenu/delete");
      break;
    case "logout":
      alert("退出登录功能未实现");
      break;
    default:
      break;
  }
}
</script>

<style scoped>

.login-form {
  width: 91%;
  max-width: 400px;
 
  margin: 0 auto;}

.icon{
  color: #ffffff;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.layout-container {
  height: 100vh;
}

.aside {
  background-color: #304156;
  transition: width 0.3s ease;
  overflow: hidden;
}

.toggle-btn {
  text-align: center;
  cursor: pointer;
  color: #fff;
  padding: 10px 0;
  background-color: #263445;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left span {
  font-size: 20px;
  font-weight: bold;
}

.header-right .el-button {
  margin-left: 10px;
}

.main {
  background-color: #f5f7fa;
  padding: 20px;
}

/* 动画 */
.el-menu {
  border-right: none;
}
</style>