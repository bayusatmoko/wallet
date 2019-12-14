import React from 'react';
import './not-found.css';

const NoMatch = () => (
  <section className="not-found">
    <div className="circles">
      <p>
          404
        <br />
        <small>PAGE NOT FOUND</small>
      </p>
      <span className="circle big" />
      <span className="circle med" />
      <span className="circle small" />
    </div>
  </section>
);

export default NoMatch;
