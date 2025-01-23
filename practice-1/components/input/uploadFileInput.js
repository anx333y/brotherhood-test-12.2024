import {
  addOptionsToElementFromObject,
  addClassToElementOptions
} from "../helpers.js";
import createIcon from "../icon/index.js";

const createUploadFileInput = (root, options) => {
  const elementKey =
    (root?.id ? `${root?.id}-` : '')
    + (options?.attributes?.id ? options.attributes.id : 'uploadFileInput');

  const input = document.createElement('input');
  addOptionsToElementFromObject(input, addClassToElementOptions(
    {
      ...options,
      'textContent': undefined,
      'attributes': {...options?.attributes, type: 'file'}
    }
  ));

  const inputLabel = document.createElement('span');
  inputLabel.classList.add('default--file-input-label');

  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('default--file-input-wrapper');

  const inputLabelSpan = document.createElement('span');
  inputLabelSpan.classList.add('default--file-input-label__span');
  inputLabelSpan.textContent = options?.textContent;

  const inputNewSpan = document.createElement('span');
  inputNewSpan.classList.add('default--file-input__span');
  inputNewSpan.textContent = 'Выберите файл';

  const inputNew = document.createElement('label');
  inputNew.htmlFor = options?.attributes.id;
  inputNew.classList.add('default--file-input');

  const inputError = document.createElement('span');
  inputError.classList.add('default--file-input-error');

  const inputCancelFileBtn = document.createElement('button');
  inputCancelFileBtn.type = 'button';
  inputCancelFileBtn.classList.add('default--file-input-cancel-button', 'hidden')
  const inputCancelFileIcon = createIcon(
    './assets/icons/close.svg',
    {
      classes: ['default--file-input-cancel-icon']
    }
  );
  inputCancelFileBtn.appendChild(inputCancelFileIcon);

  input.placeholder = options.placeholder || ' ';

  if (options?.attributes.required) {
    const inputLabelrequired = document.createElement('span');
    inputLabelrequired.innerHTML = '&#10033;';
    inputLabelrequired.classList.add('default--input-label--required');
    inputLabel.appendChild(inputLabelrequired);
  }

  const icon = createIcon('./assets/icons/uploadFile.svg');

  inputLabel.appendChild(inputLabelSpan);

  inputNew.appendChild(icon);
  inputNew.appendChild(inputNewSpan);

  inputWrapper.appendChild(inputLabel);
  inputNew.appendChild(inputCancelFileBtn);
  inputWrapper.appendChild(inputNew);
  inputWrapper.appendChild(input);
  inputWrapper.appendChild(inputError);

  if (Object.keys(root).includes('returnedValue') && root.returnedValue === 'node') {
    return inputWrapper;
  }

  root.appendChild(inputWrapper);

  return {
    [elementKey]: {
      input,
      inputNew,
      inputNewSpan,
      inputWrapper,
      inputLabel,
      inputLabelSpan,
      inputError,
      icon,
      inputCancelFileBtn,
      inputCancelFileIcon
    }
  }
};

export default createUploadFileInput;