import React, { useState } from 'react';
import data from './dataMok';
import styles from '../../styles/Templates/Templates.module.css';

const Templates = () => {
  const [templates, setTemplates] = useState(data);
  return (
    <div className={styles.inner}>
      <ul className={styles.list}>
        {templates.map((elem) => (
          <li key={elem.id}>
            <p>{elem.namePerson}</p>
            <p>с {elem.startTime} до {elem.endTime}</p>
            <p>{elem.currentRate} р.</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Templates;
