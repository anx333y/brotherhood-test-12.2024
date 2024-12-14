import {
  addOptionsToElementFromObject,
  addClassToElementOptions
} from "../helpers.js";
import createIcon from "../icon/index.js";

const createInput = (root, options) => {
  const elementKey =
    (root?.id ? `${root?.id}-` : '')
    + (options?.attributes?.id ? options.attributes.id : 'input');

  let elements = {};

  const input = document.createElement('input');
  addOptionsToElementFromObject(input, addClassToElementOptions(
    {...options, 'textContent': undefined},
    'default--input'
  ));

  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('default--input-wrapper');
  inputWrapper.appendChild(input);

  const inputError = document.createElement('span');
  inputError.classList.add('default--input-error');


  if (options?.icon) {
    const inputIconWrapper = document.createElement('label');
    inputIconWrapper.htmlFor = options?.attributes.id;
    inputIconWrapper.classList.add('default--input-icon');
    const inputIcon = createIcon(options.icon);
    inputIconWrapper.appendChild(inputIcon);

    inputWrapper.appendChild(inputIconWrapper);
  }

  elements = {
    [elementKey]: {
      input,
      inputWrapper,
      inputError
    }
  }

  if (!options?.textContent) {
    inputWrapper.appendChild(inputError);
    root.appendChild(inputWrapper);
    return elements;
  }

  inputWrapper.classList.add('default--input--with-label');

  const inputLabelSpan = document.createElement('span');
  inputLabelSpan.classList.add('default--input-label-span');
  inputLabelSpan.textContent = options?.textContent;

  const inputLabel = document.createElement('label');
  inputLabel.htmlFor = options?.attributes.id;
  inputLabel.classList.add('default--input-label');

  input.placeholder = options.placeholder || ' ';

  if (options?.attributes.required) {
    const inputLabelrequired = document.createElement('span');
    inputLabelrequired.innerHTML = '&#10033;';
    inputLabelrequired.classList.add('default--input-label--required');
    inputLabel.appendChild(inputLabelrequired);
  }

  inputLabel.appendChild(inputLabelSpan);

  inputWrapper.appendChild(inputLabel);
  inputWrapper.appendChild(inputError);
  root.appendChild(inputWrapper);

  elements[elementKey] = {
    ...elements[elementKey],
    inputLabel,
    inputLabelSpan,
    // inputIcon
  };

  return elements;
};

export default createInput;