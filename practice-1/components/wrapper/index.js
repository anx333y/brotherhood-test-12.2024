import {
  addOptionsToElementFromObject,
  addClassToElementOptions,
  extractElementsFromArray
} from "../helpers.js";

const createWrapper = (root, options, addChildrens) => {
  const elementKey =
    (root?.id ? `${root?.id}-` : '')
    + (options?.attributes?.id ? options.attributes.id : 'wrapper');

  const wrapper = document.createElement('div');
  addOptionsToElementFromObject(wrapper, addClassToElementOptions(
    options,
    'default--wrapper'
  ));

  const childrens = addChildrens(wrapper);
  root.appendChild(wrapper);

  return {
    [elementKey]: {
      wrapper
    },
    ...extractElementsFromArray(childrens)
  }
};

export default createWrapper;