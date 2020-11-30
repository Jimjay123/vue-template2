import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend, validate } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
Vue.prototype.$validate = validate;

extend('required', {
  ...required,
  message: '{_field_}是必填项'
});
extend('positive', {
  validate: value => {
    return value >= 0;
  },
  message: '嘿嘿和'
  // {_field_} 通过name取值
});
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
