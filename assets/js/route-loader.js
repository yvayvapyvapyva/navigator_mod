/**
 * Route Loader Module
 * Модуль загрузки маршрута через модальное окно
 */

const RouteLoader = {
    container: null,
    callback: null,
    
    // Инициализация
    init(onRouteLoaded) {
        this.callback = onRouteLoaded;
        this.createModal();
        this.checkUrlParam();
    },
    
    // Создание модального окна
    createModal() {
        const html = `
            <div id="jsonModal">
                <div class="modal-sheet">
                    <div class="modal-title">Введите название маршрута</div>
                    <input type="text" id="routeNameInput" class="modal-input" placeholder="" style="margin-top: 16px;">
                    <div class="modal-buttons" style="margin-top: 16px;">
                        <button id="loadRouteBtn" class="modal-btn modal-btn-green">Загрузить</button>
                    </div>
                </div>
            </div>
        `;
        
        // Вставляем после загрузочного экрана
        const loading = document.getElementById('loading');
        if (loading) {
            loading.insertAdjacentHTML('afterend', html);
        } else {
            document.body.insertAdjacentHTML('afterbegin', html);
        }
        
        // Навешиваем обработчик
        document.getElementById('loadRouteBtn').addEventListener('click', () => {
            const routeName = document.getElementById('routeNameInput').value.trim();
            if (!routeName) {
                if (typeof showToast === 'function') {
                    showToast('Введите название маршрута', 'error');
                }
                return;
            }
            this.loadRoute(routeName);
        });
    },
    
    // Проверка URL параметра
    checkUrlParam() {
        const routeParam = new URLSearchParams(window.location.search).get('m');
        if (routeParam) {
            // Скрываем модальное окно и загружаем маршрут
            const modal = document.getElementById('jsonModal');
            if (modal) modal.classList.add('hidden');
            this.loadRoute(routeParam);
        }
    },
    
    // Загрузка маршрута
    loadRoute(routeName) {
        if (typeof this.callback === 'function') {
            this.callback(routeName);
        }
    },
    
    // Скрыть модальное окно
    hide() {
        const modal = document.getElementById('jsonModal');
        if (modal) modal.classList.add('hidden');
    },
    
    // Показать модальное окно
    show() {
        const modal = document.getElementById('jsonModal');
        if (modal) modal.classList.remove('hidden');
    }
};
