// NotificationManager.js
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.listeners = [];
    }

    addNotification(sizeId) {
        const id = Date.now() + Math.random();
        const createdAt = Date.now(); // Thêm timestamp
        this.notifications.push({ id, sizeId, createdAt });
        this.notifyListeners();
        return id;
    }

    removeNotification(id) {
        this.notifications = this.notifications.filter((n) => n.id !== id);
        this.notifyListeners();
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    notifyListeners() {
        this.listeners.forEach((listener) => listener([...this.notifications]));
    }
}

export const notificationManager = new NotificationManager();

export const showCartNotification = (sizeId) => {
    notificationManager.addNotification(sizeId);
};
