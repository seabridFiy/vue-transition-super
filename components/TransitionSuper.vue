<script>
import { getData } from "../utils/store";
export default {
  name: "TransitionSuper",
  abstract: true,
  props: {
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
  },
  data() {
    return {
      direction: {
        flag: "forward",
        timer: null,
      },
      oldDirection: {
        flag: "forward",
        timer: null,
      },
    };
  },
  computed: {
    activeClassConf() {
      const option = getData("option") || {};
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
      } = option;
      return {
        forwardeEnterActiveClass,
        forwardeLeaveActiveClass,
        backEnterActiveClass,
        backLeaveActiveClass,
        notUseAnimate
      };
    },
    animateNames() {
      const {
        forwardeEnterActiveClass,
        forwardeLeaveActiveClass,
        backEnterActiveClass,
        backLeaveActiveClass,
      } = this.activeClassConf;
      return this.direction.flag === "forward"
        ? [forwardeEnterActiveClass, forwardeLeaveActiveClass]
        : [backEnterActiveClass, backLeaveActiveClass];
    },
    currentUseAnimates() {
      const [enterClass, leaveClass] = this.animateNames;
      let enterActiveClass = this.notUseAnimate ? [] : ["animate__animated"];
      let leaveActiveClass = [...enterActiveClass];
      enterActiveClass = enterActiveClass.concat(enterClass);
      leaveActiveClass = leaveActiveClass.concat(leaveClass);
      return [enterActiveClass.join(" "), leaveActiveClass.join(" ")];
    },
  },
  watch: {
    $route() {
      const flag = this.oldDirection.timer === this.direction.timer
      if (flag) {
        this.direction.flag = "forward";
      } else {
        this.oldDirection = this.direction;
      }
    },
  },
  mounted() {
    window.addEventListener("popstate", this.changeRoute);
  },
  beforeDestroy() {
    window.removeEventListener("popstate", this.changeRoute);
  },
  methods: {
    changeRoute() {
      this.direction = {
        flag: "back",
        timer: Date.now(),
      };
    },
  },
  render(h) {
    const [enterClass, leaveClass] = this.currentUseAnimates;

    return h(
      "div",
      {
        class: ["transition_super"],
      },
      [
        h(
          this.tag,
          {
            props: {
              name: "chen",
              enterActiveClass: `base_animate ${enterClass}`,
              leaveActiveClass: `base_animate ${leaveClass}`,
            },
          },
          [this.$slots.default]
        ),
      ]
    );
  },
};
</script>

<style scoped>
.transition_super {
  height: 100%;
}
.base_animate {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
