import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  // basic
  Button,
  Loading,
  TabBar,
  TabPanels,
  // form
  Checkbox,
  Input,
  Textarea,
  Select,
  Switch,
  Validator,
  Upload,
  Form,
  // popup
  Popup,
  Toast,
  Picker,
  CascadePicker,
  Dialog,
  // scroll
  Scroll,
  Slide,
  Swipe,
  ScrollNav,
  ScrollNavBar
} from 'cube-ui'

Vue.use(Button)
Vue.use(Loading)
Vue.use(TabBar)
Vue.use(TabPanels)
Vue.use(Checkbox)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Validator)
Vue.use(Upload)
Vue.use(Form)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(CascadePicker)
Vue.use(Dialog)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(Swipe)
Vue.use(ScrollNav)
Vue.use(ScrollNavBar)
