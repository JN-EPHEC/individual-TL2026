import { useEffect, useState } from 'react'
import './App.css'

interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  // On récupère les users au chargement de la page
  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Erreur API:", err));
  }, []);

  return (
    <div className="App">
      <h1>Liste des Utilisateurs (Le Boat)</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.prenom} {user.nom} (ID: {user.id})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App