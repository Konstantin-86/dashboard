import React, { useState } from 'react';
import data from './dataMok';
import styles from '../../styles/Templates/Templates.module.css';

const Templates = () => {
  const [templates, setTemplates] = useState(data);
  return (
    <div className={styles.inner}>
      <ul className={styles.list}>
        {templates.map((elem) => (
          <li key={elem.id}>{elem.namePerson}</li>
        ))}
      </ul>
    </div>
  );
};

export default Templates;
