// import './style.css';
// document.getElementById('app').innerHTML = 'Hello webpack.';

// 导入vue框架
import Vue from 'vue';
// 导入app.Vue组件
import App from './app.vue';

/*
=> 是箭头函数
render: h => h(App)
等同于
render： function(h){
    return h(App);
}
也等同于
render： h => {
    return h(App);
}
 */
new Vue({
    el: '#app',
    render: h => h(App)
});