/**
 * main.js — Интерактивные функции KeyCraft на базе Bootstrap 5 API
 * Управляет динамической подстановкой товаров в модальное окно,
 * отображением всплывающих уведомлений Toast и интерактивностью галереи.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Инициализация всех всплывающих подсказок Bootstrap (Tooltips)
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // 2. Инициализация Toast-уведомлений
  const toastLiveExample = document.getElementById('notificationToast');
  let toastInstance = null;
  if (toastLiveExample) {
    toastInstance = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  }

  // Функция для вызова уведомления
  function showToastNotification(message) {
    if (toastLiveExample && toastInstance) {
      const toastBody = toastLiveExample.querySelector('.toast-body');
      if (toastBody && message) {
        toastBody.textContent = message;
      }
      toastInstance.show();
    }
  }

  // 3. Динамическая подстановка товара в модальное окно «Быстрый заказ»
  const quickOrderModal = document.getElementById('quickOrderModal');
  if (quickOrderModal) {
    quickOrderModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      if (!button) return;

      const productName = button.getAttribute('data-bs-product');
      const productSelect = quickOrderModal.querySelector('#modalProductChoice');

      if (productSelect && productName) {
        let matched = false;
        for (let i = 0; i < productSelect.options.length; i++) {
          const option = productSelect.options[i];
          if (option.text.toLowerCase().includes(productName.toLowerCase()) || 
              option.value.toLowerCase().includes(productName.toLowerCase())) {
            productSelect.selectedIndex = i;
            matched = true;
            break;
          }
        }
        if (!matched && productSelect.options.length > 0) {
          productSelect.selectedIndex = 1;
        }
      }
    });

    // Обработка отправки формы в модальном окне
    const modalForm = quickOrderModal.querySelector('form');
    if (modalForm) {
      modalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const modalInstance = bootstrap.Modal.getInstance(quickOrderModal);
        if (modalInstance) {
          modalInstance.hide();
        }
        modalForm.reset();
        showToastNotification('Спасибо за заявку! Наш менеджер свяжется с вами в течение 10 минут.');
      });
    }
  }

  // 4. Обработка формы на странице оформления заказа (order.html)
  const orderForm = document.getElementById('mainOrderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToastNotification('Заказ успешно подтверждён! Номер бронирования #KC-2026-981. Детали отправлены на вашу почту.');
      orderForm.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Обработка формы на странице контактов (contacts.html)
  const contactForm = document.getElementById('contactFeedbackForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToastNotification('Ваше обращение принято! Мы ответим на указанную почту в ближайшее время.');
      contactForm.reset();
    });
  }

  // 6. Переключение миниатюр в галерее на странице товара (product.html)
  const mainGalleryImg = document.getElementById('mainProductImage');
  const thumbButtons = document.querySelectorAll('.product-thumb-btn');

  if (mainGalleryImg && thumbButtons.length > 0) {
    thumbButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        thumbButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const newSrc = this.getAttribute('data-img-src');
        if (newSrc) {
          mainGalleryImg.setAttribute('src', newSrc);
        }
      });
    });
  }

  // 7. Кнопки «Добавить в корзину» с вызовом Toast
  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
  addToCartButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const prodTitle = this.getAttribute('data-product-title') || 'Товар';
      showToastNotification(`«${prodTitle}» добавлен в корзину!`);
    });
  });
});
