import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};
const STORAGE_KEY = 'feedback-form-state';
const formData = { ...formDataParseFromLS() };
loadFormDataFromLS();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(saveFormDataToLS, 250));

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function saveFormDataToLS(e) {
  formData[e.target.name] = e.target.value;
  localStorageSetItem();
}

function localStorageSetItem() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormDataFromLS() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    return;
  }

  const { email, message } = formDataParseFromLS();
  refs.email.value = email;
  refs.message.value = message;
}

function formDataParseFromLS() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}
