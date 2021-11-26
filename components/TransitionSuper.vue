<script>
export default {
  name: 'TransitionSuper',
  props: {
    tag: {
      type: String,
      default: 'transition',
      validator: (t) => {
        return ['transition', 'transition-group'].includes(t)
      }
    }
  },
  data() {
    return {
      direction: {
        flag: 'forward',
        timer: null
      },
      oldDirection: {
        flag: 'forward',
        timer: null
      }
    }
  },
  computed: {
    animateNames() {
      return this.direction.flag === 'forward'
        ? ['animate__bounceInLeft', 'animate__bounceOutRight']
        : ['animate__bounceInRight', 'animate__bounceOutLeft']
    }
  },
  watch: {
    $route() {
      if (this.oldDirection.timer === this.direction.timer) {
        this.direction.flag = 'forward'
      } else {
        this.oldDirection = this.direction
      }
    }
  },
  mounted() {
    window.addEventListener('popstate', this.changeRoute)
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.changeRoute)
  },
  methods: {
    changeRoute() {
      this.direction = {
        flag: 'back',
        timer: Date.now()
      }
    }
  },
  render(h) {
    const [enterClass, leaveClass] = this.animateNames
    return h('div', {
      class: ['transition_super']
    }, [
      h(this.tag, {
        props: {
          name: 'chen',
          enterActiveClass: `base_animate animate__animated ${enterClass}`,
          leaveActiveClass: `base_animate animate__animated ${leaveClass}`
        }
      }, [this.$slots.default])
    ])
  }
}
</script>

<style scoped>
.transition_super {
  height: 100%;
}
.base_animate {
  width: 100vw;
  height: 100vh;
  position:absolute;
  top: 0;
  left: 0;
}
</style>
