Vue.directive('clickoutside',{
    bind: function (el, binding, vnode) {
        function documentHandler(e) {
            // 判断点击的区域是否是指令所在的元素内部
            if(el.contains(e.target)){
                return false;
            }
            // 判断当前指令v-clickoutsie有没有写表达式
            // 在该自定义指令，表达式应该是一个函数
            // 在过滤了内部元素后，点击外部任何区域应该执行用户表达式的函数
            // binging.value就是用来执行当前上下文methods中指定的函数的
            if(binding.expression){
                binding.value(e);
            }
        }
        el._vueClickOutSide_ = documentHandler;
        document.addEventListener('click',documentHandler);
    },
    unbind: function (el, binding) {
        document.removeEventListener('click',el._vueClickOutSide_);
        delete el._vueClickOutSide_;// 销毁掉
    }
});