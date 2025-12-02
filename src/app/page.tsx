"use client";
import { useEffect, useState } from "react";

interface Laporan {
  m_number: string;
  nim: string;
  nama: string;
  jenis_kelamin: string;
  jurusan: string;
  ipk: number | string;
  kode_mk: string;
  nama_mk: string;
  dosen: string;
  sks: number | string;
}

interface LaporanResponse {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  data: Laporan[];
}

export default function Home() {
  const [data, setData] = useState<Laporan[]>([]);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const res = await fetch(
      `http://localhost:8000/api/laporan?page=${page}&size=${size}`
    );
    const json: LaporanResponse = await res.json();
    setData(json.data);
    setTotalPages(json.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDownloadWithWA = async () => {
    const recruiterPhone = "6281287765396";
    const message = encodeURIComponent(
      "Halo kak, berikut laporan Excel mahasiswa. Silakan cek ya 🙏"
    );
    window.open(`https://wa.me/${recruiterPhone}?text=${message}`, "_blank");

    setTimeout(() => {
      window.location.href = `http://localhost:8000/api/export/laporan`;
    }, 1500);
  };

  return (
    <div className="p-6">
      <button
        onClick={handleDownloadWithWA}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        Download Excel & Chat WA
      </button>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">M#</th>
            <th className="p-2 border">NIM</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Jenis Kelamin</th>
            <th className="p-2 border">Jurusan</th>
            <th className="p-2 border">IPK</th>
            <th className="p-2 border">Kode MK</th>
            <th className="p-2 border">Nama MK</th>
            <th className="p-2 border">Dosen</th>
            <th className="p-2 border">SKS</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-center">
              <td className="p-2 border">{row.m_number}</td>
              <td className="p-2 border">{row.nim}</td>
              <td className="p-2 border">{row.nama}</td>
              <td className="p-2 border">{row.jenis_kelamin}</td>
              <td className="p-2 border">{row.jurusan}</td>
              <td className="p-2 border">{row.ipk}</td>
              <td className="p-2 border">{row.kode_mk}</td>
              <td className="p-2 border">{row.nama_mk}</td>
              <td className="p-2 border">{row.dosen}</td>
              <td className="p-2 border">{row.sks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
