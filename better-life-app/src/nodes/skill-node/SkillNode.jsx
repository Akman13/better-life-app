import { useCallback, useEffect, useRef, useState } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import './SkillNode.css'
import AddHandle from '../../components/AddHandle/AddHandle';
import RemoveHandle from '../../components/RemoveHandle/RemoveHandle';

function handleStyle(data, handleNum) {
    // Source handle#2: near right of the base source handle
    const rightAdjacentBorders = {
        top: ['right', 'top'],
        left: ['top', 'left'],
        bottom: ['left', 'bottom'],
        right: ['bottom', 'right']
    }

    // Source handle#3: near left of the base source handle
    const leftAdjacentBorders = {
        top: ['left', 'top'],
        left: ['bottom', 'left'],
        bottom: ['right', 'bottom'],
        right: ['top', 'right']
    }

    // Future additions:
    // handle#4: far right of the base source handle
    // handle#5: far left of the base source handle

    const baseSourceHandlePosition = data['parentNodeHandleLocation'];
    const style = {}

    if (handleNum === 2) {
        const directionPair = rightAdjacentBorders[baseSourceHandlePosition]
        style[[directionPair[0]]] = '12%';
        style[[directionPair[1]]] = '12%';

    } else if (handleNum === 3) {
        const directionPair = leftAdjacentBorders[baseSourceHandlePosition]
        style[[directionPair[0]]] = '12%';
        style[[directionPair[1]]] = '12%';
    }

    return style
}

export default function SkillNode({ id, data, isConnectable }) {
    const [handlesCount, setHandlesCount] = useState(1)
    // const [handleOne, handleTwo, handleThree, handleFour] = [useRef(false), useRef(false), useRef(false), useRef(false)]

    const updateNodeInternals = useUpdateNodeInternals();

    useEffect(() => {
        updateNodeInternals(id)

    }, [handlesCount])


    const handleAdd = () => {

        if (handlesCount < 4) {

            if (handlesCount === null) {
                handleOne.current = true;

            } else if (handlesCount === 1) {
                handleTwo.current = true;

            } else if (handlesCount === 2) {
                handleThree.current = true;

            } else if (handlesCount === 3) {
                handleFour.current = true;

            }
            setHandlesCount(handlesCount + 1)
        }
    }

    const handleRemove = () => {

        if (handlesCount > 1) {

            if (handlesCount === 1) {
                handleOne.current = false;

            } else if (handlesCount === 2) {
                handleTwo.current = false;

            } else if (handlesCount === 3) {
                handleThree.current = false;

            } else if (handlesCount === 4) {
                handleFour.current = false;

            }
            setHandlesCount(handlesCount - 1)
        }
    }

    const nodeStyle = {
        border: `2px solid ${data.parentNodeHandleColour}`
    }

    const handleOppositeMap = {
        Top: 'Bottom',
        Right: 'Left',
        Bottom: 'Top',
        Left: 'Right'
    }

    const parentNodeHandleLocation = data['parentNodeHandleLocation'].at(0).toUpperCase() + data['parentNodeHandleLocation'].slice(1);

    const baseTargetHandlePosition = handleOppositeMap[parentNodeHandleLocation];


    return (
        <div className="skill-node" style={nodeStyle}>

            {/* <AddHandle onClick={handleAdd} /> */}
            {/* <RemoveHandle onClick={handleRemove} /> */}

            <Handle
                id='a'
                type="target"
                position={Position[baseTargetHandlePosition]}
                isConnectable={isConnectable}
            />

            <Handle
                id='b'
                type="source"
                position={Position[parentNodeHandleLocation]}
                isConnectable={isConnectable}
            />

            <Handle
                id='c'
                type="source"
                position={Position[parentNodeHandleLocation.at(0).toUpperCase() + parentNodeHandleLocation.slice(1)]}
                isConnectable={isConnectable}
                style={handleStyle(data, 2)}
            />

            <Handle
                id='d'
                type="source"
                position={Position[parentNodeHandleLocation.at(0).toUpperCase() + parentNodeHandleLocation.slice(1)]}
                isConnectable={isConnectable}
                style={handleStyle(data, 3)}
            />

            {/* {handleThree.current && <Handle
                id="c"
                type="source"
                position={Position.Left}
                isConnectable={isConnectable}
            />}

            {handleFour.current && <Handle
                id="d"
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
            />} */}

            <div>{data.label}</div>
        </div>
    );
}