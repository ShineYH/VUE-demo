/**
 * Created by shine on 2017/2/14.
 */

    /*使用 localStorage 存取对象*/

    var store = {
        save(key,value){       //存
            localStorage.setItem(key,JSON.stringify(value));
        },
        fetch(key){
           return JSON.parse(localStorage.getItem(key)) || [];
        }
    };

/*var list = [
    {title:"吃饭", isChecked:false},   //状态为false 则为不选中   任务未完成
    {title:"睡觉",isChecked:true}     //状态为true 则为选中  任务完成
];*/
//  此时的list 便要从localstorage里面取
var list = store.fetch("vue-task");
var filterMethod = {      //直接定义一个对象，不用写很多if~else，写在外面，只需要声明一次
    all:function(list){
        return list;
    },
    unfinished:function(list){
        return list.filter(function(item){
            return !item.isChecked;
        });
    },
    finished:function(list){
        return list.filter(function(item){
            return item.isChecked;
        });
    }
};
var vue =  new Vue({
    el:".main",
    data:{
        list:list,
        todo:"",
        edtorTodos:'',   //记录正在编辑的数据
        beforeTitle:'',    //记录正在编辑的title
        visibility:'all'    //通过该属性值变化，对任务进行筛选显示
    },
    computed:{    //Vue计算属性  处理视图模板中的逻辑   当数据发生改变时，会触发这个计算属性
        noCheckeLength:function(){
            return this.list.filter(function(item){
                return !item.isChecked
            }).length
        },
        filterData:function(){                    // 计算属性，筛选出list，代替list显示
            return filterMethod[this.visibility] ? filterMethod[this.visibility](list) : list;
        }
    },
    watch:{             //监控属性
        /*list: function () {       监控list是否发生变化，但是这种监控是浅监控，list里面属性变化，监控不到
            //operate               watch可监控某个值发生变化，从而进行某些操作，computed也可监控，但是有返回值，偏向与计算，计算后返回计算值
        }*/                        // 当某些数据需要根据其他数据变化时，可以使用watch
        list:{
            handler:function (){       //list发生变化时的处理函数
                store.save("vue-task",this.list);
            },
            deep:true               //深层监控
        }
    },
    methods:{                     // ！！！！！Vue 逻辑代码里面，尽量不要再操作dom，要使用vue本身双向绑定的功能，dom的任何变化，都可以在数据里面绑定体现，直接取数据即可！！！！！
        addTodo:function(){       //如何既传参数，也将事件处理函数传过来  html页面 传一个$event对象
           // console.info(ev);
           // if(ev.keyCode ===13){               <!-- keyup.enter  事件修饰符，判断enter键 这里即可不做判断-->
               /* this.list.push({                   //this 指向的都是Vue的根实例
                    title:ev.target.value
                });*/
          //  }
            // 上面方法还是操纵了dom元素，以下设计一个方法，不用操纵dom，data里面自定义一个属性，与input值绑定，然后取这个里面的值
            this.list.push({
                title:this.todo,
                isChecked:false
             });
            this.todo = "";   //渲染之后 还要清空
        },
         deleteTodo(todo){    //es6 可以这么写    删除任务，只要删除list列表里面的值就好了，不要操作dom！！
            var index = this.list.indexOf(todo);
            this.list.splice(index,1);
         },
        edtorTodo(todo){   //编辑任务
            //编辑任务的时候，记录下该任务的title，如果取消编辑时，恢复原来的title
            this.beforeTitle = todo.title;
            this.edtorTodos = todo;
        },
        edtorTodoed(todo){  //编辑任务成功
            this.edtorTodos = "";
        },
        cancelTodo(todo){  //取消编辑
            todo.title = this.beforeTitle;  //将当前项的title变为原来的title
            this.beforeTitle = '';
            //让原先div显示
            this.edtorTodos = "";
        }
    },
    directives:{
        "onfocus":{               //directives 自定义指令
            update(el,binding){               //Vue 提供的钩子函数，当内容发生更新，则触发该函数
                if(binding.value){        //如果表达式值为真
                    el.focus();       //元素获取焦点
                }
            }
        }
    }
});

function watchHashChange(){
    var hash = window.location.hash.slice(1);
    vue.visibility = hash;
}
watchHashChange();
//监控浏览器hash值的变化
window.addEventListener('hashchange',watchHashChange);