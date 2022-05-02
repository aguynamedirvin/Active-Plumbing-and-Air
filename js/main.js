/** Fire Google Tag Manager Event **/
function gtagEvent(event) {
    let event = event;

    dataLayer.push({'event': event});
}


/** Form Validation **/

function isEmail(value) {
    return new RegExp("^\\S+@\\S+[\\.][0-9a-z]+$").test(String(value).toLowerCase());
}

function submitMessage(name, email, phone) {
    if (!name || name.length == 0 || !email || !isEmail || !phone || phone.length == 0) {
        return;
    }
    let formElement = document.getElementById("contact");
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
            document.getElementById('form-success').classList.remove('hidden');
            document.getElementById('form-content').classList.add('hidden');

            gtagEvent('Form submission');
        } else {
            let errorMessage = `<div class="text-red-500">Something went wrong. Please try again later.</div>`;
            formElement.insertAdjacentHTML('afterbegin', errorMessage);

            throw new Error(`Something went wrong: ${response.statusText}`);
        }
    })
    .catch((error) => console.error(error));
}
