"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import CreateAssignment from "./components/CreateAssignment";

export default function AdminAssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // stores assignment being edited

  // Fetch all assignments
  const fetchAssignments = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "assignments"));
    setAssignments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Delete assignment
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;
    await deleteDoc(doc(db, "assignments", id));
    fetchAssignments();
  };

  // Start editing
  const handleEdit = (assignment) => {
    setEditing(assignment);
  };

  // Submit edit
  const handleUpdate = async (updated) => {
    const { id, ...data } = updated;
    await updateDoc(doc(db, "assignments", id), {
      ...data,
      updatedAt: serverTimestamp()
    });
    setEditing(null);
    fetchAssignments();
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Sunday Worship Assignments</h1>

      {/* Create Assignment */}
      {!editing && <CreateAssignment onSuccess={fetchAssignments} />}

      {/* Edit Assignment Form */}
      {editing && (
        <div className="bg-yellow-50 p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Edit Assignment</h2>
          <AssignmentForm
            initialData={editing}
            onCancel={() => setEditing(null)}
            onSubmit={handleUpdate}
          />
        </div>
      )}

      {/* Assignment List */}
      <div className="space-y-4">
        {assignments.map(a => (
          <div key={a.id} className="p-4 border rounded shadow-sm bg-white flex justify-between items-start">
            <div>
              <p><strong>Date:</strong> {new Date(a.date.seconds * 1000).toDateString()}</p>
              <p><strong>Location:</strong> {a.location}</p>
              <p><strong>Song Leader:</strong> {a.songLeader}</p>
              <p><strong>Musicians:</strong> {a.musicians.join(", ")}</p>
              <p><strong>Backup Singers:</strong> {a.backupSingers.join(", ")}</p>
              <p><strong>Dancers:</strong> {a.dancers.join(", ")}</p>
              <p><strong>Uniform:</strong> {a.uniform}</p>
            </div>
            <div className="flex flex-col space-y-2 ml-4">
              <button
                onClick={() => handleEdit(a)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
