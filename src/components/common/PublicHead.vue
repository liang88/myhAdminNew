<template>
  <div id="index">
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
    <p>4页面</p>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'index',
    data(){
      return {

      }
    },
    mounted () {
      this.$post('http://www.manyihefc.com:8080/myh_management/agentLoginVsCode',{
        loginMobile: 1,
        password: 1,
        valiCode: 123123,
        clientType: 2
      }).then(response => {
        console.log(response)
        console.log(this.$url)
      })
    },
    components: {

    }
  }
</script>
