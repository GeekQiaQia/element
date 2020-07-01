/**
 * 
 * @description:由父组件向子组件向下广播
 * @param {type:string} componentName = [value:需要广播的组件名称] 
 * @param {type:string} eventName = [value:需要广播的事件名] 
 * @param {type:array} params=[value:需要传入的事件参数]
 * */
function broadcast(componentName, eventName, params) {
	// 通过this.$children获取当前组件包含的所有子组件对象数组，并进行遍历查找符合条件的child进行广播；
	// 缺点：遍历所有的child,性能损耗比较高；
  this.$children.forEach(child => {
	  // 查找子组件对象属性为componnetName的组件名；
    var name = child.$options.componentName;

    if (name === componentName) {
		// 如果是需要广播的组件componentName，则进行emit一个名字为eventName的事件；
      child.$emit.apply(child, [eventName].concat(params));
    } else {
		// 否则进行一个递归，继续向下查找组件名为componentName的组件；
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
	  
	  /**
	   * 
	   * @description:由子组件向父组件向上派发；emit事件的事件同broadcast
	   * @param {type:string} componentName = [value:需要派发的组件名称] 
	   * @param {type:string} eventName = [value:需要派发的事件名] 
	   * @param {type:array} params=[value:需要传入的事件参数]
	   * */
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$opt===s.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
