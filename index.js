import props from "./utils/transitionSuperProps";
import TransitionSuper from "./components/TransitionSuper.vue";
import { setWrapperVue } from "./utils/wrapperVue";
import "animate.css";
const VueTransitionSuper = {
  install(Vue, options = {}) {
    // 将Vue存储起来 兼容vue3
    setWrapperVue(Vue)
    // 定义Vue组件
    Vue.component("VueTransitionSuper", {
      props,
      components: {
        TransitionSuper
      },
      render(h) {
        const {
          forwardeEnterActiveClass = this.forwardeEnterActiveClass ||
            "animate__bounceInLeft",
          forwardeLeaveActiveClass = this.forwardeLeaveActiveClass ||
            "animate__bounceOutRight",
          backEnterActiveClass = this.backEnterActiveClass ||
            "animate__bounceInRight",
          backLeaveActiveClass = this.backLeaveActiveClass ||
            "animate__bounceOutLeft",
          notUseAnimate = this.notUseAnimate || false,
        } = options;
        return h('TransitionSuper', {
          props: {
            forwardeEnterActiveClass,
            forwardeLeaveActiveClass,
            backEnterActiveClass,
            backLeaveActiveClass,
            notUseAnimate,
          },
        }, [this.$slots.default]);
      },
    });
  },
};

export default VueTransitionSuper;
