
const App = {
  init() {
    App.addFormListeners();
    App.addUIListeners();
  },

  addFormListeners() {
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
        App.changeStatusIconError(statusIcon);
      } else if (name.validity.valid) {
        errorMsg.textContent = '';
        App.changeStatusIconCheck(statusIcon);
      } else {
        errorMsg.textContent = 'error';
      }
    })

    email.addEventListener('change', (e) => {
    const parent = e.target.parentElement;
    const errorMsg = document.getElementById('email-error');
    const statusIcon = parent.querySelector('.status');
      if(email.validity.valid) {
        App.changeStatusIconCheck(statusIcon);
      } else {
        App.changeStatusIconError(statusIcon);
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
        App.changeStatusIconError(statusIcon);
      } else {
        errorMsg.textContent = "";
        App.changeStatusIconCheck(statusIcon);
      }
    })

    pass.addEventListener('input', (e) => {
    // Define Regex to relay password strength to the user
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    const lowRegex = new RegExp ("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})")

    const parent = e.target.parentElement;
    const errorMsg = document.getElementById('pass-error');
    const statusIcon = parent.querySelector('.status');
      if (strongRegex.test(pass.value)) {
        App.setPasswordbarStrong();
        App.changeStatusIconCheck(statusIcon);
      } else if (mediumRegex.test(pass.value)) {
        App.setPasswordbarMedium();
        App.changeStatusIconCheck(statusIcon);
      } else if (lowRegex.test(pass.value)) {
        App.setPasswordbarLow();
        App.changeStatusIconCheck(statusIcon);
      } else if (pass.validity.patternMismatch) {
        App.setInvalidPassword();
        App.changeStatusIconError(statusIcon);
      } else if (pass.validity.valueMissing) {
        App.setEmptyPassword();
        App.changeStatusIconError(statusIcon);
      } else {
        App.setVeryWeakPassword();
        App.changeStatusIconCheck(statusIcon);
      }
    })

    passConfirm.addEventListener('input', (e) => {
    const parent = e.target.parentElement;
    const errorMsg = document.getElementById('passconfirm-error');
    const statusIcon = parent.querySelector('.status');
      if (passConfirm.value === pass.value && passConfirm.value != "") {
        errorMsg.textContent = ``;
        passConfirm.setCustomValidity('');
        App.changeStatusIconCheck(statusIcon);
      } else {
        errorMsg.textContent = `* Passwords don't match`
        App.changeStatusIconError(statusIcon);
        passConfirm.setCustomValidity('Passwords Must Match');
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

    passConfirmToggle.addEventListener('click', (e) => {
      let target = e.target;
      if (target.textContent === 'visibility') {
        target.textContent = 'visibility_off'
        passConfirm.type = 'text';
      } else if (target.textContent === 'visibility_off') {
        target.textContent = 'visibility';
        passConfirm.type = 'password';
      }
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        console.log("Yes!")
        alert("Well Done! Form's Submitted!")
        // Play Animation
      } else {
        console.log("No!")
        alert("Form Error")
      }
    })
  },

  addUIListeners() {
    const passToggle = document.getElementById('password-toggle');
    const passConfirmToggle = document.getElementById('password-confirm-toggle');
    const displayToggle = document.getElementById('display-toggle');

    displayToggle.addEventListener('click', () => {
      document.querySelector('.circle').classList.toggle('translate');
      document.querySelector('body').classList.toggle('dark-mode-body');
      document.querySelector('.form-container').classList.toggle('dark-mode-form');
      document.querySelectorAll('input').forEach(input => {
        input.classList.toggle('dark-mode-input');
      })
      document.querySelector('select').classList.toggle('dark-mode-input');
    })

  },

  changeStatusIconCheck(statusIcon) {
    statusIcon.textContent = 'check_circle';
    statusIcon.style.color = 'var(--Success-Green)';
  },

  changeStatusIconError(statusIcon) {
    statusIcon.textContent = 'error';
    statusIcon.style.color = 'var(--Error-Red)';
  },

  setPasswordbarStrong() {
    const strengthBar = document.getElementById('strength-bar');
    const strengthBarText = document.getElementById('password-strength-text');
    strengthBar.style.width = '100%'
    strengthBar.style.background = 'var(--Success-Green)';
    strengthBarText.textContent = 'Strong'
  },

  setPasswordbarMedium() {
    const strengthBar = document.getElementById('strength-bar');
    const strengthBarText = document.getElementById('password-strength-text');
    strengthBar.style.width = '60%'
    strengthBar.style.background = 'var(--Medium-Yellow)';
    strengthBarText.textContent = 'Average'
  },

  setPasswordbarLow() {
    const strengthBar = document.getElementById('strength-bar');
    const strengthBarText = document.getElementById('password-strength-text');
    strengthBar.style.width = '30%'
    strengthBar.style.background = 'var(--Error-Red)';
    strengthBarText.textContent = 'Weak'
  },

  setInvalidPassword() {
    const strengthBar = document.getElementById('strength-bar');
    const strengthBarText = document.getElementById('password-strength-text');
    strengthBar.style.width = '0%'
    strengthBar.style.background = 'var(--Error-Red)';
    strengthBarText.textContent = 'Invalid Password!'
  },

  setVeryWeakPassword() {
    const strengthBar = document.getElementById('strength-bar');
    const strengthBarText = document.getElementById('password-strength-text');
    strengthBar.style.width = '20%'
    strengthBarText.textContent = 'Very Weak'
  },

  setEmptyPassword() {
    const strengthBar = document.getElementById('strength-bar');
    const strengthBarText = document.getElementById('password-strength-text');
    strengthBar.style.width = '0'
    strengthBarText.textContent = 'No Password'
  }

}

App.init();
