export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                `
                w-full
                inline-flex items-center justify-center
                rounded-xl
                px-5 py-3
                text-sm font-bold tracking-wide
                text-white
                bg-[#1E3A8A] hover:bg-[#1B357D]
                shadow-md hover:shadow-lg
                active:scale-[0.98]
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/25
                disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
                ${className}
                `
            }
        >
            {children}
        </button>
    );
}
