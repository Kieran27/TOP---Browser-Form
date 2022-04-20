
const Validate = {
  init() {
    Validate.addListeners();
  },

  addListeners() {
    const form = document.getElementById('user-data');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const country = document.getElementById('country');
    const zipCode = document.getElementById('zip');
    const pass = document.getElementById('password');
    const passConfirm = document.getElementById('password-confirm');

    const passToggle = document.getElementById('password-toggle');
    const passConfirmToggle = document.getElementById('password-confirm-toggle');

    name.addEventListener('change', (e) => {
    const parent = e.target.parentElement
    const errorMsg = parent.querySelector("#name-error");
    const statusIcon = parent.querySelector('.status');
      if(name.validity.valueMissing) {
        errorMsg.textContent = "* Not a Valid Name";
        Validate.changeStatusIconError(statusIcon);
      } else if (name.validity.valid) {
        errorMsg.textContent = '';
        Validate.changeStatusIconCheck(statusIcon);
      } else {
        errorMsg.textContent = 'error';
      }
    })

    email.addEventListener('change', (e) => {
    const parent = e.target.parentElement;
    const errorMsg = document.getElementById('email-error');
    const statusIcon = parent.querySelector('.status');
      if(email.validity.valid) {
        Validate.changeStatusIconCheck(statusIcon);
      } else {
        Validate.changeStatusIconError(statusIcon);
      }

      if (email.validity.tooShort) {
        errorMsg.textContent = "Too Short"
      } else {
        errorMsg.textContent = "";
      }

      if (email.validity.typeMismatch) {
        errorMsg.textContent = "* Not a valid email";
      }
    })

    zipCode.addEventListener('change', (e) => {
      const parent = e.target.parentElement;
      const errorMsg = document.getElementById('zip-error');
      const statusIcon = parent.querySelector('.status');
      if (zipCode.validity.patternMismatch) {
        errorMsg.textContent = 'Zip Code Must be 4 digits'
        Validate.changeStatusIconError(statusIcon);
      } else {
        errorMsg.textContent = "";
        Validate.changeStatusIconCheck(statusIcon);
      }
    })

    pass.addEventListener('change', (e) => {
    const parent = e.target.parentElement;
    const errorMsg = document.getElementById('pass-error');
    const statusIcon = parent.querySelector('.status');
    })

    passConfirm.addEventListener('input', (e) => {
    const parent = e.target.parentElement;
    const errorMsg = document.getElementById('passconfirm-error');
    const statusIcon = parent.querySelector('.status');
      if (passConfirm.value === pass.value && passConfirm.value != "") {
        errorMsg.textContent = ``;
        Validate.changeStatusIconCheck(statusIcon);
      } else {
        errorMsg.textContent = `* Passwords don't match`
        Validate.changeStatusIconError(statusIcon);
      }
     if (passConfirm.validity.valid) {
       console.log('hi')
     }
    })

    passToggle.addEventListener('click', (e) => {
      let target = e.target;
      if (target.textContent === 'visibility') {
        target.textContent = 'visibility_off'
        pass.type = 'text';
      } else if (target.textContent === 'visibility_off') {
        target.textContent = 'visibility';
        pass.type = 'password';
      }
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log("????")
    })
  },

  getElements(e)  {
    const parent = e.target.parentElement;
  },

  changeStatusIconCheck(statusIcon) {
    statusIcon.textContent = 'check_circle';
    statusIcon.style.color = 'green';
  },

  changeStatusIconError(statusIcon) {
    statusIcon.textContent = 'error';
    statusIcon.style.color = 'red';
  }

}


function toggleBtn() {
  console.log('hello');
  document.querySelector('.circle').classList.toggle('translate');
}

Validate.init();
