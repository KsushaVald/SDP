# SDP
Online store layout. Five pages: home, catalog, contacts, cooperation.

Проект для портфолио. Вёрстка пяти страниц онлайн магазина:
1) Главная,
2) Каталог,
3) Страница товара,
4) Контакты,
5) Сотрудничество.

Все страницы адаптивные, реализована по макету Figma (pixelPerfect).

Ссылка на хостинг: http://sdp.kvald.tw1.ru/

Главная
Состоит из 6 основных разделов, содержащих слайдеры (swiper.js), слайдеры с карточками (flex, swiper.js), карточки товаров реализованы c помощью css-grid, формы с использованием imask и just-validate.js, также содержит css анимацию и анимацию gsap.js.

Каталог
Состоит из чекбоксов, и списка товаров, реализована навигация по каталогу(javaScriprt) и добавление лейблов при выборе соответствующего чекбокса. Страница реализована с помощью css-grid, gsap.js, javaScript, css-фнимация.

Страница товара
1) Слайдер изображений товара с превью. По нажатии на большое изображение товара откроется модальное окно со слайдером (swiper.js). По нажатии на превью меняется большое изображение.
2) Описание товара и схематическое изображение.
3) Рейтинг, название, описание цена.
4) Кнопка "Купить в один клик", открывает модальное окно с формой (imask, just-validate), отправка формы открывает либо окно "Спасибо, мы вам перезвоним", либо "Что-то пошло не так..."
5) Кнопка добавить в корзину и характеристика товара.

Контакты
Содержит карту (Яндекс Карта) с маркерами и тултипами, так же реализован поиск по магазинам.

Сотрудничество
Текстовая страница со списками.

Сборака пректа:
npm run dev - режим разаротки (пака dist).
npm run build - для хостинга (папка product).
