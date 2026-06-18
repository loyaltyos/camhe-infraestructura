export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-wide text-camhe-yellow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-normal text-camhe-black sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-neutral-600">{description}</p> : null}
    </div>
  );
}
