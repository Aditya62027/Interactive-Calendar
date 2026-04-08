"use client";
import { useState, useEffect } from "react";

export default function NotesPanel({ selectedDate }) {
  const [notes, setNotes] = useState({});

  const [input, setInput] = useState("");

  const [showPopup, setShowPopup] = useState(false);

   useEffect(() => {
    const savedData = localStorage.getItem("notes");

try {
  const parsed = savedData ? JSON.parse(savedData) : {};
  setNotes(parsed);
} catch (error) {
  setNotes({});
}
    setNotes(savedData);
  }, []);

   // Updating the input when date changes.
  useEffect(() => {
    if (selectedDate) {
      const key = selectedDate.toDateString();
      setInput(notes[key] || "");
    }
  }, [selectedDate, notes]);

  // Saving the note
  const saveNote = () => {
  if (!selectedDate) return;

  const key = selectedDate.toDateString();
  const updated = { ...notes, [key]: input };

  setNotes(updated);
  localStorage.setItem("notes", JSON.stringify(updated));

  // Show popup
  setShowPopup(true);

  // Clear input after saving
  setInput("");

  // Hide popup after 2 seconds
  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
};


 return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="mb-2 font-semibold text-mauve-800">
        {selectedDate
          ? `Notes for ${selectedDate.toDateString()}`
          : "Select a date"}
      </h3>

          {showPopup && (
  <div className="mt-2 text-green-600 font-semibold">
    ✅ Saved successfully!
  </div>
)}

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-24 p-2 border rounded text-black"
      />

      <button
        onClick={saveNote}
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded 
             cursor-pointer transition-all duration-200 hover:scale-105"
      >
        Save
      </button>
    </div>
  );
}