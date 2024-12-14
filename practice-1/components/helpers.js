export const addOptionsToElementFromObject = (element, options) => {
  if (options.attributes) {
    for (const [attr, value] of Object.entries(options.attributes)) {
      element.setAttribute(attr, value);
    }
  }

  if (options.classes) {
    element.classList.add(...options.classes);
  }

  if (options.styles) {
    for (const [prop, value] of Object.entries(options.styles)) {
      element.style[prop] = value;
    }
  }

  if (options.textContent) {
    element.textContent = options.textContent;
  }

  if (options.innerHTML) {
    element.innerHTML = options.innerHTML;
  }

  return element;
};

export const addClassToElementOptions = (options, className) => {
  return {
      ...options,
      'classes':
      Array.isArray(options?.classes)
      ? [...options.classes, className]
      : [className]
  };
};

export const addChildrens = (element, childrensFunc) => {
  const childrens = childrensFunc(element);

  if (!Array.isArray(childrens)) {
    return;
  }

  childrens.forEach((children) => {
    element.appendChild(children);
  })
};

export const extractElementsFromArray = (elements) => {
  let extractingElementsObject = {};

  elements.forEach((element) => {
    extractingElementsObject = {
      ...extractingElementsObject,
      ...element
    }
  });

  return extractingElementsObject;
}