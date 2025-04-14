<template>
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="网页名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入网页名称"></el-input>
      </el-form-item>
      <el-form-item label="网页网址" prop="url">
        <el-input v-model="formData.url" placeholder="请输入网页网址"></el-input>
      </el-form-item>
    <div class="select-container">
      <span style="font-size: 14px;margin-left:4px;color:#606266">&emsp;&emsp;选择目录</span>
      <span style="margin-right: 10px;margin-left:12px">
        
      
      <el-select
      v-model="valueFirst"
      placeholder="一级目录"
      style="width: 200px"
    >
      <el-option
        v-for="item in optionsFirst"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
      &emsp;&emsp;
    </el-select>
  </span>
  <span>
    <el-select v-model="formData.type" placeholder="二级目录" style="width: 200px">
      <el-option
        v-for="(item, keys, index) in optionsSecond"
        :key="index"
        :label="keys"
        :value="keys"
        />
      
    </el-select>

  </span>
  </div>
      <el-form-item style="margin-top: 12px;">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script setup>

    import axios from 'axios';
    import { ref, watch } from 'vue';
    import { ElMessage } from 'element-plus';
    import { useRouter } from 'vue-router';

    const optionsFirst = [
      { value: 'learn', label: '学习' },
      { value: 'entertain', label: '娱乐' },
      { value: 'tool', label: '工具' }
    ];

    const optionsSecond = ref([]);

    const valueFirst = ref('');
    const valueSecond = ref('');

    const router = useRouter();

    // 表单数据
    const formData = ref({
      name: '',
      url: '',
      type: ''
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
      ],
      type: [
        { required: true, message: '请选择二级目录', trigger: 'change blur' }
  ]
    };

    // 重置表单
    const resetForm = () => {
      router.go(-1);
    };

    // 提交表单
    const submitForm = () => {
      formRef.value.validate((valid) => {
        if (valid && valueFirst.value && formData.value.type) {
          // 这里可以添加实际的提交请求代码，例如使用 axios 发送请求
          switch(valueFirst.value) {
            case 'learn':
                axios.post('http://localhost:8080/insertSite_Learn', formData.value)
                .then(response => {
                  console.log('提交成功:', response.data);
                })
                .catch(error => {
                  console.error('提交失败:', error);
                });
                ElMessage.success('表单提交成功');
                console.log('表单数据:', formData.value);
                resetForm();
                break;
            case 'entertain':
              axios.post('http://localhost:8080/insertSite_Entertain', formData.value)
                .then(response => {
                  console.log('提交成功:', response.data);
                })
                .catch(error => {
                  console.error('提交失败:', error);
                });
                ElMessage.success('表单提交成功');
                console.log('表单数据:', formData.value);
                resetForm();
                break;
            case 'tool':
              axios.post('http://localhost:8080/insertSite_Tool', formData.value)
                .then(response => {
                  console.log('提交成功:', response.data);
                })
                .catch(error => {
                  console.error('提交失败:', error);
                });
                ElMessage.success('表单提交成功');
                console.log('表单数据:', formData.value);
                resetForm();
              break;
            default:
              ElMessage.error('请填写完整且有效的信息');
              break;
          }
        } else {
          let errorMsg = '';
          if (!valueFirst.value) {
            errorMsg += '请选择一级目录；';
          }
          if (!formData.value.type) {
            errorMsg += '请选择二级目录；';
          }
          ElMessage.error(errorMsg);
        }
      });
    };

    // 监听一级目录的变化，动态获取二级目录
    watch(valueFirst, (newValue) => {
        switch(newValue) {
          case 'learn':
            axios.get('http://localhost:8080/selectLearnCategory')
            .then(response => {
              console.log('获取学习目录成功:', response.data);
              optionsSecond.value = response.data;
            })
            break;
          case 'entertain':
            axios.get('http://localhost:8080/selectEntertainCategory')
            .then(response => {
              console.log('获取娱乐目录成功:', response.data);
              optionsSecond.value = response.data;
            })
            break;
          case 'tool':
            axios.get('http://localhost:8080/selectToolCategory')
            .then(response => {
              console.log('获取工具目录成功:', response.data);
              optionsSecond.value = response.data;
            })
            break;
        }
    });

  </script>
  
<style>

/* 可以添加自定义样式 */
.select_container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

</style>    