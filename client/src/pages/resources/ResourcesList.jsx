import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const ResourcesList = () => {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    api.get('/resources').then(res => setResources(res.data));
  }, []);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Learning Resources</h1>
      <ul>{resources.map(r => <li key={r._id}><a href={r.fileUrl} target="_blank">{r.title}</a></li>)}</ul>
    </div>
  );
};
export default ResourcesList;