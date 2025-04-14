<template>
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="选择一级目录">
            <el-select v-model="valueFirst" placeholder="一级目录" style="width: 200px">
                <el-option
                        v-for="item in optionsFirst"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                />
            </el-select>
        </el-form-item>
        <el-form-item label="选择二级目录">
            <el-select v-model="valueSecond" placeholder="二级目录" style="width: 200px">
                <el-option
                        v-for="(item, key, index) in optionsSecond"
                        :key="index"
                        :label="key"
                        :value="key"
                />
            </el-select>
        </el-form-item>
        <el-form-item label="待删除网址列表">
            <div v-if="urls.length > 0">
                <el-checkbox-group v-model="selectedUrls">
                    <el-checkbox v-for="(url, index) in urls" :key="index" :label="url">{{ url.name }}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div v-else>
                <p>当前二级目录下暂无网址</p>
            </div>
        </el-form-item>
        <el-form-item style="margin-top: 12px;">
            <el-button @click="resetForm">取消</el-button>
            <el-button type="danger" @click="submitForm">确定删除</el-button>
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
const urls = ref([]);
const selectedUrls = ref([]);

const valueFirst = ref('');
const valueSecond = ref('');

const router = useRouter();

// 表单数据（这里表单数据可根据实际需求扩展，目前主要用于选择操作）
const formData = ref({});

// 表单引用
const formRef = ref(null);

// 表单验证规则（可根据实际需求添加更多验证）
const rules = {};

// 重置表单（返回上一页）
const resetForm = () => {
    router.go(-1);
};

// 提交表单（删除选中网址）
const submitForm = () => {
    if (selectedUrls.value.length === 0) {
        ElMessage.warning('请至少选择一个网址进行删除');
        return;
    }
    const deletePromises = selectedUrls.value.map(url => {
        let deleteUrl = '';
        switch (valueFirst.value) {
            case 'learn':
                deleteUrl = `http://localhost:8080/deleteSite_Learn?url=${url}`;
                break;
            case 'entertain':
                deleteUrl = `http://localhost:8080/deleteSite_Entertain?url=${url}`;
                break;
            case 'tool':
                deleteUrl = `http://localhost:8080/deleteSite_Tool?url=${url}`;
                break;
        }
        return axios.delete(deleteUrl);
    });
    Promise.all(deletePromises)
      .then(() => {
            ElMessage.success('删除成功');
            resetForm();
        })
      .catch(error => {
            ElMessage.error('删除失败:' + error.message);
        });
};

// 监听一级目录的变化，动态获取二级目录
watch(valueFirst, (newValue) => {
    switch (newValue) {
        case 'learn':
            axios.get('http://localhost:8080/selectLearnCategory')
              .then(response => {
                    console.log('获取学习目录成功:', response.data);
                    optionsSecond.value = response.data;
                    urls.value = [];
                });
            break;
        case 'entertain':
            axios.get('http://localhost:8080/selectEntertainCategory')
              .then(response => {
                    console.log('获取娱乐目录成功:', response.data);
                    optionsSecond.value = response.data;
                    urls.value = [];
                });
            break;
        case 'tool':
            axios.get('http://localhost:8080/selectToolCategory')
              .then(response => {
                    console.log('获取工具目录成功:', response.data);
                    optionsSecond.value = response.data;
                    urls.value = [];
                });
            break;
    }
});

// 监听二级目录的变化，动态获取该二级目录下的所有网址

watch(valueSecond, (newValue) => {
    if (!newValue) return;
    let getUrl = '';
    switch (valueFirst.value) {
        case 'learn':
            getUrl = `http://localhost:8080/selectTypeSite_Learn`;
            break;
        case 'entertain':
            getUrl = `http://localhost:8080/selectTypeSite_entertain`;
            break;
        case 'tool':
            getUrl = `http://localhost:8080/selectTypeSite_Tool`;
            break;
    }
    axios.post(getUrl, {type:newValue})
      .then(response => {
            console.log('获取网址成功:', response.data);
            urls.value = response.data;
        })
      .catch(error => {
            console.error('获取网址失败:', error);
        });
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