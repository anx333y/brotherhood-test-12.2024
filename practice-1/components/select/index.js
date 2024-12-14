import {
  addOptionsToElementFromObject,
  addClassToElementOptions
} from "../helpers.js";
import createIcon from "../icon/index.js";

const createSelect = (root, options, values) => { // убрать остатки от input
  const elementKey =
    (root?.id ? `${root?.id}-` : '')
    + (options?.attributes?.id ? options.attributes.id : 'select');

  let elements = {};

  const select = document.createElement('select');
  addOptionsToElementFromObject(select, addClassToElementOptions(
    {...options, 'textContent': undefined},
    'default--select'
  ));

  if (Array.isArray(values)) {
    values.forEach((value) => {
      const selectOption = document.createElement('option');
      selectOption.classList.add('default--select-option');
      selectOption.textContent = value;

      select.appendChild(selectOption);
    })
  }

  const selectWrapper = document.createElement('div');
  selectWrapper.classList.add('default--select-wrapper');

  selectWrapper.appendChild(select);

  const iconPath = options?.icon || '/practice-1/assets/icons/downArrow.svg';

  if (iconPath) {
    const selectIconWrapper = document.createElement('label');
    selectIconWrapper.htmlFor = options?.attributes.id;
    selectIconWrapper.classList.add('default--select-icon');
    const selectIcon = createIcon(iconPath);
    selectIconWrapper.appendChild(selectIcon);

    selectWrapper.appendChild(selectIconWrapper);
  }

  elements = {
    [elementKey]: {
      select,
      selectWrapper
    }
  }

  if (!options?.textContent) {
    root.appendChild(selectWrapper);
    return elements;
  }

  selectWrapper.classList.add('default--select-with-label');

  const selectLabelSpan = document.createElement('span');
  selectLabelSpan.classList.add('default--select-label-span');
  selectLabelSpan.textContent = options?.textContent;

  const selectLabel = document.createElement('label');
  selectLabel.htmlFor = options?.attributes.id;
  selectLabel.classList.add('default--select-label');

  const selectError = document.createElement('span');
  selectError.classList.add('default--select-error');

  select.placeholder = options.placeholder || ' ';

  if (options?.attributes.required) {
    const selectLabelrequired = document.createElement('span');
    selectLabelrequired.innerHTML = '&#10033;';
    selectLabelrequired.classList.add('default--select-label--required');
    selectLabel.appendChild(selectLabelrequired);
  }

  selectLabel.appendChild(selectLabelSpan);

  selectWrapper.appendChild(selectLabel);
  selectWrapper.appendChild(selectError);

  root.appendChild(selectWrapper);

  elements[elementKey] = {
    ...elements[elementKey],
    selectLabel,
    selectLabelSpan,
    selectError
  };

  return elements;
};

export default createSelect;