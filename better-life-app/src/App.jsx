import React, { useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  ReactFlowProvider,
  Background,
  useReactFlow,
  useStoreApi,
  useUpdateNodeInternals
} from 'reactflow';
import 'reactflow/dist/style.css';

import HomeSettings from './components/HomeSettings';

// Nodes & Edges imports
import initialNodes from './nodes/nodes';
import initialEdges from './edges/edges';

// Custom Node template imports
import UserNode from './nodes/user-node/UserNode';
import BackgroundNode from './nodes/background-node/BackgroundNode';

import RoleConnectionLine from './components/CustomConnectionLines';


const nodeTypes = {
  user: UserNode,
  background: BackgroundNode
};

let id = 3;
const getId = () => `${id++}`;



function App() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const reactFlowWrapper = useRef(null);
  const connectingNode = useRef({ nodeId: null, sourceHandle: '' });

  const { project, getNode } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


  const onConnectStart = useCallback((event, { nodeId }) => {
    connectingNode.current.nodeId = nodeId;

    const sourceNode = getNode(nodeId)
    const symbolProp = Object.getOwnPropertySymbols(sourceNode)
    const handleBounds = sourceNode[symbolProp[0]].handleBounds.source

    const handleDistances = [];
    const cursorCoords = project({ x: event.clientX, y: event.clientY});

    for (let handle of handleBounds) {
      const [handleId, handleX, handleY] = [handle.id, handle.x, handle.y]
      console.log('handleId handleX handleY', handleId, handleX, handleY)

      const dx = handleX - cursorCoords.x;
      const dy = handleY - cursorCoords.y;

      const distanceToCursor = Math.sqrt(dx**2 + dy**2);
      handleDistances.push({handleId, distanceToCursor})
    }
    
    const sourceHandle = handleDistances.reduce((cumulativeVal, currentVal) => {
      return (currentVal['distanceToCursor'] < cumulativeVal['distanceToCursor']) ? currentVal : cumulativeVal
    }).handleId

    connectingNode.current.sourceHandle = sourceHandle;

  }, [project]);



  const onConnectEnd = useCallback(
    (event) => {

      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();

        const projectCoords = project({ x: event.clientX - left - 75, y: event.clientY - top });

        const newNode = {
          id,
          // we are removing the half of the node width (75) to center the new node
          position: projectCoords,
          data: { label: `Node ${id}` },
        };


        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ id, source: connectingNode.current.nodeId, target: id, sourceHandle: connectingNode.current.sourceHandle }));
      }
    },
    [project]
  );


  return (
    <div className='wrapper' ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh' }}>


      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionLineComponent={RoleConnectionLine}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
      >
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <Panel />
      </ReactFlow>

      <HomeSettings nodes={nodes} />

    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
