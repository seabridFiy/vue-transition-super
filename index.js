import TransitionSuper from "./components/TransitionSuper.vue";
import { setData } from "./utils/store";
const VueTransitionSuper = {
  install(Vue, option = {}) {
    // 将Vue存储起来 兼容vue3
    // setData('Vue', Vue)
    // 存储option
    setData('option', option)
    // 定义Vue组件
    Vue.component("TransitionSuper", TransitionSuper);
  },
};

export default VueTransitionSuper;
