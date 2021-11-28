<script>
import props from "../utils/transitionSuperProps";
// import { getWrapperVue } from "../utils/wrapperVue";
export default {
  name: "TransitionSuper",
  props,
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
    animateNames() {
      const {
        forwardeEnterActiveClass,
        forwardeLeaveActiveClass,
        backEnterActiveClass,
        backLeaveActiveClass,
      } = this;
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
      if (this.oldDirection.timer === this.direction.timer) {
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
