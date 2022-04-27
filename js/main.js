/*
 * Form Validation
 *
 */




function form() {
  return {

    
    full_name: { errorMessage: "", blurred: false },
    email: { errorMessage: 'Why', blurred: false },
    phone: { errorMessage: "", blurred: false },

    blur: function (event) {
      let ele = event.target;
      this[ele.name].blurred = true;
      let rules = JSON.parse(ele.dataset.rules);
      this[ele.name].errorMessage = this.getErrorMessage(ele.value, rules);
    },
    input: function (event) {
      let ele = event.target;
      let rules = JSON.parse(ele.dataset.rules);
      this[ele.name].errorMessage = this.getErrorMessage(ele.value, rules);
    },
    submit: function (event) {
      let inputs = [...this.$el.querySelectorAll("input[data-rules]")];
      inputs.map((input) => {
        if (Iodine.is(input.value, JSON.parse(input.dataset.rules)) !== true) {
          event.preventDefault();
        }
      });
    },
    getErrorMessage: function (value, rules) {
      let isValid = Iodine.is(value, rules);
      if (isValid !== true) {
        return Iodine.getErrorMessage(isValid);
      }
      return "";
    }
  };
}
