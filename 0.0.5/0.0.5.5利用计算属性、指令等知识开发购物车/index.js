var app = new Vue({
    el: '#app',
    data:{
        list: [
            {
                id: 1,
                name: 'iPhone 7',
                price: 6188,
                count: 2
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count: 1
            },
            {
                id: 3,
                name: 'MacBook Pro',
                price: 21488,
                count: 1
            }
        ],
        check: [],
        checkAllStatus: false
    },
    computed: {
        totalPrice: function () {
            var total = 0;
            for(var i = 0 ; i < this.check.length ; i++ ){
                var item = this.list[this.check[i]];
                total += item.price * item.count;
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g,",")
        }
    },
    methods: {
        handleReduce: function (index) {
            if(this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleAdd: function (index) {
            this.list[index].count++;
        },
        handleRemove: function (index) {
            this.list.splice(index, 1);
        },
        checkBox: function (index) {
            for (var i = 0; i < this.check.length; i++) {
                if (this.check[i] == index) {
                    this.check.splice(i, 1)
                    return;
                }
            }
            this.check.push(index);
        },
        checkAll: function () {
            var all = document.getElementsByName("check");
            if(this.checkAllStatus && this.list.length === this.check.length){
                this.check = [];
                for(var i = 0 ; i < all.length ; i++ ){
                    all[i].checked = false;
                }
                this.checkAllStatus = false;
            }else{
                this.check = [];
                for(var i = 0 ; i < this.list.length ; i++ ){
                    this.check.push(i);
                }
                for(var i = 0 ; i < all.length ; i++ ){
                    all[i].checked = true;
                }
                this.checkAllStatus = true;

            }
        }
    }
});