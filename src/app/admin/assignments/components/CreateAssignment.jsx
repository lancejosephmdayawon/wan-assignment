"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

export default function CreateAssignment({ onSuccess }) {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("Macamot");
  const [songLeader, setSongLeader] = useState("");
  const [backupSingers, setBackupSingers] = useState("");
  const [musicians, setMusicians] = useState("");
  const [dancers, setDancers] = useState("");
  const [elyon, setElyon] = useState("");
  const [uniform, setUniform] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "assignments"), {
        date: new Date(date),
        location,
        songLeader,
        backupSingers: backupSingers.split(",").map(s => s.trim()),
        musicians: musicians.split(",").map(s => s.trim()),
        dancers: dancers.split(",").map(s => s.trim()),
        elyon,
        uniform,
        songLineup: {}, // Empty initially; song leader can add later
        createdAt: serverTimestamp(),
      });
      setMessage("Assignment created successfully!");
      onSuccess?.(); // Callback to refresh assignments list
      // Reset form
      setDate("");
      setSongLeader("");
      setBackupSingers("");
      setMusicians("");
      setDancers("");
      setElyon("");
      setUniform("");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-2">Create New Assignment</h2>

      {message && <p className="text-green-500">{message}</p>}

      <div>
        <label className="block mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Location</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border rounded px-3 py-2">
          <option>Macamot</option>
          <option>Mambog</option>
          <option>Batingan</option>
        </select>
      </div>

      <div>
        <label className="block mb-1">Song Leader</label>
        <input
          type="text"
          value={songLeader}
          onChange={(e) => setSongLeader(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Name of song leader"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Backup Singers (comma separated)</label>
        <input
          type="text"
          value={backupSingers}
          onChange={(e) => setBackupSingers(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1">Musicians (comma separated)</label>
        <input
          type="text"
          value={musicians}
          onChange={(e) => setMusicians(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1">Dancers (comma separated)</label>
        <input
          type="text"
          value={dancers}
          onChange={(e) => setDancers(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1">Elyon</label>
        <input
          type="text"
          value={elyon}
          onChange={(e) => setElyon(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1">Uniform</label>
        <input
          type="text"
          value={uniform}
          onChange={(e) => setUniform(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Red, Blue, etc."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Create Assignment
      </button>
    </form>
  );
}
