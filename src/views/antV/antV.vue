<template>
    <div>
<div id="container"></div>
    </div>
</template>
<script>
import { Graph } from '@antv/x6';
const data = {
  // 节点
  nodes: [
    {
      id: '1', // String，可选，节点的唯一标识
      x: 10, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
      shape: 'circle', // 形状
      attrs: {
        body: {
          fill: '#2ECC71',
          stroke: '#ccc', // 边框颜色
          strokeDasharray: '10,2'// 虚线
        },
        label: {
          text: 'Hello',
          fill: '#ea2f44',
          fontSize: 16
        }
      }
    },
    {
      id: '2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
      shape: 'circle', // 形状
      attrs: {
        body: {
          fill: '#F39C12',
          stroke: '#000',
          rx: 16,
          ry: 16
        },
        label: {
          text: 'World',
          fill: '#333',
          fontSize: 18,
          fontWeight: 'bold',
          fontVariant: 'small-caps'
        }
      }
    }
  ],
  // 边
  edges: [
    {
      source: '2', // String，必须，起始节点 id
      target: '1' // String，必须，目标节点 id
    }
  ]
};
export default {
  data () {
    return {
      data: data
    };
  },
  computed: {
  },
  methods: {
    init () {
      const graph = new Graph({
        container: document.getElementById('container'),
        width: 800,
        height: 600,
        background: {
          color: '#fffbe6'
        },
        grid: {
          size: 10, // 网格大小 10px
          visible: true // 渲染网格背景
        }
      });
      graph.fromJSON(this.data);
      // graph.scale(0.5, 0.5);// 缩放画布
      // graph.translate(100, 40);// 平移画布

      graph.on('node:move', function (e, x, y, node, view) {
        console.log(graph.toJSON({ diff: true }));
      });
    }
  },
  created () {
    this.$nextTick(() => {
      this.init();
    });
  }
};
</script>

<style scoped lang="sass">
</style>
