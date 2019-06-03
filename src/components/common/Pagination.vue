<template>
  <div>
<!--     <h1>分页demo</h1>
    <ul class="page-table">
      <li v-for="(v, i) in pagingForm" :key="i"  :class="{page_table_active: v.status === true}">{{v.index}}</li>
    </ul> -->
    <div id="pagination-main">
      <div>共{{total}}条</div>
      <nav>
        <ul class="pagination">
          <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)">上一页</a></li>
          <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
          <li v-for="p in grouplist" :class="{'active': current == p.val}">
            <a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a>
          </li>
          <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li>
          <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)">下一页</a></li>
        </ul>
      </nav>
    </div>
  </div>

</template>
<script type="text/javascript">
  export default {
    name: 'index',
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      display: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.display);
      },
      grouplist: function () { // 获取分页页码
        var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
        // console.log(count);
        // console.log('计数');
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len});
          }
          return temp;
        }
        while (len--) {
          temp.push(this.page - len);
        }
        var idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do {
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }
        return list;
      }
    },
    data(){
      return {
        current: this.currentPage,
        pagingForm:[
          {
            index : 1,
            status : true,
          },
          {
            index : 2,
            status : false,
          },{
            index : 3,
            status : false,
          },{
            index : 4,
            status : false,
          },{
            index : 5,
            status : false,
          },
          {
            index : 6,
            status : false,
          },{
            index : 7,
            status : false,
          },
          {
            index : 8,
            status : false,
          },
          {
            index : 9,
            status : false,
          },{
            index : 10,
            status : false,
          },{
            index : 11,
            status : false,
          },{
            index : 12,
            status : false,
          }, {
            index : 13,
            status : false,
          },{
            index : 14,
            status : false,
          }, {
            index : 15,
            status : false,
          }
        ]
      }
    },
    mounted () {

    },
    methods:{
      //  分页
      setCurrent: function (idx) {
        var that = this
        this.pagingForm.forEach(function (v,i) {
          if(i+1 === idx){
            that.pagingForm[i].status = true
          }else{
            v.status = false
          }
          if(idx === 0){
            that.pagingForm[0].status = true
          }
          if(idx > that.pagingForm.length){
            that.pagingForm[that.pagingForm.length-1].status = true
          }
        })
        if (this.current != idx && idx > 0 && idx < this.page + 1) {
          this.current = idx;
          this.$emit('pagechange', this.current);
        }
      }
    },
    components: {

    },
    created(){
    }
  }
</script>
<style lang="scss" scoped="">
  @import "../../assets/mixin.scss";
  .page-table{
    li{
      width: 100%;
      height: 30px;
      background: green;
      margin-bottom: 10px;
      display: none;
    }
    .page_table_active{
      display: block;
    }
  }
  #pagination-main{
    padding-top: 30px;
    overflow: hidden;
    > div:nth-child(1){
      line-height: 48px;
      float: left;
    }
  }
  .pagination {
    overflow: hidden;
    display: table;
    margin: 0 auto;
    color: #6e757a;
    li {
      float: left;
      background-color: #f4f7fa;
      border: solid 1px #e1e3e5;
      margin: 3px;
      color: #666;
      & :hover {
        color: $green;
        a {
          color: #fff;
        }
      }
      a {
        display: block;
        line-height: 36px;
        padding: 0 14px;
        text-align: center;
        font-size: 16px;
        text-decoration: none;
        color: #6e757a;
      }
    }
    .active {
      background: $green;

      a {
        color: #fff;
      }

    }
  }
  nav{
    float: right;
  }
</style>
