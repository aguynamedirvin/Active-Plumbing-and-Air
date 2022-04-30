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
            let inputs = [...this.$el.querySelectorAll("input[data-rules]")];
            inputs.map((input) => {
                if (Iodine.is(input.value, JSON.parse(input.dataset.rules)) !== true) {
                    event.preventDefault();
                } else {
                    console.log('Submitted');
                    let formElement = document.getElementById("form");
                    let body = new URLSearchParams(new FormData(formElement)).toString();
                    return fetch("/", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      body: body,
                    })
                      .then((response) => {
                        if (response.ok) {
                          formElement.reset();
                          alert("Thank you for your message!");
                        } else {
                          throw new Error(`Something went wrong: ${response.statusText}`);
                        }
                      })
                      .catch((error) => console.error(error));
                  }
            });
        },
        getErrorMessage: function (id, value, rules) {
            let isValid = Iodine.is(value, rules);
            if (isValid !== true) {
                switch (id) {
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
                }
            }
            return "";
        }
    };
}
