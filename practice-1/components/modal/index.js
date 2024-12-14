import {
  addOptionsToElementFromObject,
  addClassToElementOptions,
  extractElementsFromArray
} from "../helpers.js";

const createModal = (root, options, addChildrens) => {
  const elementKey =
    (root?.id ? `${root?.id}-` : '')
    + (options?.attributes?.id ? options.attributes.id : 'modal');

  const modal = document.createElement('div');
  const modalContent = document.createElement(options?.form ? 'form' : 'div');
  modalContent.noValidate = true;

  modal.classList.add('default--modal');

  addOptionsToElementFromObject(modalContent, addClassToElementOptions(options, 'default--modal-content'));

  modal.classList.add('hidden');

  const childrens = addChildrens(modalContent);
  modal.appendChild(modalContent);
  root.appendChild(modal);

  return {
    [elementKey]: {
      modal,
      modalContent
    },
    ...extractElementsFromArray(childrens)
  }
};

export default createModal;