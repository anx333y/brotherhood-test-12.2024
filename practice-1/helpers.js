const patternsForValidate = {
  text: /^[a-zA-Zа-яА-Я0-9\s.,'"()\-–—!?;:«»]+$/,
  phone: /^\+7|8\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  link: (domain) => {
    const escapedDomain =
    !!domain
      ? domain
      : '[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{2,})|(?:\\d{1,3}\\.){3}\\d{1,3}|(?:\\:\\d{2,5})';

    return new RegExp(`^(https?:\\/\\/)?(www\\.)?([a-zA-Z0-9-]+\\.)*${escapedDomain}(\\/[^\\s]*)*$`, 'i');
  }
};

export const validateInputValue = (elements, pattern, domain) => {
  const result = {
    value: '',
    error: false
  }

  const value = elements.input.value?.trim();

  if (!value && elements.input.required) {
    elements.inputError.textContent = 'Поле необходимо заполнить';
    result.error = true;
    return result;
  }

  if (!value) {
    elements.inputError.textContent = '';
    return result;
  };

  let testPattern = pattern;

  if (Object.keys(patternsForValidate).includes(pattern)) {
    testPattern =
      (pattern === 'link')
        ? patternsForValidate['link'](domain)
        : patternsForValidate[pattern];
  }

  if(!testPattern.test(value)) {
    elements.inputError.textContent = 'Неверный формат';
    result.error = true;
    return result;
  };

  elements.inputError.textContent = '';
  result.error = false;
  result.value = value;
  return result;
};

export const validateSelectValue = (elements) => {
  const result = {
    value: '',
    error: false
  }

  const value = elements.select.value?.trim();

  if (!value && elements.input.required) {
    elements.selectError.textContent = 'Необходимо выбрать один из вариантов';
    return false;
  }

  if (!value) {
    elements.inputError.textContent = '';
    return result;
  };

  elements.inputError.textContent = '';
  result.error = false;
  result.value = value;
  return result;
};

export const validateFileInputValue = (elements, path) => {
  const result = {
    value: '',
    error: false
  }

  if (!path && elements.input.required) {
    elements.inputError.textContent = 'Необходимо выбрать файл';
    return false;
  }

  if (!value) {
    elements.inputError.textContent = '';
    return result;
  };

  elements.inputError.textContent = '';
  result.error = false;
  result.value = path;
  return result;
};

export const validateField = (key, group) => {
  let error = false;
  let value = '';

  switch (key) {
    case 'organization': {
      ({ error, value } = validateInputValue(group.elements, 'text'));
      break;
    }
    case 'phone': {
      ({ error, value } = validateInputValue(group.elements, 'phone'));
      break;
    }
    case 'email': {
      ({ error, value } = validateInputValue(group.elements, 'email'));
      break;
    }
    case 'global': {
      ({ error, value } = validateInputValue(group.elements, 'link'));
      break;
    }
    case 'vk': {
      ({ error, value } = validateInputValue(group.elements, 'link', 'vk.com'));
      break;
    }
    case 'odnoklassniki': {
      ({ error, value } = validateInputValue(group.elements, 'link', 'ok.ru'));
      break;
    }
    case 'facebook': {
      ({ error, value } = validateInputValue(group.elements, 'link', 'facebook.com'));
      break;
    }
    case 'instagram': {
      ({ error, value } = validateInputValue(group.elements, 'link', 'instagram.com'));
      break;
    }
    case 'youtube': {
      ({ error, value } = validateInputValue(group.elements, 'link', 'youtube.com'));
      break;
    }
    case 'leader': {
      ({ error, value } = validateInputValue(group.elements, 'text'));
      break;
    }
    case 'file': {
      ({ error, value } = validateFileInputValue(group.elements, group.value));
      break;
    }
  }

  group.error = error;
  group.value = value;
};

export const getInfoFromInputs = (inputs) => {
  const result = {};
  let isError = false;

  Object.entries(inputs).forEach(([key, {error, value}]) => {
    if (error) {
      isError = true;
      return;
    }

    if (value) {
      result[key] = value;
    }
  });

  return [result, isError];
};