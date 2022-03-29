import React, { Component } from "react";
import "./navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="name">Algorithm Visualizer</h2>
        <nav className="navbar">
          <ul className="items">
            <li>
              <button
                className="btn-visualize"
                onClick={() => this.visualizeDijkstra()}
              >
                Visualize Dijkstra's Algo
              </button>
            </li>
            <li>
              <button className="btn-simple">Clear Grid</button>
            </li>
            <button className="btn-simple">Add a node</button>
          </ul>
        </nav>
      </div>
    );
  }
}
