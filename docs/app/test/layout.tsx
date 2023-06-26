export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-full bg-yellow-300 p-10">{children}</div>;
}
