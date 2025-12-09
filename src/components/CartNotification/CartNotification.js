// CartNotification.jsx
import { useEffect, useState } from 'react';

import SingleNotification from './SingleNotification';
import { notificationManager } from '~/components/CartNotification/NotificationManager';

function CartNotification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const unsubscribe = notificationManager.subscribe((notifs) => {
            setNotifications(notifs);
        });

        return unsubscribe;
    }, []);

    const handleClose = (notificationId) => {
        notificationManager.removeNotification(notificationId);
    };

    const reversedNotifications = [...notifications].reverse();

    return (
        <>
            {reversedNotifications.map((notif, index) => (
                <SingleNotification
                    key={notif.id}
                    sizeId={notif.sizeId}
                    index={index}
                    notificationId={notif.id}
                    createdAt={notif.createdAt}
                    onClose={handleClose}
                />
            ))}
        </>
    );
}

export default CartNotification;
