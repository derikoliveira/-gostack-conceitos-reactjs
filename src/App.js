import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: 'gostack-conceitos-reactjs',
      url: 'https://github.com/derikoliveira/gostack-conceitos-reactjs',
      techs: ['ReactJS', 'Babel', 'Webpack'],
    });

    const addedRepository = data;

    setRepositories([...repositories, addedRepository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then((response) => {
      const deletedRepositoryIndex = repositories.findIndex(
        (repository) => repository.id === id
      );

      repositories.splice(deletedRepositoryIndex, 1);

      setRepositories([...repositories]);
    });
  }

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
