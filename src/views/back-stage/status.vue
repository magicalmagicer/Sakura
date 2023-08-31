<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>登录信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <div class="box">
      <div class="first">
        <div id="pie"></div>
        <div id="echart"></div>
        <el-select v-model="yearVal" placeholder="选择年份" @change="selectYear" class="yearselect" size="mini">
          <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-select v-model="value" placeholder="选择月份" @change="selectMonth()" class="monthselect" size="mini">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div class="second">
        <dv-scroll-board :config="config" style="width: 100%; height: 580px" />
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
export default {
  name: 'Status',
  data() {
    return {
      loginData: [],
      pieStatus: false,
      yearData: [],
      yearVal: '',
      year: '',
      years: [
        {
          value: '2022',
          label: '2022年',
        },
        {
          value: '2023',
          label: '2023年',
        },
      ],
      options: [
        {
          value: '1',
          label: '1月',
        },
        {
          value: '2',
          label: '2月',
        },
        {
          value: '3',
          label: '3月',
        },
        {
          value: '4',
          label: '4月',
        },
        {
          value: '5',
          label: '5月',
        },
        {
          value: '6',
          label: '6月',
        },
        {
          value: '7',
          label: '7月',
        },
        {
          value: '8',
          label: '8月',
        },
        {
          value: '9',
          label: '9月',
        },
        {
          value: '10',
          label: '10月',
        },
        {
          value: '11',
          label: '11月',
        },
        {
          value: '12',
          label: '12月',
        },
      ],
      value: '',
      month: '',
      config: {},
    };
  },
  created() {
    this.month = new Date().getMonth() + 1;
    this.getLoginData();
    this.$nextTick();
  },
  methods: {
    showPie(data) {
      //检测是否已经存在echarts实例，如果不存在，则不再去初始化
      let pie = this.$echarts.getInstanceByDom(document.getElementById('pie'));
      if (!this.pieStatus) {
        pie = this.$echarts.init(document.getElementById('pie'));
        this.pieStatus = true;
      }
      if (data.length < 1) {
        let pieData = {
          title: {
            text: this.year + '年用户登录信息',
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            show: false,
          },
          series: [
            {
              // name: 'Access From',
              type: 'pie',
              radius: '70%',
              data: [{ value: 1048, name: '暂无数据' }],
              center: ['50%', '50%'],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
              labelLine: {
                show: false, //隐藏指示线
              },
              label: {
                show: false,
                // formatter: '' //自定义显示格式(b:name, c:value, d:百分比)
              },
            },
          ],
        };
        pie.setOption(pieData);
        window.addEventListener('resize', function () {
          pie.resize();
        });
        return;
      }
      let processedData = {};

      for (let i = 0; i < data.length; i++) {
        let key = data[i].nickname || data[i].username;
        if (key in processedData) {
          processedData[key] = processedData[key] + 1;
        } else {
          processedData[key] = 1;
        }
      }
      let nameData = [];
      for (let key in processedData) {
        nameData.push({ value: processedData[key], name: key });
      }
      let pieData = {
        title: {
          text: this.year + '年用户登录信息',
        },

        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            // params就是数据，这里可以打印一下看看
            // return 出去什么，鼠标移入就显示什么,marker就是提示前面蓝色的圆点
            return `<strong>${params.data.name}</strong>: ${params.data.value} 次`;
          },
        },
        legend: {
          show: false,
        },
        series: [
          {
            // name: 'Access From',
            type: 'pie',
            radius: '70%',
            data: nameData,
            center: ['50%', '50%'],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: {
              show: true,
              formatter: '{b} ({d}%)', //自定义显示格式(b:name, c:value, d:百分比)
            },
          },
        ],
      };
      pie.setOption(pieData);
      window.addEventListener('resize', function () {
        pie.resize();
      });
    },
    showEchart(monthsData) {
      var myChart = this.$echarts.init(document.getElementById('echart'));
      let lineData = monthsData.map((i) => i.length || 0);
      var month = new Date().getMonth() + 1;
      this.showPie(monthsData[month - 1]);
      let option = {
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: true,
          formatter: (params) => {
            // params就是数据，这里可以打印一下看看
            // console.log();
            let month = params[0].data[0];
            let times = params[0].data[1];
            // return 出去什么，鼠标移入就显示什么,marker就是提示前面蓝色的圆点
            return `<strong>${month}</strong></></br>${params[0].marker} 登录数：${times}次`;
          },
        },
        dataset: {
          source: [['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], lineData],
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0, show: true },
        grid: { top: '10%' },
        series: [
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
            lineStyle: {
              // 设置线条的style等
              color: '#EE6666', // 折线线条颜色:红色
            },
            itemStyle: {
              // 设置线条上点的颜色（和图例的颜色）
              color: 'orange',
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: 'red',
                  },
                  {
                    offset: 1,
                    color: 'yellow',
                  },
                ],
                global: false,
              },
            },
          },
        ],
      };

      myChart.on('updateAxisPointer', (event) => {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          // console.log(this.loginData[xAxisInfo.value]);
          this.showPie(this.loginData[xAxisInfo.value]);
        }
      });
      myChart.setOption(option);
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    },
    changeConfig() {
      console.log('触发了changeConfig' + this.value + '月');
      let num = Number(this.value) || new Date().getMonth() + 1;
      this.month = num;
      let currentData = [...this.loginData[num - 1]];
      currentData.reverse();
      let data = currentData.map((i) => [i.nickname, i.time.slice(0, 10) + ' ' + i.time.slice(11, 19), i.city]);
      this.config = {
        header: ['用户名', '登录时间', '登录地点'],
        indexHeader: '序号',
        rowNum: 16, // 表行数
        headerBGC: '#eb5a6d', // 表头背景色
        oddRowBGC: '#2991D5', // 奇数行背景色
        evenRowBGC: '#08BACD', // 偶数行背景色
        waitTime: 2000, // 轮播时间间隔(ms)
        align: ['center'],
        data: data,
      };
    },
    async getLoginData() {
      let year = this.yearVal || new Date().getFullYear();
      this.year = year;
      let { data: res } = await this.$http.get(this.$originUrl + '/admin/logininfo?id=' + Cookie.get('user_id') + '&year=' + year);
      if (res.status !== 0) return this.$message.info('获取用户登录数据失败！');
      this.loginData = res.data;
      this.showEchart(this.loginData);
      this.changeConfig();
    },
    selectMonth() {
      if (this.value && this.value !== this.month) {
        console.log(this.value, this.month);
        this.changeConfig();
      }
    },
    selectYear() {
      if (this.yearVal && this.yearVal !== this.year) {
        this.getLoginData();
      }
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .el-breadcrumb {
  margin-bottom: 10px;
}
.box {
  display: flex;
  flex-wrap: wrap;
  background: #fff;

  .first {
    // flex-shrink: 0;
    position: relative;
    height: 586px;
    // border: 1px solid red;
    box-sizing: border-box;
    padding: 10px;
    // width: 50%;
    flex: 3;
    #echart {
      width: 100%;
      height: 50%;
    }
    #pie {
      height: 50%;
    }
    .yearselect {
      position: absolute;
      top: 50px;
      left: 60px;
      transform: translateX(-50%);
      width: 100px;
    }
    .monthselect {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 100px;
    }
  }
  .second {
    width: 0;
    // flex-shrink: 0;
    height: 586px;
    margin: auto;

    flex: 2;
    .dv-scroll-board {
      overflow: hidden;
      border-radius: 8px;
      // display: flex;
      
    }
    .text {
      font-size: 14px;
    }

    .item {
      padding: 5px 0;
    }
  }
}
</style>
