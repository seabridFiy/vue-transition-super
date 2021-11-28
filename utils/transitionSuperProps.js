export default {
  tag: {
    // 标签名
    type: String,
    default: "transition",
    validator: (t) => {
      return ["transition", "transition-group"].includes(t);
    },
  },
  forwardeEnterActiveClass: {
    // 路由前进时进场动画class名称
    type: [String, Array],
  },
  forwardeLeaveActiveClass: {
    // 路由前进时离场动画class名称
    type: [String, Array],
  },
  backEnterActiveClass: {
    // 路由后退时进场动画class名称
    type: [String, Array],
  },
  backLeaveActiveClass: {
    // 路由后退时离场动画class名称
    type: [String, Array],
  },
  notUseAnimate: {
    // 不使用animate.css动画效果
    type: Boolean,
    default: false,
  },
};
