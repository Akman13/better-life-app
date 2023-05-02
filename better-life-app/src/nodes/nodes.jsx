const initialNodes = [

    {
        id: '1',
        type: 'user',
        data: {
            label: <h1>Me</h1>,
            width: 300,
            height: 300,
            handleColours: {
                top: 'rgb(66, 66, 255)',
                right: 'green',
                bottom: 'rgb(255, 110, 110)',
                left: 'rgb(255, 228, 73)'
            }
        },
        position: { x: 0, y: 0 },
    },
    // {
    //     id: '2',
    //     type: 'output',
    //     data: { label: 'Input Node' },
    //     position: { x: 250, y: 25 },
    // },
    // {
    //     id: '4',
    //     type: 'role',
    //     data: {
    //         label: 'New Role',
    //         width: 150,
    //         height: 150
    //     },
    //     position: { x: 250, y: 250 },
    // },
    // {
    //     id: '4',
    //     // you can also pass a React component as a label
    //     data: { label: <div>Default Node</div> },
    //     position: { x: 100, y: 125 },
    // },

];

export default initialNodes