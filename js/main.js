window.onload = function () {
    ;(function () {

        if (window.matchMedia('max-width:992px').matches) {
            return;
        }

        let headerPage = document.querySelector('.header-container');
        window.addEventListener('scroll', function () {
            if (window.scrollY > 0) {
                headerPage.classList.add('is-active');
            } else {
                headerPage.classList.remove('is-active');
            }
        })
    })();
    let body = document.body;
    let popupItem = document.querySelectorAll('.popup-item');
    let btnClose = document.querySelectorAll('.btn-close');
    let popupMenu = document.getElementById('popup-menu');
    let burger = document.querySelector('.hamburger');
    let btnCost = document.querySelectorAll('.btn-cost');
    let popupCost = document.getElementById('popup-cost');


    function toggleScrollON() {
        body.classList.add('no-scroll');
    }

    function toggleScrollOff() {
        body.classList.remove('no-scroll');
    }

    burger.addEventListener('click', function () {
        popupMenu.classList.add('open-modal');
        toggleScrollON();
    })

    btnCost.forEach((item) => {
        item.addEventListener('click', function () {
            popupCost.classList.add('open-modal');
            toggleScrollON();
        })
    })

    function closeModal() {
        popupMenu.classList.remove('open-modal');
        toggleScrollOff();
    }

    popupItem.forEach((item) => {
        item.addEventListener('click', closeModal)
    });
    btnClose.forEach((item) => {
        item.addEventListener('click', function () {
            if (popupMenu) {
                popupMenu.classList.remove('open-modal');
                toggleScrollOff();
            }
            if (popupCost) {
                popupCost.classList.remove('open-modal');
                toggleScrollOff();
            }
        })
    })
    // btnClose.addEventListener('click', closeModal);


    ;(function () {
        let menuSection = document.getElementById('menu');

        if (menuSection === null) {
            return;
        }

        let catalog = menuSection.querySelector('.menu-items');
        let catalogNav = menuSection.querySelector('.menu-nav-items');
        let catalogItems = document.querySelectorAll('.menu-item');
        let menuBtn = document.querySelector('.menu-btn');

        // menuBtn.addEventListener('click', function (e) {
        //     let target = e.target;

        //     let previousBtnActive = catalogNav.querySelector('menu-btn.active');
        //     console.log(target);
        //     menuBtn.classList.remove('active');
        //     target.classList.add('active');
        //
        let removeChildren = function (item) {
            while (item.firstChild) {
                item.removeChild(item.firstChild);
            }
        }
        let updateChildren = function (item, children) {

            removeChildren(item);
            for (let i = 0; i < children.length; i++) {
                item.appendChild(children[i]);
            }
        };


        catalogNav.addEventListener('click', function (e) {
            let target = e.target;
            let filterValue = target.getAttribute('data-filter');

            if (target.classList.contains('menu-btn')) {
                const selected = this.querySelector('.active');
                if (selected) {
                    selected.classList.remove('active');
                }
                target.classList.add('active');
            }
            if (filterValue === 'all') {
                updateChildren(catalog, catalogItems);
                return;
            }

            let filteredItems = [];
            for (let i = 0; i < catalogItems.length; i++) {
                let current = catalogItems[i];
                if (current.getAttribute('data-category') === filterValue) {
                    filteredItems.push(current);
                }
            }
            updateChildren(catalog, filteredItems);
        })
    })();


    let closestItemByClass = function (item, className) {
            let node = item;

            while (node) {
                if (node.classList.contains(className)) {
                    return node;
                }
                node = node.parentElement;
            }
            return null;
        }

    ;(function () {
        let catalog = document.querySelector('.menu-items');
        if (catalog === null) {
            return;
        }

        let updateProductPrice = function (product, price) {
            let productPrice = product.querySelector('.menu-cost');
            productPrice.textContent = price;
                };

        let chadgeProductSize = function (target) {
            let product = closestItemByClass(target, 'menu-item');
            let previousBtnActive = product.querySelector('.size-item.size-active');
            let newPrice = target.getAttribute('data-product-sizeprice');

            previousBtnActive.classList.remove('size-active');
            target.classList.add('size-active');
            updateProductPrice(product, newPrice);
        }
        let changeProdductOrderInfo = function (target) {
            let product = closestItemByClass(target, 'menu-item');
            let order = document.querySelector('.popup-order');
            let productTitle = product.querySelector('.menu-title').textContent;
            let productSize = product.querySelector('.size-item.size-active').textContent;
            let productPrice = product.querySelector('.menu-cost').textContent;
            let productImgSrc = product.querySelector('.product-img').getAttribute('src');


            order.querySelector('.order-info-title').setAttribute('value', productTitle);
            order.querySelector('.order-info-size').setAttribute('value', productSize);
            order.querySelector('.order-info-price').setAttribute('value', productPrice);

            order.querySelector('.order-product-title').textContent = productTitle;
            order.querySelector('.order-product-price').textContent = productPrice;
            order.querySelector('.order-size-popup').textContent = productSize;
            order.querySelector('.popup-img').setAttribute('src', productImgSrc);
        };

        catalog.addEventListener('click', function (e) {
            let target = e.target;

            if (target.classList.contains('size-item') && !target.classList.contains('size-active')) {
                e.preventDefault();
                chadgeProductSize(target);
            }
            if (target.classList.contains('btn-cost')) {
                e.preventDefault();
                changeProdductOrderInfo(target);
            }
        })
    })();


    ;(function () {
        var forms = document.querySelectorAll('.form-send');

        if (forms.length === 0) {
            return;
        }

        var serialize = function (form) {
            var items = form.querySelectorAll('input, select, textarea');
            var str = '';
            for (var i = 0; i < items.length; i += 1) {
                var item = items[i];
                var name = item.name;
                var value = item.value;
                var separator = i === 0 ? '' : '&';

                if (value) {
                    str += separator + name + '=' + value;
                }
            }
            return str;
        };

        var formSend = function (form) {
            var data = serialize(form);
            var xhr = new XMLHttpRequest();
            var url = 'mail.php';

            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onload = function () {
                var activePopup = document.querySelector('.popup.open-modal');

                if (activePopup) {
                    activePopup.classList.remove('open-modal');
                } else {
                    myLib.toggleScroll();
                }

                if (xhr.response === 'success') {
                    document.querySelector('.success').classList.add('open-modal');
                } else {
                    document.querySelector('.popup-error').classList.add('open-modal');
                }

                form.reset();
            };

            xhr.send(data);
        };

        for (var i = 0; i < forms.length; i += 1) {
            forms[i].addEventListener('submit', function (e) {
                e.preventDefault();
                var form = e.currentTarget;
                formSend(form);
            });
        }
    })();

}

