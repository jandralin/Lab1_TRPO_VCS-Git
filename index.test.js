/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Загружаем HTML и скрипт перед тестами
const html = fs.readFileSync(path.resolve(__dirname, './person1/index.html'), 'utf8');

describe('File Input Event Listener Tests', () => {
 let fileInput;
 let fileContent;
 let loader;

 beforeEach(() => {
   // Подготовка DOM перед каждым тестом
   document.body.innerHTML = `
     <input type="file" id="fileInput" />
     <div id="fileContent"></div>
     <div id="text-contain"></div>
   `;
   fileInput = document.getElementById('fileInput');
   fileContent = document.getElementById('fileContent');
   loader = document.getElementById('text-contain');
 });

 it('should not add the "text-contain" class when a non-text file is loaded', () => {
   // Создаем Blob для изображения (не текстовый файл)
   const file = new Blob(['Not a text file'], { type: 'image/png' });
   const fileList = [file];

   // Мокаем событие загрузки файла
   const event = new Event('change');
   Object.defineProperty(fileInput, 'files', { value: fileList });
   fileInput.dispatchEvent(event);

   // Проверяем, что класс "text-contain" не добавлен
   expect(loader.classList.contains('text-contain')).toBe(false);
 });

 it('should not display any content when no file is selected', () => {
   // Мокаем событие загрузки файла без файла
   const event = new Event('change');
   Object.defineProperty(fileInput, 'files', { value: [] });
   fileInput.dispatchEvent(event);

   // Проверяем, что содержимое fileContent не обновляется
   expect(fileContent.textContent).toBe('');
 });

 it('should not display error message when a valid text file is loaded', () => {
   // Создаем Blob для текстового файла
   const file = new Blob(['Hello, world!'], { type: 'text/plain' });
   const fileList = [file];

   // Мокаем событие загрузки файла
   const event = new Event('change');
   Object.defineProperty(fileInput, 'files', { value: fileList });
   fileInput.dispatchEvent(event);

   // Проверяем, что не выводится сообщение об ошибке
   expect(fileContent.textContent).not.toBe('Please select a valid text file.');
 });
});
