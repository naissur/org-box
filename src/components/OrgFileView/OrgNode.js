import React, { PropTypes } from 'react';
import { setPropTypes, compose, pure, setDisplayName } from 'recompose';


const NodeBody = ({ body }) => (
  <div style={{
    padding: '0px 16px',
    paddingBottom: '0px'
  }} >
    <div
      style={{
        borderLeft: '1px solid #999',
        borderBottom: '1px solid #999'
      }}
    >
      { body.split('\n').map( (line, index) => (
        <p 
          style={{
            padding: '4px 12px'
          }}
          key={index}
        >
          {line}
        </p>
      ))}
    </div>
  </div>
);

const NodeHead = ({ onClick, headline, level, bodyCollapsed }) => {
  const HN = `h${ level}`;

  return (
    <HN style={{
      borderBottom: '1px solid #999',
      borderTop: '1px solid #999',
      borderLeft: '1px solid #999',
      marginTop: '-1px',
      padding:'4px 12px' }} {...{ onClick }}
    >
      { headline }
      { bodyCollapsed ? (<span style={{ color: '#888' }}> ...</span>) : null }
    </HN>
  );
};

const PureNode = ({ open, cycleVisibility, headline, level, body }) => (
  <div style={{ paddingLeft: ((level - 1) * 16) }}>
    <div style={{ cursor: 'pointer' }}>
      <NodeHead {...{ headline, level }} 
        bodyCollapsed={!open} onClick={cycleVisibility}
      />
    </div>

    {open && (body.length > 0) && (
      <NodeBody {...{ body }} />
    )}
  </div>
);

export default compose(
  pure,
  setDisplayName('OrgNode'),
  setPropTypes({
    open: PropTypes.bool,
    cycleVisibility: PropTypes.func.isRequired,
    headline: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired
  })
)(PureNode);

