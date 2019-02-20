// 全局注册
// 选项由钩子函数组成
// bind 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作
// inserted 被绑定元素插入父节点时调用(父节点存在即可调用，不必存在与document中)
// update 被绑定元素所在的模板更新时调用，而不论绑定值是否变化，通过比较更新前后的绑定值，可以忽略不必要的模板更新
// componentUpdated 被绑定元素所在模板完成一次更新周期时调用
// unbind 只调用一次，指令与元素解绑时调用

// 钩子函数的参数
// el —— 指令所绑定的元素，可以直接操作DOM
// binding —— 一个对象 : 包含的在图片中
Vue.directive('focus',{
   //指令选项
    inserted: function (el) {
        // 聚焦元素
        el.focus();
    }
});

// 局部注册
var app = new Vue({
    el: '#app',
    directive:{
        focus:{
            //指令选项
        }
    }
});