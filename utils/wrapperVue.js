class WrapperVue {
  constructor() {
    this.example = {}
  }
  setVue(vue) {
    console.log(this);
    this.example = vue
  }
  getVue() {
    return this.example
  }
}

const wrapperVue = new WrapperVue()

export const setWrapperVue = wrapperVue.setVue.bind(wrapperVue)

export const getWrapperVue = wrapperVue.getVue.bind(wrapperVue)