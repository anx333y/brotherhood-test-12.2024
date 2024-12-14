export const uploadFileHandler = (event, closeButton) => {
  const file = event.target.files[0];

  const result = {
    path: null,
    error: null
  };

  if (!file) {
    return Promise.resolve(result);
  }

  if (!file.type.match(/image\/(png|jpeg|jpg)/)) {
    result.error = "Пожалуйста, загрузите файл в формате PNG или JPEG/JPG.";
    return Promise.resolve(result);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileURL = e.target.result;

      const labelElement = event.target.previousElementSibling;

      if (labelElement) {
        labelElement.style.backgroundImage = `
          linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
          url(${fileURL})
        `;

        closeButton.classList.remove('hidden');
      } else {
        closeButton.classList.add('hidden');
      }

      result.path = fileURL;
      resolve(result);
    };

    reader.onerror = () => {
      result.error = "Ошибка при чтении файла.";
      reject(result);
    };

    reader.readAsDataURL(file);
  });
};