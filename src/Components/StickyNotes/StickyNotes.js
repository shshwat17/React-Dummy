import React, { useState, useRef, useCallback } from "react";
import "./sticky-notes.css";

const NOTE_WIDTH = 200;
const NOTE_HEIGHT = 100;

const StickyNote = () => {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);

  const draggingIndexRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const isOverlapping = useCallback((others, rect, ignoreIndex = null) => {
    return others.some((note, i) => {
      if (i === ignoreIndex) return false;
      return !(
        rect.left + rect.width <= note.left ||
        rect.left >= note.left + NOTE_WIDTH ||
        rect.top + rect.height <= note.top ||
        rect.top >= note.top + NOTE_HEIGHT
      );
    });
  }, []);

  const addNote = () => {
    let left = 50;
    let top = 50;

    while (
      isOverlapping(notes, {
        left,
        top,
        width: NOTE_WIDTH,
        height: NOTE_HEIGHT,
      })
    ) {
      left += 30;
      top += 30;
    }

    const id = `Note-${Date.now()}`;

    setNotes((prev) => [...prev, { id, left, top, text: ``, editing: true }]);
    setEditingNoteId(id);
  };

  const handleMouseDown = (e, index) => {
    if (editingNoteId) return; // Prevent drag if editing

    draggingIndexRef.current = index;
    const note = notes[index];
    offsetRef.current = {
      x: e.clientX - note.left,
      y: e.clientY - note.top,
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = useCallback(
    throttle((e) => {
      const index = draggingIndexRef.current;
      if (index === null) return;

      const newLeft = e.clientX - offsetRef.current.x;
      const newTop = e.clientY - offsetRef.current.y;

      const proposedRect = {
        left: newLeft,
        top: newTop,
        width: NOTE_WIDTH,
        height: NOTE_HEIGHT,
      };

      if (isOverlapping(notes, proposedRect, index)) return;

      setNotes((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], left: newLeft, top: newTop };
        return updated;
      });
    }, 10),
    [notes]
  );

  const handleMouseUp = () => {
    draggingIndexRef.current = null;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleEdit = (id) => {
    setEditingNoteId(id);
  };

  const handleTextChange = (e, index) => {
    const newText = e.target.value;
    setNotes((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], text: newText };
      return updated;
    });
  };

  const handleBlur = () => {
    setEditingNoteId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditingNoteId(null);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2> Sticky Notes (Editable & Non-Overlapping)</h2>
      <button onClick={addNote}>Add Note</button>

      <div className="draggableArea">
        {notes.map((note, index) => (
          <div
            key={note.id}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onDoubleClick={() => handleEdit(note.id)}
            className="notes"
            style={{
              left: note.left,
              top: note.top,
              width: NOTE_WIDTH,
              height: NOTE_HEIGHT,
              cursor: editingNoteId === note.id ? "text" : "move",
              padding: 10,
            }}
          >
            {editingNoteId === note.id ? (
              <textarea
                value={note.text}
                onChange={(e) => handleTextChange(e, index)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                className="stickyNotesText"
              />
            ) : (
              note.text || "Double click to edit"
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNote;

// Throttle utility
function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
