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
import RoleNode from './nodes/role-node/RoleNode';
import SkillNode from './nodes/skill-node/SkillNode';

// Custom Connection Line import
import RoleConnectionLine from './components/CustomConnectionLines';

// Utils imports
import determineSourceHandle from './utils/determineSourceHandle';


const nodeTypes = {
  background: BackgroundNode,
  user: UserNode,
  role: RoleNode,
  skill: SkillNode
};

let id = 3;
const getId = () => `${id++}`;



function App() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const reactFlowWrapper = useRef(null);
  const connectingNode = useRef({ nodeId: null, type: '', sourceHandle: { id: '', handleLocation: '', colour: '' } });

  const { project, getNode } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


  const onConnectStart = useCallback((event, { nodeId }) => {
    const sourceNode = getNode(nodeId)
    // console.log('sourceNode', sourceNode)

    connectingNode.current.nodeId = nodeId;
    connectingNode.current.type = sourceNode.type;

    const symbolProp = Object.getOwnPropertySymbols(sourceNode)
    const handleBounds = sourceNode[symbolProp[0]].handleBounds.source

    const cursorCoords = project({ x: event.clientX, y: event.clientY });

    const sourceHandle = determineSourceHandle(cursorCoords, handleBounds)

    connectingNode.current.sourceHandle.id = sourceHandle;
    connectingNode.current.sourceHandle.handleLocation = handleBounds.find(handle => handle.id === sourceHandle).position;

    // TODO - decide on what (if any) colour connection should be there b/w role & skill
    if (sourceNode.type === 'user') {
      connectingNode.current.sourceHandle.colour = sourceNode.data.handleColours[connectingNode.current.sourceHandle.handleLocation];
    }


  }, [project]);



  const onConnectEnd = useCallback(
    (event) => {

      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();

        // we are removing the half of the node width (75) to center the new node
        const projectCoords = project({ x: event.clientX - left - 75, y: event.clientY - top });

        const newNode = {
          id,
          position: projectCoords,
          data: {
            label: `Node ${id}`,
            parentNodeHandleLocation: connectingNode.current.sourceHandle.handleLocation,
            parentNodeHandleColour: connectingNode.current.sourceHandle.colour
          },
        };


        if (connectingNode.current.type === 'user') {
          newNode.type = 'role'
          newNode.data.label = 'Role'

        } else if (connectingNode.current.type === 'role') {
          newNode.type = 'skill'
          newNode.data.label = 'Skill'

        }


        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ id, source: connectingNode.current.nodeId, target: id, sourceHandle: connectingNode.current.sourceHandle.id }));
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
