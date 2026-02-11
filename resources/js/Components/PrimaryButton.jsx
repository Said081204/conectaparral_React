export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                /* Cambié bg-gray-800 por tu azul #1E3A8A y quité los rings de colores */
                `inline-flex items-center justify-center rounded-lg border border-transparent bg-[#1E3A8A] px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-800 focus:outline-none active:bg-[#1E3A8A] ${
                    disabled && 'opacity-50 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}