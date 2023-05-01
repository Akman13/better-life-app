import React, { useEffect, useRef } from 'react';
import { useStoreApi, useReactFlow } from 'reactflow';




export default function HomeSettings() {
  const store = useStoreApi();
  
  const { setCenter, setViewport } = useReactFlow();

  useEffect(() => {
    const { nodeInternals } = store.getState();
    const nodes = Array.from(nodeInternals).map(([, node]) => node);
    
    const userNode = nodes.find(node => node.type === 'user');

    const centerX = userNode.position.x + userNode.data.width / 2;
    const centerY = userNode.position.y + userNode.data.height / 2;
    setCenter(centerX, centerY)
  }, [setCenter])

  return (
    <></>
  );
};