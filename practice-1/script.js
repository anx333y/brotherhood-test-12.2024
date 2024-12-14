import createButton from './components/button/index.js';
import createLinkButton from './components/button/linkButton.js';
import {uploadFileHandler} from './components/input/handlers.js';
import createInput from './components/input/index.js';
import createUploadFileInput from './components/input/uploadFileInput.js';
import createModal from './components/modal/index.js';
import createSelect from './components/select/index.js';
import createTypography from './components/typography/index.js';
import createWrapper from './components/wrapper/index.js';
import {changeFieldsHandler, openModalHandler} from './handlers.js';
import {getInfoFromInputs, validateField} from './helpers.js';

const rootElement = document.querySelector('#root');

const openModalBtn = createButton(
  rootElement,
  {
    textContent: 'Открыть модальное окно',
    id: 'openModalBtn'
  }
)['root-button'];

createLinkButton(
  rootElement,
  {
    textContent: 'Отменить'
  }
);

createInput(
  rootElement,
  {
    // textContent: 'Название организации',
    attributes: {
      id: 'superInput',
      required: true
    }
  }
);

// создание модального окна с вложенными компонентами и получение всех дом элементов в модалке
const modalElements = createModal(
  rootElement,
  {
    form: true
  },
  (modal) => [
    createTypography(
      modal,
      {
        textContent: 'Стать партнёром проекта',
        variant: 'h2'
      }
    ),
    createWrapper(
      modal,
      {
        classes: ['modal-content__top-content'],
        attributes: {
          id: 'top-content'
        }
      },
      (baseWrapper) => [
        createWrapper(
          baseWrapper,
          {
            classes: ['modal-content__top-content__left'],
            attributes: {
              id: 'top-content__left'
            }
          },
          (leftWrapper) => [
            createInput(
              leftWrapper,
              {
                textContent: 'Название организации',
                attributes: {
                  id: 'nameOrganization',
                  required: true
                }
              }
            ),
            createInput(
              leftWrapper,
              {
                textContent: 'Телефон',
                attributes: {
                  id: 'phone',
                  required: true
                }
              }
            ),
            createInput(
              leftWrapper,
              {
                textContent: 'Email',
                attributes: {
                  id: 'email',
                  required: true,
                }
              }
            ),
          ]
        ),
        createWrapper(
          baseWrapper,
          {
            classes: ['modal-content__top-content__right'],
            attributes: {
              id: 'top-content__right'
            }
          },
          (rightWrapper) => [
            createUploadFileInput(
              rightWrapper,
              {
                textContent: 'Логотип (jpeg, png)',
                attributes: {
                  id: 'file',
                  required: true,
                  name: 'uploadFile'
                }
              }
            ),
          ]
        )
      ]
    ),
    createSelect(
      modal,
      {
        textContent: 'Направление',
        attributes: {
          id: 'direction',
          required: true
        }
      },
      [
        'Экология',
        'Робототехника',
        'Геодезия',
        'Информатика'
      ]
    ),
    createInput(
      modal,
      {
        attributes: {
          id: 'global'
        },
        icon: '/practice-1/assets/icons/global.svg'
      }
    ),
    createInput(
      modal,
      {
        attributes: {
          id: 'vk'
        },
        icon: '/practice-1/assets/icons/vk.svg'
      }
    ),
    createInput(
      modal,
      {
        attributes: {
          id: 'odnoklassniki'
        },
        icon: '/practice-1/assets/icons/odnoklassniki.svg'
      }
    ),
    createInput(
      modal,
      {
        attributes: {
          id: 'facebook'
        },
        icon: '/practice-1/assets/icons/facebook.svg'
      }
    ),
    createInput(
      modal,
      {
        attributes: {
          id: 'instagram'
        },
        icon: '/practice-1/assets/icons/instagram.svg'
      }
    ),
    createInput(
      modal,
      {
        attributes: {
          id: 'youtube'
        },
        icon: '/practice-1/assets/icons/youtube.svg'
      }
    ),
    createInput(
      modal,
      {
        textContent: 'Руководитель',
        attributes: {
          id: 'leader'
        }
      }
    ),
    createButton(
      modal,
      {
        textContent: 'Стать партнёром проекта',
        attributes: {
          type: 'submit'
        }
      }
    ),
    createLinkButton(
      modal,
      {
        textContent: 'Отменить',
        id: 'cancelBtn'
      }
    )
  ]
);

// Навешивание листенеров и обработка ошибок
const modal = modalElements['root-modal'].modal;
const cancelBtn = modalElements['linkButton'];

openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
  }
});

// изменение превью на uploadFile и получения пути к картинке, возможных ошибок при его получении
const uploadFileInputElements = modalElements['top-content__right-file'];
const uploadFileInputCancelBtn = uploadFileInputElements['inputCancelFileBtn'];
let uploadFilePath = '';

uploadFileInputElements?.input.addEventListener('change', async (event) => {
  try {
    const {path, error} = await uploadFileHandler(event, uploadFileInputElements['inputCancelFileBtn']);
    uploadFilePath = path;

    if (error) {
      uploadFileInputElements.inputError.textContent = error;
      uploadFileInputElements.inputNew.style.backgroundImage = '';
    } else {
      uploadFileInputElements.inputError.textContent = '';
    }
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error.message);
  }
});

// uploadFileInputCancelBtn.addEventListener('click', () => {
//   const form = modalElements['root-modal'].modalContent;

//   const formData = new FormData(form);
//   formData.delete('file');

//   formData.remove();
// });

// поля формы
const inputs = {
  'organization': {
    elements: modalElements['top-content__left-nameOrganization'],
    value: '',
    error: false
  },
  'phone': {
    elements: modalElements['top-content__left-phone'],
    value: '',
    error: false
  },
  'email': {
    elements: modalElements['top-content__left-email'],
    value: '',
    error: false
  },
  'direction': {
    elements: modalElements['direction'],
    value: '',
    error: false
  },
  'global': {
    elements: modalElements['global'],
    value: '',
    error: false
  },
  'vk': {
    elements: modalElements['vk'],
    value: '',
    error: false
  },
  'odnoklassniki': {
    elements: modalElements['odnoklassniki'],
    value: '',
    error: false
  },
  'facebook': {
    elements: modalElements['facebook'],
    value: '',
    error: false
  },
  'instagram': {
    elements: modalElements['instagram'],
    value: '',
    error: false
  },
  'youtube': {
    elements: modalElements['youtube'],
    value: '',
    error: false
  },
  'leader': {
    elements: modalElements['leader'],
    value: '',
    error: false
  },
  'file': {
    elements: modalElements['top-content__right-file'],
    value: uploadFilePath,
    error: false
  }
};

// проверка, что все необходимые поля заполнены и нет ошибок, чтобы включить кнопку сабмит
// валидация всех полей формы при изменении их состояния
document.addEventListener(
  'DOMContentLoaded',
  () => changeFieldsHandler(inputs, modalElements['button'])
);

// отправление формы
const form = modalElements['root-modal'].modalContent;
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  Object.entries(inputs).forEach(([key, group]) => {
    validateField(key, group);
  });

  const [result, isError] = getInfoFromInputs(inputs);

  if (!isError) {
    //
    // тут работа с данными формы
    //
    console.log(result)
  }

});