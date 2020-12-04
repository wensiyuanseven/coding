<template>
  <div>
     <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
      <MyTree
        :data.sync="treeList"
        :fileDrop="fileDrop"
        :folderDrop="folderDrop"
        :delete="deleteFn"
      ></MyTree>
  </div>
</template>
<script>
import { getTressList } from './api.js';
import MyTree from './components/MyTree';
export default {
  data() {
    return {
      treeList: [],
      fileDrop: [ // 文件的下拉菜单选项
        {text: 'rm', value: '删除文件'},
      ],
      folderDrop: [
        {text: 'rn', value: '重命名'},
        {text: 'rm', value: '删除文件夹'},
      ]
    }
  },
  components: {
    MyTree,
  },
  methods: {
    deleteFn() { // 这个方法必须返回一个promise
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      })
    }
  },
  async mounted() {
    let {data} = await getTressList();
    data.parent.forEach(p => p.type = 'parent');
    // 1) 扁平的数据 => 多层数据
    // 将父节点的数组与子节点的数据进行合并遍历
    this.treeList = [...data.parent, ...data.child];
  },
}
</script>