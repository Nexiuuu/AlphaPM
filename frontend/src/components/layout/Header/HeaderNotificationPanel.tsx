interface NotificationPanelProps {
    notifications: number;
}

export const HeaderNotificationPanel = ({ notifications }: NotificationPanelProps) => {
    return (
        <section
            id="notifications-panel"
            className="
                fixed
                left-4
                right-4
                top-[calc(var(--header-height)+var(--header-height)+0.5rem)]
                z-50
                min-h-40
                w-auto
                overflow-hidden
                rounded-xl
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                text-[var(--color-text)]
                shadow-xl
                md:absolute
                md:left-auto
                md:right-0
                md:top-12
                md:w-80
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
                    {notifications}
                </span>
            </h1>
        </section>
    );
};
