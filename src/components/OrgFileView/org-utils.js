import org from 'org-mode-parser';
import curry from 'curry'
import { compose, equals, map, prop, filter, reduce, all, assoc } from 'ramda';

export const CYCLE_SUBTREE_VISIBILITY = 'CYCLE_SUBTREE_VISIBILITY';
export const FOLDED = 'FOLDED';
export const CHILDREN = 'CHILDREN';
export const SUBTREE = 'SUBTREE';

export const NODE_OPEN = 'NODE_OPEN';
export const NODE_FOLDED = 'NODE_FOLDED';
export const NODE_HIDDEN = 'NODE_HIDDEN';

/*
export const getNextVisibility = curr => {
  switch (curr) {
    case FOLDED: return CHILDREN;
    case CHILDREN: return SUBTREE;
    case SUBTREE: return FOLDED;
    default: return FOLDED;
  }
}
*/

export const cycleSubtreeVisibility= curry(
  ({ node, nodes }) => ({ type: CYCLE_SUBTREE_VISIBILITY, payload: { node, nodes }})
);

export const getSubtreeNodes = curry(
  (nodes, node) => {
    const ofd = new org.OrgQuery(nodes);

    const subtree = ofd.selectSubtree(node);
    const { allNodes } = subtree;
    
    return allNodes;
  }
);

export const getSubtreeNodesKeys = curry(
  (nodes, node) => 
    compose(
      map(prop('key')),
      getSubtreeNodes(nodes)
    )(node)
);

const getChildrenNodes = curry(
  (nodes, node) => (
    filter(
      compose(equals(node.level + 1), prop('level'))
    )(getSubtreeNodes(nodes, node))
  )
);

const getChildrenNodesKeys = curry(
  (nodes, node) => (
    compose(
      map(prop('key')),
      getChildrenNodes(nodes)
    )(node)
  )
);

export const getNextSubtreeVisibility = curry(
  (visibilityTree, nodes, node) => {
    const subtreeNodes = getSubtreeNodes(nodes, node);

    const nodeKey = node.key;
    const subtreeKeys = subtreeNodes.map(x => x.key);

    const nodeFolded = (visibilityTree[nodeKey] === NODE_FOLDED);

    if (nodeFolded) return CHILDREN;

    const allOpen = compose(
      all(equals(NODE_OPEN)),
      map(key => visibilityTree[key])
    )(subtreeKeys);

    if (allOpen) return FOLDED;

    const allChildrenOpen = compose(
      all(equals(NODE_OPEN)),
      map(key => (visibilityTree[key])),
      getChildrenNodesKeys(nodes)
    )(node);

    if (allChildrenOpen) return SUBTREE;

    return SUBTREE;
  }
);


const setNodesVisibility = curry(
  (val, keys, currTree ) => (
    reduce(
      (res, key) => assoc(key, val, res),
      currTree,
      keys
    )
  )
);

export const setSubtreeVisibility = curry(
  (nodes, node, visibilityTree, nextVisibility) => {
    const nodeKey = node.key;
    const subtreeNodesKeys = getSubtreeNodesKeys(nodes, node);
    const childrenNodesKeys = getChildrenNodesKeys(nodes, node);

    switch (nextVisibility) {
      case FOLDED:
        return compose(
          assoc(nodeKey, NODE_FOLDED),
          setNodesVisibility(NODE_HIDDEN, subtreeNodesKeys)
        )(visibilityTree);
        
      case CHILDREN:
        return compose(
          assoc(nodeKey, NODE_OPEN),
          setNodesVisibility(NODE_FOLDED, childrenNodesKeys),
          setNodesVisibility(NODE_HIDDEN, subtreeNodesKeys)
        )(visibilityTree);
        
      case SUBTREE:
        return compose(
          assoc(nodeKey, NODE_OPEN),
          setNodesVisibility(NODE_OPEN, subtreeNodesKeys)
        )(visibilityTree);


      default: return visibilityTree;
    }
  }
);
