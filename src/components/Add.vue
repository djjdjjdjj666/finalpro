<template>
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="网页名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入网页名称"></el-input>
      </el-form-item>
      <el-form-item label="网页网址" prop="url">
        <el-input v-model="formData.url" placeholder="请输入网页网址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();

  // 表单数据
  const formData = ref({
    name: '',
    url: ''
  });
  
  // 表单引用
  const formRef = ref(null);
  
  // 表单验证规则
  const rules = {
    name: [
      { required: true, message: '请输入网页名称', trigger: 'blur' }
    ],
    url: [
      { required: true, message: '请输入网页网址', trigger: 'blur' },
      { pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, message: '请输入有效的网址', trigger: 'blur' }
    ]
  };
  
  // 重置表单
  const resetForm = () => {
    router.push('/');
  };
  
  // 提交表单
  const submitForm = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        // 这里可以添加实际的提交请求代码，例如使用 axios 发送请求
        ElMessage.success('表单提交成功');
        console.log('表单数据:', formData.value);
        // 提交成功后可以选择重置表单
        resetForm();
      } else {
        ElMessage.error('请填写完整且有效的信息');
      }
    });
  };
  </script>
  
  <style scoped>
  /* 可以添加自定义样式 */
  </style>    