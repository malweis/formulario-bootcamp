document.addEventListener('DOMContentLoaded', function () {
  const nroDocInput = document.getElementById('nroDocumento');
  const selectElements = document.querySelectorAll('select');
  const tipoDocumentoSelect = document.getElementById('tipoDocumento');
  const form = document.querySelector('form');

  nroDocInput.addEventListener('input', function () {
    const inputValue = this.value;
    const regex = /^\d+-\d$/; // Matches format: X numbers - one number

    if (tipoDocumentoSelect.value === '2') {
      if (!regex.test(inputValue)) {
        this.setCustomValidity('Invalid format. Please use the format X numbers - one number (e.g., 12345-6).');
        this.classList.add('error');
      } else {
        this.setCustomValidity('');
        this.classList.remove('error');
      }
    } else {
      this.setCustomValidity('');
      this.classList.remove('error');
    }
  });

  tipoDocumentoSelect.addEventListener('change', function() {
    if (this.value !== '2') {
      nroDocInput.setCustomValidity('');
      nroDocInput.classList.remove('error');
    }
  });

  selectElements.forEach(function(select) {
    select.addEventListener('change', function() {
      const selectedValue = this.value;

      if (selectedValue !== '') {
        this.classList.remove('error');
        this.setCustomValidity('');
      }
    });
  });

  form.addEventListener('submit', function (event) {
    let formIsValid = true;

    selectElements.forEach(function(select) {
      const selectedValue = select.value;

      if (selectedValue === '') {
        select.setCustomValidity('Por favor seleccione una opcion.');
        select.classList.add('error');
        select.reportValidity();
        formIsValid = false;
      } else {
        select.setCustomValidity('');
      }
    });

    if (!formIsValid) {
      event.preventDefault();
    }
  });

  form.addEventListener('input', function() {
    if (form.checkValidity()) {
      formIsValid = true;
    }
  });
});
