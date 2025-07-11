export default function PageHeader({ title, subtitle }) {
  return (
    <header className="bg-blue-600 text-white py-10 shadow-md">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-white text-sm mt-2">{subtitle}</p>}
      </div>
    </header>
  );
}
