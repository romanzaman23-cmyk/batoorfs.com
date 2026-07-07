type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl mb-12 ${alignClass}`}>
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold uppercase tracking-[0.25em] mb-3 ${
            light ? "text-sky-200" : "text-gold"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-sky-100" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
      <div
        className={`mt-6 h-1 w-16 rounded-full gradient-gold origin-left ${
          align === "center" ? "mx-auto" : ""
        }`}
        style={{
          animation: "fadeInUp 0.8s ease-out 0.3s forwards",
          opacity: 0,
          animationFillMode: "forwards",
        }}
      />
    </div>
  );
}
