function Input({
  label,
  id,
  error = "",
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {label}

          {required && (
            <span className="ml-1 text-error" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-12 w-full rounded-md border bg-white px-4 text-base text-text-primary outline-none transition-shadow placeholder:text-text-secondary focus:border-brand-blue focus:ring-[3px] focus:ring-brand-blue/20 ${error ? "border-error" : "border-gray-300"} ${className}`}
        {...props}
      />

      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;