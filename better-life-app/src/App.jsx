import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  ReactFlowProvider,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';

import HomeSettings from './components/HomeSettings';

// Nodes & Edges imports
import initialNodes from './nodes/nodes';
import initialEdges from './edges/edges';

// Custom Node template imports
import UserNode from './nodes/user-node/UserNode';


const nodeTypes = { user: UserNode };

let userLoggedIn = true;

export default function App() {

  const [nodes, setNodes, onNodesChange] = useNodesState(userLoggedIn ? initialNodes : userNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


  return (
    <div style={{ width: '100vw', height: '100vh', border: '2px solid black' }}>

      <ReactFlowProvider>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap nodeStrokeWidth={3} zoomable pannable />
          <Panel />
        </ReactFlow>
      <HomeSettings nodes={nodes} />
      </ReactFlowProvider>

    </div>
  );
}
