import { useState } from "react";

export default function TryOn() {
  const [person, setPerson] = useState(null);
  const [cloth, setCloth] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!person || !cloth) {
      alert("Iltimos, 2 ta rasm yuklang");
      return;
    }

    setLoading(true);
    setResult(null);

    // 3 soniyaga loading
    setTimeout(() => {
      // oldindan tayyor rasmni chiqarish
      setResult("/user.jpg"); // public/images/fake-result.jpg
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">
        AI Virtual Try-On (Demo)
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPerson(e.target.files[0])}
        className="mb-3 w-full"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCloth(e.target.files[0])}
        className="mb-4 w-full"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        {loading ? "AI ishlayapti..." : "Kiydirish"}
      </button>

      {loading && (
        <div className="mt-4 text-center text-gray-500">
          Iltimos kuting, AI analiz qilmoqda...
        </div>
      )}

      {result && (
        <img
          src={result}
          alt="Result"
          className="mt-4 rounded-xl w-full"
        />
      )}
    </div>
  );
}
