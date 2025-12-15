import { useState } from "react";
import axios from "axios";

export default function TryOn() {
  const [person, setPerson] = useState(null);
  const [cloth, setCloth] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Render backend URL (OXIRIDA / QO‘YMAYMIZ)
  const BACKEND_URL = "https://smartfit3.onrender.com";

  const handleSubmit = async () => {
    if (!person || !cloth) {
      alert("Iltimos, 2 ta rasm yuklang");
      return;
    }

    const formData = new FormData();
    formData.append("person", person);
    formData.append("cloth", cloth);

    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/try-on`, // ✅ TO‘G‘RI ROUTE
        formData
      );

      // ✅ Backend image qaytaryapti
      setResult(res.data.image);
    } catch (error) {
      console.error("TRY ON ERROR:", error);
      alert("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          AI Virtual Try-On
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
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading ? "AI ishlayapti..." : "Kiydirish"}
        </button>

        {result && (
          <div className="mt-4 text-center">
            <h2 className="font-semibold mb-2">Natija:</h2>
            <img
              src={result}
              alt="Result"
              className="mt-2 rounded-xl w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
