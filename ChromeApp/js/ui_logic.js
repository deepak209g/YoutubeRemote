var Main = {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')