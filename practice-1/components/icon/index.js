import {
  addOptionsToElementFromObject,
  addClassToElementOptions
} from "../helpers.js";

const createIcon = (path, options) => {
  const icon = document.createElement('img');
  icon.src = path;
  const iconWrapper = document.createElement('span');
  addOptionsToElementFromObject(iconWrapper, addClassToElementOptions(options, 'default--icon'));
  iconWrapper.appendChild(icon);

  return iconWrapper;
};

export default createIcon;