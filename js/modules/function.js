//check Webp format
export function isWebp() {
   function testWebP(callback) {

      var webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {

      if (support == true) {
         document.querySelector('body').classList.add('webp');
      } else {
         document.querySelector('body').classList.add('no-webp');
      }
   });

}

export function rating() {

   const ratings = document.querySelectorAll('.rating')
   if (ratings.length > 0) {
      initRatings();
   }

   function initRatings() {
      let ratingActive, ratingValue;
      for (let index = 0; index < ratings.length; index++) {
         const rating = ratings[index];
         initRating(rating);
      }

      function initRating(rating) {
         initRatingVars(rating)

         setRatingActiveWidth();

         if (rating.classList.contains('rating__set')) {
            setRating(rating);
         }
      }

      function initRatingVars(rating) {
         ratingActive = rating.querySelector('.rating__active');
         ratingValue = rating.querySelector('.rating__value');
      }

      function setRatingActiveWidth(index = ratingValue.innerHTML) {
         const ratingActiveWidth = index / 0.05;
         ratingActive.style.width = `${ratingActiveWidth}%`;
      }

      function setRating(rating) {

         const ratingItems = rating.querySelectorAll('.rating__item');
         for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];

            ratingItem.addEventListener('mouseenter', function (e) {
               initRatingVars(rating)
               setRatingActiveWidth(ratingItem.value);
            });

            ratingItem.addEventListener('mouseleave', function (e) {
               setRatingActiveWidth();
            });

            ratingItem.addEventListener('click', function (e) {
               initRatingVars(rating)

               if (rating.dataset.ajax) {
                  setRatingValue(ratingItem.value, rating);

               } else {
                  ratingValue.innerHTML = index + 1;
                  setRatingActiveWidth();
               }
            });
         }
      }
   }
}

export function tabs() {
   const tabsBtn = document.querySelectorAll(".tabs__nav-btn");
   const tabsItems = document.querySelectorAll(".tabs__item");

   tabsBtn.forEach(onTabClick);

   function onTabClick(item) {
      item.addEventListener("click", function () {
         let currentBtn = item;
         let tabId = currentBtn.getAttribute("data-tab");
         let currentTab = document.querySelector(tabId);

         if (!currentBtn.classList.contains('active')) {
            tabsBtn.forEach(function (item) {
               item.classList.remove('active');
            });

            tabsItems.forEach(function (item) {
               item.classList.remove('active');
            });

            currentBtn.classList.add('active');
            currentTab.classList.add('active');
         }
      });
   }

   document.querySelector('.tabs__nav-btn').click();



}

export function popup() {
   const popupLinks = document.querySelectorAll('.popup-link');
   const body = document.querySelector('.body');
   const lockPadding = document.querySelectorAll(".lock-padding");

   let unlock = true;

   const timeout = 800;

   if (popupLinks.length > 0) {
      for (let index = 0; index < popupLinks.length; index++) {
         const popupLink = popupLinks[index];
         popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);

            popupOpen(curentPopup)
            e.preventDefault();
         })
      }
   }
   const popupCloseIcon = document.querySelectorAll('.close-popup');
   if (popupCloseIcon.length > 0) {
      for (let index = 0; index < popupCloseIcon.length; index++) {
         const el = popupCloseIcon[index];
         el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
         })
      }
   }

   function popupOpen(curentPopup) {
      if (curentPopup && unlock) {
         const popupActive = document.querySelector('.popup.open');
         if (popupActive) {
            popupClose(popupActive, false);
         } else {
            bodyLock();
            updatePopupContent();
         }
         curentPopup.classList.add('open');
         curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
               popupClose(e.target.closest('.popup'));
            }
         });
      }
   }

   function popupClose(popupActive, doUnlock = true) {
      if (unlock) {
         popupActive.classList.remove('open');
         if (doUnlock) {
            bodyUnLock();
         }
      }
   }

   function bodyLock() {
      const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
         }
      }
      document.querySelector('body').style.paddingRight = lockPaddingValue;
      document.querySelector('body').classList.add('lock');

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);
   }

   function bodyUnLock() {
      setTimeout(function () {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
         document.querySelector("body").style.paddingRight = "0px";
         document.querySelector("body").classList.remove("lock");
      }, 0);

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);

   }
   function updatePopupContent() {
      // Получаем ссылку на попап и на все карточки товаров
      const popup = document.getElementById("popup3");
      const cardItems = document.querySelectorAll(".card__item");
      const cardTitle = popup.querySelector(".card__inner-title");
      const cardPrice = popup.querySelector(".card__inner-price");
      const popupImage = popup.querySelector(".popup__inner-img");
      const characteristicsList = popup.querySelector(".characteristics__full-list");

      // Функция для открытия попапа и отображения информации о товаре
      function openPopup(cardItem) {
         cardTitle.textContent = cardItem.querySelector(".card__inner-title").textContent;
         cardPrice.textContent = cardItem.querySelector(".card__inner-price").textContent;
         popupImage.src = cardItem.querySelector(".card__inner-img").getAttribute("src");

         cardPrice.setAttribute("data-price", cardPrice.textContent);
         // Получаем характеристики товара в виде строки
         const labelsString = cardItem.getAttribute("data-label");
         const valuesString = cardItem.getAttribute("data-value");

         // Разбиваем строки на массивы характеристик
         const labels = labelsString.split(", ");
         const values = valuesString.split(", ");

         // Очищаем предыдущие данные характеристик товара в попапе
         while (characteristicsList.firstChild) {
            characteristicsList.removeChild(characteristicsList.firstChild);
         }

         // Добавляем характеристики товара в попап по порядку
         for (let i = 0; i < labels.length && i < values.length; i++) {
            const label = labels[i];
            const value = values[i];

            const dl = document.createElement("div");
            dl.className = "characteristics__full-item";

            const dt = document.createElement("dt");
            dt.className = "characteristics__full-label";
            dt.textContent = label;

            const dd = document.createElement("dd");
            dd.className = "characteristics__full-value";
            dd.textContent = value;

            dl.appendChild(dt);
            dl.appendChild(dd);

            characteristicsList.appendChild(dl);
         }
      }

      // Добавляем обработчики событий для каждой карточки товара
      cardItems.forEach(function (cardItem) {
         cardItem.addEventListener("click", function () {
            openPopup(cardItem);
         });
      });

   }


   document.addEventListener('keydown', function (e) {
      if (e.which === 27) {
         const popupActive = document.querySelector('.popup.open');
         popupClose(popupActive);
      }
   })
}

