import {
  addOptionsToElementFromObject,
  addClassToElementOptions
} from "../helpers.js";

const createTypography = (root, options) => {
  const elementKey =
    (root?.id ? `${root?.id}-` : '')
    + (options?.attributes?.id ? options.attributes.id : 'typography');

  const typographyVariant = options?.variant;

  if (!typographyVariant) return;

  const typography = document.createElement(typographyVariant); //нужно добавить возможность подставлять необходимый заголовок
  addOptionsToElementFromObject(typography, addClassToElementOptions(
    options,
    'default--typography'
  ));

  root.appendChild(typography);

  return {
    [elementKey]: {
      typography
    }
  }
};

export default createTypography;