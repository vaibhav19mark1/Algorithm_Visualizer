// import { getAllNodes, getunvisitedNeighbours } from "./helperFunctions";

// //! Implementation of dijkstra's algorithm
// // it returns all the nodes in order in which they were visited
// // also keeps track of the shortest path by backtracking from finish node

// export function dijkstra(grid, startNode, finishNode) {
//   const visitedNodesInOrder = [];
//   startNode.distance = 0;
//   const unvisitedNodes = getAllNodes(grid);
// //   console.log(unvisitedNodes);
//   while (!!unvisitedNodes.length) {
//     sortNodes(unvisitedNodes);
//     const closestNode = unvisitedNodes.shift();

//     // For Walls
//     if (closestNode.isWall) continue;

//     // For trapped case
//     if (closestNode.distance === Infinity) return visitedNodesInOrder;
//     closestNode.isVisited = true;
//     visitedNodesInOrder.push(closestNode);
//     if (closestNode === finishNode) return visitedNodesInOrder;
//     updateUnvisitedNeighbours(closestNode, grid);
//   }
// }

// // for sorting the nodes according to distance
// function sortNodes(unvisitedNodes) {
//   unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
// }

// // update the unvisited nodes by incrementing their distance
// function updateUnvisitedNeighbours(node, grid) {
//   const unvisitedNeighbours = getunvisitedNeighbours(node, grid);
//   for (const neighbour of unvisitedNeighbours) {
//     neighbour.distance = node.distance + 1;
//     neighbour.previousNode = node;
//   }
// }

// // determining the shortest path for tracing it
// export function getDijkstraShortestPath(finishNode) {
//   const shortestPathNodes = [];
//   let currentNode = finishNode;
//   while (currentNode !== null) {
//       shortestPathNodes.unshift(currentNode);
//       console.log(currentNode)
//       currentNode = currentNode.previousNode;
//     }
//   return shortestPathNodes;
// }

//! -----------------------------------------------------------------------------------------------------------------------------

export function dijkstra(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  startNode.distance = 0;
  let unvisitedNodes = getNodes(grid);
  let visitedNodesInOrder = [];
  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    let closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    if (closestNode === finishNode) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    updateUnvisitedNeighbours(closestNode, grid);
  }
}

function getNodes(grid) {
  let nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function updateUnvisitedNeighbours(node, grid) {
  let unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  for (let unvisitedNeighbour of unvisitedNeighbours) {
    unvisitedNeighbour.distance = node.distance + 1;
    unvisitedNeighbour.previousNode = node;
  }
}

function getUnvisitedNeighbours(node, grid) {
  let neighbours = [];
  let { row, col } = node;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  return neighbours
    .filter((neighbour) => !neighbour.isWall)
    .filter((neighbour) => !neighbour.isVisited);
}

export function getNodesInShortestPathOrderDijkstra(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