export function select() {

   let selectHeader = document.querySelectorAll('.select__header');
   let selectItem = document.querySelectorAll('.select__item');

   selectHeader.forEach(item => {
      item.addEventListener('click', selectToggle)
   });

   selectItem.forEach(item => {
      item.addEventListener('click', selectChoose)
   });

   function selectToggle() {
      this.parentElement.classList.toggle('is-active');
   }

   function selectChoose() {
      let text = this.innerText,
         select = this.closest('.select'),
         currentText = select.querySelector('.select__current');
      currentText.innerText = text;
      select.classList.remove('is-active');

   }
}

export function burgerMenu() {
   const menu = document.querySelector('.nav__burger-menu');
   const menuBtn = document.querySelector('.nav__burger');
   const body = document.body;

   if (menu && menuBtn) {

      menuBtn.addEventListener('click', () => {
         menu.classList.toggle('active');
         menuBtn.classList.toggle('active');
         body.classList.toggle('lock');
      })

      menu.addEventListener('click', e => {
         if (e.target.classList.contains('nav__burger-menu')) {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.classList.remove('lock');
         }
      })
   }
}


export function countDown() {
   const day = document.getElementById("day");
   const hrs = document.getElementById("hrs");
   const min = document.getElementById("min");
   const sec = document.getElementById("sec");

   const currentYear = new Date().getFullYear();

   const newYear = new Date(`1 Jan ${currentYear + 1} 00:00:00`)

   function countdownTimer() {
      const todayDate = Date.now();
      const gap = newYear - todayDate;

      const d = Math.floor(7);
      const h = Math.floor((gap / 1000 / 60 / 60) % 24);
      const m = Math.floor((gap / 1000 / 60) % 60);
      const s = Math.floor((gap / 1000) % 60);

      day.innerHTML = d < 10 ? "0" + d : d;
      hrs.innerHTML = h < 10 ? "0" + h : h;
      min.innerHTML = m < 10 ? "0" + m : m;
      sec.innerHTML = s < 10 ? "0" + s : s;
   }
   setInterval(countdownTimer, 1000);
}

export function menuMobile() {
   let isMobile = {
      Android: function () { return navigator.userAgent.match(/Android/i); },
      BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
      iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
      Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
      Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
      any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
   };

   let body = document.querySelector('body');

   if (isMobile.any()) {
      body.classList.add('touch');
      let arrow = document.querySelectorAll('.arrow');
      let i = 0;
      for (i = 0; i < arrow.length; i++) {
         let thisLink = arrow[i].previousElementSibling;
         let subMenu = arrow[i].nextElementSibling;
         let thisArrow = arrow[i];

         thisLink.classList.add('parent');
         arrow[i].addEventListener('click', function () {
            subMenu.classList.toggle('open');
            thisArrow.classList.toggle('active');
         });
      }
   } else {
      body.classList.add('mouse');
   }

}

export function Counter() {
   const counters = document.querySelectorAll('[data-counter]');
   const priceElement = document.getElementById("price");



   if (counters) {
      counters.forEach(counter => {
         counter.addEventListener('click', e => {
            const target = e.target;
            const dataPriceValue = priceElement.getAttribute("data-price");
            let priceText = dataPriceValue;
            const price = parseFloat(priceText.replace(/[^\d.]/g, '')); // Удаляем символы, оставляем только числа и точку

            function updatePrice(value) {
               if (value < 1) {
                  priceElement.textContent = `₴${price}`;
               } else {

                  priceElement.textContent = `₴${price * value}`;
               }
            }

            if (target.closest('.counter__button')) {
               if (target.closest('.counter').querySelector('input').value == '' && (target.classList.contains('counter__button-minus') || target.classList.contains('counter__button-plus'))) {
                  target.closest('.counter').querySelector('input').value = 1;
               }

               let value = parseInt(target.closest('.counter').querySelector('input').value);

               if (target.classList.contains('counter__button-plus')) {
                  value++;
                  updatePrice(value)

               } else {
                  --value;
                  updatePrice(value)
               }

               if (value <= 1) {
                  value = 1;
                  target.closest('.counter').querySelector('.counter__button-minus').classList.add('disabled')
               } else {
                  target.closest('.counter').querySelector('.counter__button-minus').classList.remove('disabled')
               }

               target.closest('.counter').querySelector('input').value = value;
            }
         })
      })
   }


}


export function scrollAnimate() {
   const scrollItems = document.querySelectorAll('.scroll-item');

   const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('animation-class');
         } else {
            entry.target.classList.remove('animation-class');
         }
      });
   });

   scrollItems.forEach(el => {
      observer.observe(el);
   });
}
