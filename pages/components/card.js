export default function Card({ title, children }) {
  return (
    <div className="relative z-10 max-w-lg w-full mx-auto bg-gray-900/80 backdrop-blur rounded-2xl shadow-2xl p-6 border border-gray-700 text-white">
      <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>
      {children}
    </div>
  );
}
