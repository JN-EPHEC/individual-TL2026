import { useEffect, useState } from 'react';

interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [erreur, setErreur] = useState('');

  // Lire la liste
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users');
      if (!res.ok) throw new Error('Erreur');
      const data = await res.json();
      setUsers(data);
      setErreur('');
    } catch (err) {
      setErreur("⚠️ Problème de connexion au serveur !");
    }
  };

  // Supprimer un utilisateur
  const deleteUser = async (id: number) => {
    await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' });
    fetchUsers(); 
  };

  useEffect(() => { 
    fetchUsers(); 
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Liste des Utilisateurs</h1>
      
      {erreur && <h3 style={{ color: 'red' }}>{erreur}</h3>}

      <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th style={{ padding: '8px' }}>ID</th>
            <th style={{ padding: '8px' }}>Prénom</th>
            <th style={{ padding: '8px' }}>Nom</th>
            <th style={{ padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td style={{ padding: '8px' }}>{u.id}</td>
              <td style={{ padding: '8px' }}>{u.prenom}</td>
              <td style={{ padding: '8px' }}>{u.nom}</td>
              <td style={{ padding: '8px' }}>
                <button onClick={() => deleteUser(u.id)} style={{ color: 'red', cursor: 'pointer' }}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;