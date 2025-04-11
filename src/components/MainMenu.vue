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
        active-text-color="#409EFF"
        router
      >
        <el-menu-item index="/">
          <el-icon><home-filled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/about">
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
          <span>管理系统</span>
        </div>
        <div class="header-right">
          <el-button type="text" @click="openLoginDialog">
            <el-icon><user /></el-icon> 登录
          </el-button>
          <el-button type="text">
            <el-icon><setting /></el-icon> 设置
          </el-button>
        </div>
      </el-header>

      <!-- 主内容 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>

    <!-- 登录对话框 -->
    <el-dialog v-model="loginVisible" title="登录" width="30%">
      <el-form :model="loginForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="loginVisible = false">取消</el-button>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup>
import { ref } from "vue";
import {
  HomeFilled,
  Document,
  User,
  Setting,
  ArrowLeft,
  ArrowRight,
} from "@element-plus/icons-vue";

// 菜单展开/收起状态


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
</script>

<style scoped>
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