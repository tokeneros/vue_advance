Vue.component('vTable',{
    render: function(h){// 这里的h就是createElement
        var _this = this;
        // 表头操作
        var ths = [];
        this.currentColumns.forEach(function (col, index) {
            if(col.sortable) {
                ths.push(h('th', [
                    h('span', col.title),
                    //升序
                    h('a', {
                        class: {
                            on: col._sortType === 'asc'
                        },
                        on: {
                            click: function () {
                                _this.handleSortByAsc(index)
                            }
                        }
                    }, '+'),
                    //降序
                    h('a', {
                        class: {
                            on: col._sortType === 'desc'
                        },
                        on: {
                            click: function () {
                                _this.handleSortByDesc(index)
                            }
                        }
                    }, '-'),
                ]));
            }else{
                ths.push(h('th',col.title));
            }
        });
        // 表体赋值
        var trs = [];
        this.currentData.forEach(function (row) {
            var tds = [];
            _this.currentColumns.forEach(function (cell) {
                tds.push(h('td', row[cell.key]));
            });
            trs.push(h('tr',tds));
        });
        return h('table',[
            h('thead',[
                h('tr',ths)
                ]),
            h('tbody',trs)
        ])
    },
    props: {
        columns: {
            type: Array,
            default: function () {
                return []
            }
        },
        data: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data: function(){// 为了让排序后的columns和data不影响原始数据
        return {
            currentColumns: [],
            currentData: []
        }
    },
    methods: {
        makeColumns: function () {
            this.currentColumns = this.columns.map(function (col, index) {
                // 添加一个字段标识当前类排序状态，后续使用
                col._sortType = 'normal';
                // 添加一个字段标识当前列在数组中的索引，后续使用
                col._index = index;
                return col;
            })
        },
        makeData: function () {
            this.currentData = this.data.map(function (row, index) {
                // 添加一个字段标识当前行在数组中的索引，后续使用
                row._index = index;
                return row;
            })
        },
        handleSortByAsc: function (index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'asc';

            this.currentData.sort(function (a,b) {
                return a[key] > b[key] ? 1 : -1;
            })
        },
        handleSortByDesc: function (index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'desc';

            this.currentData.sort(function (a,b) {
                return a[key] < b[key] ? 1 : -1;
            })
        }
    },
    mounted: function () {// v-table初始化时调用
        this.makeColumns();
        this.makeData();
    },
    watch: {
        data: function () {
            this.makeData();
            var sortedColumn = this.currentColumns.filter(function (col) {
                return col._sortType !== 'normal';
            });

            if(sortedColumn.length > 0){
                if(sortedColumn[0]._sortType === 'asc'){
                    this.handleSortByAsc(sortedColumn[0]._index);
                }else{
                    this.handleSortByDesc(sortedColumn[0]._index);
                }
            }
        }
    }
});