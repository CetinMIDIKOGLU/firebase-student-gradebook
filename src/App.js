import { db } from './firebase';
import React, { useState, useEffect } from 'react';
import { push, onValue, remove, ref } from 'firebase/database';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [noteValue, setNoteValue] = useState('');

  
  useEffect(() => {
  const notesRef = ref(db, 'notes'); // ✅ burada tanımla
  const unsubscribe = onValue(notesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const notesArray = Object.keys(data).map(key => ({
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        note: data[key].note,
        timestamp: data[key].timestamp
      }));
      setNotes(notesArray);
    } else {
      setNotes([]);
    }
  });

  return () => unsubscribe();
}, []);

  // Yeni not ekle
  const addNote = (e) => {
  e.preventDefault();
  if (!firstName.trim() || !lastName.trim() || !noteValue.trim()) return;

  const notesRef = ref(db, 'notes'); // ✅ burada tanımla
  push(notesRef, {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    note: noteValue.trim(),
    timestamp: new Date().getTime()
  });

  setFirstName('');
  setLastName('');
  setNoteValue('');
};


 // Not sil
 const deleteNote = (id) => {
  const noteRef = ref(db, 'notes/' + id); // ✅ burada ref() oluştur
  remove(noteRef);
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Öğrenci Not Takip Sistemi</h1>
        <form onSubmit={addNote}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="İsim (Örn: Ali)"
            className="name-input"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Soyisim (Örn: Veli)"
            className="name-input"
          />
          <input
            type="text"
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            placeholder="Not (Örn: 90)"
            className="note-input"
          />
          <button type="submit">Ekle</button>
        </form>
        
        <div className="notes-container">
          {notes.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>İsim</th>
                  <th>Soyisim</th>
                  <th>Not</th>
                  <th>Tarih</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => (
                  <tr key={note.id}>
                    <td>{note.firstName}</td>
                    <td>{note.lastName}</td>
                    <td>{note.note}</td>
                    <td>{new Date(note.timestamp).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => deleteNote(note.id)}>Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Henüz kayıt bulunmamaktadır</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;