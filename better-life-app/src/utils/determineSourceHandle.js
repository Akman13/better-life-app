
export default function determineSourceHandle(cursorCoords, handleBounds) {
    
    const handleDistances = [];

    for (let handle of handleBounds) {
        const [handleId, handleX, handleY] = [handle.id, handle.x, handle.y]
        // console.log('handleId handleX handleY', handleId, handleX, handleY)

        const dx = handleX - cursorCoords.x;
        const dy = handleY - cursorCoords.y;

        const distanceToCursor = Math.sqrt(dx ** 2 + dy ** 2);
        handleDistances.push({ handleId, distanceToCursor })
    }

    const sourceHandle = handleDistances.reduce((cumulativeVal, currentVal) => {
        return (currentVal['distanceToCursor'] < cumulativeVal['distanceToCursor']) ? currentVal : cumulativeVal
    }).handleId

    return sourceHandle
}
