/**
 * Created by shine on 2017/2/14.
 */

var list = [
    /*{title:"吃饭"},
    {title:"睡觉"}*/
];

new Vue({
    el:".main",
    data:{
        list:list,
        todo:""
    },
    methods:{
        addTodo:function(number,ev){       //如何既传参数，也将事件处理函数传过来  html页面 传一个$event对象
           // console.info(ev);
           // if(ev.keyCode ===13){               <!-- keyup.enter  事件修饰符，判断enter键 这里即可不做判断-->
               /* this.list.push({                   //this 指向的都是Vue的根实例
                    title:ev.target.value
                });*/
          //  }
            // 上面方法还是操纵了dom元素，以下设计一个方法，不用操纵dom，data里面自定义一个属性，与input值绑定，然后取这个里面的值
            this.list.push({
                title:this.todo
             });
            this.todo = "";   //渲染之后 还要清空
        }
    }
});