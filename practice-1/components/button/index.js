import {
  addOptionsToElementFromObject,
  addClassToElementOptions
} from "../helpers.js";

const createButton = (root, options) => {
  const elementKey =
    (root?.id ? `${root?.id}-` : '')
    + (options?.attributes?.id ? options.attributes.id : 'button');

  const buttonType =
    options?.attributes?.type
    ? options.attributes.type
    : 'button';

  const button = document.createElement('button');
  addOptionsToElementFromObject(button, addClassToElementOptions(
    {...options, attributes: {...options?.attributes, type: buttonType}},
    'default--button'
  ));

  root.appendChild(button);

  return {
    [elementKey]: button
  }
};

export default createButton;