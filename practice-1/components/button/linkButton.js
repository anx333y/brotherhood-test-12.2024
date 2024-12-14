import {
  addOptionsToElementFromObject,
  addClassToElementOptions
} from "../helpers.js";

const createLinkButton = (root, options) => {
  const elementKey =
    (root?.id ? `${root?.id}-` : '')
    + (options?.attributes?.id ? options.attributes.id : 'linkButton');

  const buttonType =
    options?.attributes?.type
    ? options.attributes.type
    : 'button';

  const button = document.createElement('button');
  addOptionsToElementFromObject(button, addClassToElementOptions(
  {...options, attributes: {...options?.attributes, type: buttonType}},
  'default--link-button'
));
  root.appendChild(button);

  return {
    [elementKey]: button
  }
};

export default createLinkButton;