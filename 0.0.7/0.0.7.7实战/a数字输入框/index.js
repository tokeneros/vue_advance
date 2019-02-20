// 根实例
var app = new Vue({
    el: '#app',
    data: {
        value: 5
    },
    methods: {
        KeyUpEsc:function(){
            alert("监听到esc键");
        }
    }
});