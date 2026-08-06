const steps = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
];

export default () => (
  <div className="grid grid-cols-11 gap-1">
    {steps.map(step => (
      <div
        key={step}
        className="aspect-square rounded-sm border border-black/10"
        style={{ background: `var(--color-charcoal-${step})` }}
      />
    ))}
    {steps.map(step => (
      <div key={step} className="text-center text-xs font-medium">
        {step}
      </div>
    ))}
  </div>
);
