/*
 * Form Validation
 *
 */
function form() {
    return {

        full_name: { errorMessage: "", blurred: false },
        email: { errorMessage: "", blurred: false },
        phone: { errorMessage: "", blurred: false },

        blur: function (event) {
            let ele = event.target;
            this[ele.name].blurred = true;
            let rules = JSON.parse(ele.dataset.rules);
            this[ele.name].errorMessage = this.getErrorMessage(ele.id, ele.value, rules);
        },
        input: function (event) {
            let ele = event.target;
            let rules = JSON.parse(ele.dataset.rules);
            this[ele.name].errorMessage = this.getErrorMessage(ele.value, rules);
        },
        submit: function (event) {
            console.log('Submitted');
            console.log(JSON.stringify(this.formData));

            let inputs = [...this.$el.querySelectorAll("input[data-rules]")];
            inputs.map((input) => {
                if (Iodine.is(input.value, JSON.parse(input.dataset.rules)) !== true) {
                    event.preventDefault();
                }
            });
        },
        getErrorMessage: function (id, value, rules) {
            let isValid = Iodine.is(value, rules);
            if (isValid !== true) {
                /*switch (id) {
                    case 'full_name': 
                        return Iodine.setErrorMessage = "Please enter your full name";
                        break;
                    case 'email': 
                        return Iodine.setErrorMessage = "Please enter a valid email address";
                        break;
                    case 'phone': 
                        return Iodine.setErrorMessage = "Please enter a valid phone number";
                        break;
                    default: 
                        return Iodine.getErrorMessage(isValid);
                }*/
                return Iodine.getErrorMessage(isValid);
            }
            return "";
        }
    };
}
