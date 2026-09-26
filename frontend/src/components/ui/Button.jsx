const buttonVariants = {
  primary:
    "bg-brand-navy text-white shadow-button hover:bg-brand-blue hover:shadow-button-hover",
  secondary:
    "border border-brand-navy bg-transparent text-brand-navy hover:bg-brand-navy hover:text-white",
  accent:
    "bg-brand-gold text-brand-navy shadow-button hover:shadow-button-hover",
};

const buttonSizes = {
  sm: "min-h-10 px-5 text-sm",
  md: "min-h-12 px-7 text-base",
  lg: "min-h-12 px-8 text-base",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-[0.02em] transition-all duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:pointer-events-none disabled:opacity-50 ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;