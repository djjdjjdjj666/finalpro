<template>
    <div class="login-container">
      <el-card class="login-box">
        <h2 class="title">用户登录</h2>
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="80px">
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm(loginFormRef)" style="width: 100%">
              登录
            </el-button>
          </el-form-item>
        </el-form>

      </el-card>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  

  const router = useRouter();
  // 表单引用
  const loginFormRef = ref(null);
  
  // 表单数据
  const loginForm = reactive({
    username: '',
    password: '',
  });
  
  // 表单校验规则
  const rules = reactive({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 15, message: '用户名长度应在 3 到 15 个字符之间', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度应在 6 到 20 个字符之间', trigger: 'blur' },
    ],
  });
  
  // 提交表单
  const submitForm = (formEl) => {
    if (!formEl) return;
    formEl.validate((valid) => {
      if (valid) {
        axios.post('/api/login', loginForm).then((response) => {
          if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            ElMessage.success('登录成功！');
            // 登录成功后可以进行页面跳转或其他操作
            router.go(-1)
          } else {
            ElMessage.error('用户名或密码错误！');
          }
        }).catch((error) => {
          console.error('登录请求失败:', error);
          ElMessage.error('登录请求失败，请稍后再试！');
        });
        console.log('提交的表单数据:', loginForm);
      } else {
        ElMessage.error('请检查输入是否正确！');
        return false;
      }
    });
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
  }
  
  .login-box {
    width: 400px;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #303133;
  }
  
  .register-link {
    text-align: center;
    font-size: 14px;
    color: #909399;
  }
  
  .register-link a {
    color: #409eff;
    text-decoration: none;
  }
  </style>