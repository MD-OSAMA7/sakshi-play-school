function SectionHeading({
  eyebrow = "",
  title,
  description = "",
  align = "left",
  className = "",
}) {
  const alignment = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div className={`flex max-w-3xl flex-col ${alignment[align]} ${className}`}>
      {eyebrow && (
        <span className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-brand-blue">
          {eyebrow}
        </span>
      )}

      <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.01em] text-brand-navy md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-2xl text-base leading-6 text-text-secondary md:text-lg md:leading-7">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;