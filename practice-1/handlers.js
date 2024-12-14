import {validateField} from "./helpers.js";

const submitBtnVisibleHandler = (inputs, submitBtn) => {
  const fields = Object.entries(inputs);

  function checkInputs() {
    let isSubmitBtnVisible = true;
    fields.forEach(([_, {elements, error}]) => {
      if (
        (!elements?.input?.value && elements?.input?.required)
        || (!elements?.select?.value && elements?.select?.required)
        || error
      ) {
        isSubmitBtnVisible = false;
      }
    });
    submitBtn.disabled = !isSubmitBtnVisible;
  };

  fields.forEach(([_, {elements}]) => {
    (elements?.input)
      ? elements?.input.addEventListener('input', () => checkInputs(fields, submitBtn))
      : elements?.select.addEventListener('change', () => checkInputs(fields, submitBtn));
  });

  checkInputs();
};

export const changeFieldsHandler = (inputs, submitBtn) => {
  const fields = Object.entries(inputs);

  fields.forEach(([key, group]) => {
    if (group.elements.input) {
      group.elements.input.addEventListener('input', () => {
        validateField(key, group);
      });
    } else if (group.elements.select) {
      group.elements.select.addEventListener('change', () => {
        validateField(key, group);
      });
    }
  });

  submitBtnVisibleHandler(inputs, submitBtn)
};

export const openModalHandler = (modal, isModalVisible) => {
  if (!isModalVisible) {
    modal.classList.add('hidden');
  } else {
    modal.classList.remove('hidden');
  }

  isModalVisible = !isModalVisible;
};