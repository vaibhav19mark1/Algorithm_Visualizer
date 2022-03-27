//! Implementation of dijkstra's algorithm
// it returns all the nodes in order in which they were visited
// also keeps track of the shortest path by backtracking from finish node

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
//   console.log(unvisitedNodes);
  while (!!unvisitedNodes.length) {
    sortNodes(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    // For Walls
    if (closestNode.isWall) continue;

    // For trapped case
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbours(closestNode, grid);
  }
}

// for sorting the nodes according to distance
function sortNodes(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// update the unvisited nodes by incrementing their distance
function updateUnvisitedNeighbours(node, grid) {
  const unvisitedNeighbours = getunvisitedNeighbours(node, grid);
  for (const neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
  }
}

// get all the unvisited nodes
function getunvisitedNeighbours(node, grid) {
  const neighbours = [];
  const { row, col } = node;
  if (row > 0) {
    neighbours.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    neighbours.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbours.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1) {
    neighbours.push(grid[row][col + 1]);
  }
  return neighbours.filter(neighbour => !neighbour.isVisited);
}

// get all nodes
function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// determining the shortest path for tracing it
export function getShortestPath(finishNode) {
  const shortestPathNodes = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
      shortestPathNodes.unshift(currentNode);
      console.log(currentNode)
      currentNode = currentNode.previousNode;
    }
  return shortestPathNodes;
}
