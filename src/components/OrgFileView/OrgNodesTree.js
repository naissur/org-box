import React, { PropTypes } from 'react';
import { setPropTypes, compose, pure, setDisplayName, withReducer } from 'recompose';


import {
  getNextSubtreeVisibility, setSubtreeVisibility, cycleSubtreeVisibility,
  CYCLE_SUBTREE_VISIBILITY,
  NODE_HIDDEN, NODE_FOLDED, NODE_OPEN
} from './org-utils';

import OrgNode from './OrgNode';



const visibilityReducer = (visibilityTree, action) => {
  const { payload } = action;

  switch (action.type) {
    case CYCLE_SUBTREE_VISIBILITY:
      const { node, nodes } = payload;

      const nextVisibility = getNextSubtreeVisibility(visibilityTree, nodes, node);
      const nextSubtreeVisibility = setSubtreeVisibility(nodes, node, visibilityTree, nextVisibility);

      return nextSubtreeVisibility;

    default:
      return visibilityTree;
  }
}
const NodesTree = withReducer(
  'visibilityTree', 'dispatch', visibilityReducer, {},
  ({ visibilityTree, dispatch, nodes }) => {

    return (
      <div>
        {nodes.map((node, index) => {
          const nodeVisibility = (visibilityTree[node.key] || NODE_FOLDED);

          if ( (nodeVisibility !== NODE_HIDDEN) || (index === 0) ) return (
            <OrgNode
              key={index}
              {...node} open={nodeVisibility === NODE_OPEN}
              cycleVisibility={() => dispatch(cycleSubtreeVisibility({ node, nodes }))}
            />
          );

          return null;
        })}
      </div>
    );
  }
);

export default compose(
  pure,
  setDisplayName('OrgNodesTree'),
  setPropTypes({
    nodes: PropTypes.array.isRequired
  })
)(NodesTree);

