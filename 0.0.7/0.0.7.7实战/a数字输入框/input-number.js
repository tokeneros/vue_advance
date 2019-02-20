// 数字输入框组件
Vue.component('input-number',{
    // 定义组件的根节点
    template: '\
    <div class="input-number">\
        <input type="text" :value="currentValue" @change="handleChange">\
        <button @keyup.down.native="handleDown" @click="handleDown" :disabled="currentValue <= min">-</button>\
        <button @keyup.up.native="handleUp" @click="handleUp" :disabled="currentValue >= max">+</button>\
    </div>',
    // 因为是独立组件，所以应该对每个prop进行校验
    // max和min是数字类型，需求是正无限大和负无限大
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {
            // Vue组件是单向数据流。所以无法从组件内部直接修改 prop value的值
            // 初始化引用父组件value
            currentValue: this.value
        }
    },
    watch: {// 监听，当坚挺的值发生变化时，就会触发watch配置的函数
        currentValue: function (val) {
            this.$emit('input',val);
            this.$emit('on-change',val);
        },
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods: {
        updateValue: function (val) {
            if(val > this.max) val = this.max;
            if(val < this.min) val = this.min;
            this.currentValue = val;
        },
        handleDown: function () {
            if(this.currentValue <= this.min) return;
            this.currentValue -= 1;
        },
        handleUp: function () {
            if(this.currentValue >= this.max) return;
            this.currentValue += 1;
        },
        handleChange: function (event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;

            if(isValueNumber(val)){
                val = Number(val);
                this.currentValue = val;
                this.updateValue(val);
            }else{
                event.target.value = this.currentValue;
            }
        }
    },
    mounted: function () {
        this.updateValue(this.value);
    }
});

function isValueNumber(value){
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$|(^-?0{1}$))/).test(value+'');
}