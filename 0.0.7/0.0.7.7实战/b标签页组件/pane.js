// 1.pane需要控制标签页内容的显示与隐藏，设置一个data:show，并且用v-show指令来控制元素
// 2.点击对应的标签页标题按钮，需要有一个唯一的标识来识别这个pane
Vue.component('pane',{
    name: 'pane',
    template: '\
    <div class="pane" v-show="show">\
        <slot></slot>\
    </div>',
    data: function () {
        return {
            show: true
        }
    },
    props: {
        name: {
            type: [String,Number]
        },
        label: {
            type: String,
            default: ''
        }
    },
    methods: {
        updatePaneNav () {
            this.$parent.updateNav();
        }
    },
    watch: {
        label: function () {
            this.updatePaneNav();
        }
    },
    mounted: function () {
        this.updatePaneNav();
    }
});