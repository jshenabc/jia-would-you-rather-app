import React from 'react'

const NoMatch = ({ location }) => (
  <div>
    <h3>
      404! No match for Path <code>{location.pathname}</code>
    </h3>
  </div>
);

export default NoMatch;
