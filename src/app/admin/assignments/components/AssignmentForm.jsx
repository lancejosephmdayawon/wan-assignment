"use client";

import { useState } from "react";

export default function AssignmentForm({ initialData, onCancel, onSubmit }) {
  const [date, setDate] = useState(new Date(initialData.date.seconds * 1000).toISOString().substr(0,10));
  const [location, setLocation] = useState(initialData.location);
  const [songLeader, setSongLeader] = useState(initialData.songLeader);
  const [backupSingers, setBackupSingers] = useState(initialData.backupSingers.join(", "));
  const [musicians, setMusicians] = useState(initialData.musicians.join(", "));
  const [dancers, setDancers] = useState(initialData.dancers.join(", "));
  const [elyon, setElyon] = useState(initialData.elyon);
  const [uniform, setUniform] = useState(initialData.uniform);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: initialData.id,
      date: new Date(date),
      location,
      songLeader,
      backupSingers: backupSingers.split(",").map(s => s.trim()),
      musicians: musicians.split(",").map(s => s.trim()),
      dancers: dancers.split(",").map(s => s.trim()),
      elyon,
      uniform,
      songLineup: initialData.songLineup
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border px-3 py-2 rounded"/>
      </div>
      <div>
        <label>Location</label>
        <select value={location} onChange={e => setLocation(e.target.value)} className="w-full border px-3 py-2 rounded">
          <option>Macamot</option>
          <option>Mambog</option>
          <option>Batingan</option>
        </select>
      </div>
      <div>
        <label>Song Leader</label>
        <input type="text" value={songLeader} onChange={e => setSongLeader(e.target.value)} className="w-full border px-3 py-2 rounded"/>
      </div>
      <div>
        <label>Backup Singers (comma separated)</label>
        <input type="text" value={backupSingers} onChange={e => setBackupSingers(e.target.value)} className="w-full border px-3 py-2 rounded"/>
      </div>
      <div>
        <label>Musicians (comma separated)</label>
        <input type="text" value={musicians} onChange={e => setMusicians(e.target.value)} className="w-full border px-3 py-2 rounded"/>
      </div>
      <div>
        <label>Dancers (comma separated)</label>
        <input type="text" value={dancers} onChange={e => setDancers(e.target.value)} className="w-full border px-3 py-2 rounded"/>
      </div>
      <div>
        <label>Elyon</label>
        <input type="text" value={elyon} onChange={e => setElyon(e.target.value)} className="w-full border px-3 py-2 rounded"/>
      </div>
      <div>
        <label>Uniform</label>
        <input type="text" value={uniform} onChange={e => setUniform(e.target.value)} className="w-full border px-3 py-2 rounded"/>
      </div>

      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
      </div>
    </form>
  );
}
