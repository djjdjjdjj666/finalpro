<template>
    <el-container>
        <el-main>
      <!-- 背景图 -->
      <div class="login-bg"></div>
  
      <!-- 登录表单卡片 -->
      <div class="login-form-container">
        <div class="login-card">
          <el-form
            :model="form"
            :rules="rules"
            ref="formRef"
            label-width="50px"
            class="login-form"
          >
            <h2 class="login-title">欢迎登录</h2>
            <el-form-item prop="username" class="login-item">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
                prefix-icon="el-icon-user"
                class="login-item"
              />
            </el-form-item>
            <el-form-item prop="password" class="login-item">
              <el-input
                v-model="form.password"
                placeholder="请输入密码"
                type="password"
                prefix-icon="el-icon-lock"
                class="login-item"
              />
            </el-form-item>
            <el-form-item class="login-item">
              <el-button type="primary" @click="login" class="login-button">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    
</el-main>
</el-container>
  </template>
  
  
  
  <script setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import axios from 'axios';
  
  // 表单数据
  const form = ref({
    username: '',
    password: ''
  });
  
  // 表单验证规则
  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  };
  
  // 表单引用
  const formRef = ref(null);
  
  // 登录方法
  const login = async () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          // 模拟发送登录请求
          const response = await axios.post('https://example.com/login', form.value);
  
          // 假设服务器返回的数据结构中有一个 token 字段
          const { token } = response.data;
  
          if (token) {
            // 将 token 存储到本地存储中
            localStorage.setItem('token', token);
            ElMessage.success('登录成功');
            // 这里可以添加跳转到其他页面的逻辑，例如使用 vue-router
            // router.push('/dashboard');
          } else {
            ElMessage.error('未获取到有效的 token');
          }
        } catch (error) {
          console.error('登录失败:', error);
          ElMessage.error('登录失败，请稍后重试');
        }
      } else {
        ElMessage.error('请填写完整的登录信息');
        return false;
      }
    });
  };
  </script>
  
<style>


.login-item{
    margin-left: -12px;
}

/* 背景图全屏显示 */
.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/image/im.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.6); /* 暗一点，突出前景 */
  z-index: 0;
}

/* 登录表单容器，垂直居中 */
.login-form-container {
  position: absolute;
  top: 332px;
  left: 94px;
  width: 88%;
  height: 27%;
  display: flex;
  justify-content: center;
  align-content: center !important;
}

/* 登录卡片样式 */
.login-card {
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.15); /* 半透明背景 */
  border-radius: 16px;
  padding: 40px 30px;
  backdrop-filter: blur(16px); /* 毛玻璃效果 */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.8s ease-out;
}

/* 表单标题 */
.login-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 24px;
}

/* 按钮美化 */
.login-button {
  width: 100%;
  font-size: 16px;
  padding: 12px 0;
  border-radius: 8px;
  margin-left: -12px;
}

common-layout {
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
width: 100%;
height: 100vh;
}

el-container {
height: 100%;
}


</style>    