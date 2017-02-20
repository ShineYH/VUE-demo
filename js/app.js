/**
 * Created by shine on 2017/2/14.
 */

var list = [
    {title:"吃饭", isChecked:false},   //状态为false 则为不选中
    {title:"睡觉",isChecked:true}     //状态为true 则为选中
];

new Vue({
    el:".main",
    data:{
        list:list,
        todo:"",
        edtorTodos:'',   //记录正在编辑的数据
        beforeTitle:''    //记录正在编辑的title
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