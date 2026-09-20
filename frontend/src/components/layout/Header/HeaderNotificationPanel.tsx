interface NotificationPanelProps {
    notifications: number;
}

export const HeaderNotificationPanel = ({ notifications }: NotificationPanelProps) => {
    return (
        <section
            id="notifications-panel"
            className="
                absolute
                right-0
                top-12
                z-50
                min-h-40
                w-80
                overflow-hidden
                rounded-xl
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                text-[var(--color-text)]
                shadow-xl
            "
        >
            <h1
                className="flex items-center justify-between p-4 font-semibold"
            >
                <span>
                    Powiadomienia
                </span>
                <span
                    className="
                        text-sm 
                        text-[var(--color-text-muted)]
                    "
                >
                    {notifications} nowych
                </span>
            </h1>
        </section>
    );
};
