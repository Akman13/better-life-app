import React from 'react';

function userConnectionLine(fromX, fromY, toX, toY, r) {
  return (
    <g>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle strokeDasharray={200/r} cx={toX} cy={toY} fill="#fff" r={r} stroke="#222" strokeWidth={1.5} />
    </g>
  )
}

function roleConnectionLine(fromX, fromY, toX, toY, r) {
  return (
    <g>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle cx={toX} cy={toY} fill="#fff" r={r} stroke="#222" strokeWidth={1.5} />
    </g>
  )
}

function skillConnectionLine(fromX, fromY, toX, toY, r) {
  return (
    <g>
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />

        <polygon
          points={`${toX-r} ${toY}, ${toX-0.5*r} ${toY+r}, ${toX+0.5*r} ${toY+r},${toX+r} ${toY}, ${toX+0.5*r} ${toY-r}, ${toX-0.5*r} ${toY-r}`}
          stroke='#222'
          strokeWidth={1.5}
          fill="#fff"
        />

    </g>
  )
}


export default function CustomConnectionLine(
  { fromX,
    fromY,
    fromPosition,
    toX,
    toY,
    toPosition,
    fromNode,
    fromHandle,
    connectionLineType,
    connectionLineStyle }
) {

  // Return options:
  //  - fromNode.type === 'user': dashed circle
  //  - fromNode.type === 'role': 
  //  - fromNode.type === 'skill'
  const sourceIsUser = fromNode.type === 'user'
  const sourceIsRole = fromNode.type === 'role'
    const sourceIsSkill = fromNode.type === 'skill'

  return (
    <>
      {sourceIsUser && userConnectionLine(fromX, fromY, toX, toY, 50)}
      {sourceIsRole && roleConnectionLine(fromX, fromY, toX, toY, 40)}
      {sourceIsSkill && skillConnectionLine(fromX, fromY, toX, toY, 25)}
    </>
  )
};
