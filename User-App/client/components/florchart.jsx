// //import { parseQueues, parseExchanges, parseBindings } from ''
// import React, { useCallback, useEffect, useMemo } from 'react';
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from 'reactflow';
// import 'reactflow/dist/style.css';

// import BindingEdge from './NodeTypes/BindingEdge';
// import ExchangeNode from './NodeTypes/ExchangeNode';
// import QueueNode from './NodeTypes/QueueNode';
// import ServiceNode from './NodeTypes/ServiceNode';
// import './NodeTypes/nodeStyles/application.scss'


// // const initialNodes = [
// // ];
// // const initialEdges = [

// // ];


// const FlowChart = ({ data }): JSX.Element => {
//   const nodeTypes = useMemo(() => ({ 
//     exchange: ExchangeNode, 
//     queue: QueueNode,
//     microservice: ServiceNode
//   }), []);
//   const edgeTypes = {
//    'binding': BindingEdge,
//   };

//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//   //fetch
//   //then
//   //forloop
//   //each queue make queue
//   //each exchange make exchange
//   //each binding connect exchange to queue
//   //each consumer is made service
//   //consumer tag bound to queue



//   useEffect(() => {

//     // //fetch

//     // const n = 4;
//     // const radius = 300;
//     // const microservices = [];

//     // for(let i = 1; i = n + 1; i++){
//     //   const deg = (360/n)*i
//     //   const xCoor = radius * Math.cos(deg);
//     //   const yCoor = radius * Math.sin(deg);

//     //   microservices.push({ id: `${i}`, type: 'microservice', position: { x: xCoor , y: yCoor }, data: { label: 'App' } })
//     // }

//     setNodes([
//       // ...microservices
//     //   { id: '1', type: 'microservice', position: { x: 0, y: 0 }, data: { label: 'App' } },
//       // { id: '2', type: 'microservice', position: { x: 0, y: 200 }, data: { label: 'Auth' } },
//       // { id: '3',  type: 'microservice', position: { x: 0, y: 400 }, data: { label: 'Inv' } },
//       // { id: '4',  type: 'microservice', position: { x: 0, y: 600 }, data: { label: 'Bill' } },
//       // { id: '1q', type: 'queue', position: { x: 200, y: -20 }, data: { label: 'AppQueue' } },
//       // { id: '2q', type: 'queue', position: { x: 200, y: 180 }, data: { label: 'AuthQueue' } },
//       // { id: '3q', type: 'queue', position: { x: 200, y: 380 }, data: { label: 'InvQueue' } },
//       // { id: '4q', type: 'queue', position: { x: 200, y: 580 }, data: { label: 'BillQueue' } },
//       // { id: 'ex', type: 'exchange', position: { x: 700, y: 300 }, data: { label: 'Exchange' } },
//       // { id: '1', type: 'microservice', position: { x: 0, y: 0 }, data: { label: 'App' } },
//       // { id: '1q', type: 'queue', position: { x: 10, y: 100 }, data: { label: 'AppQueue' } },
//       // { id: '2', type: 'microservice', position: { x: 200, y: 0 }, data: { label: 'Auth' } },
//       // { id: '2q', type: 'queue', position: { x: 210, y: 100 }, data: { label: 'AuthQueue' } },
//       // { id: '3',  type: 'microservice', position: { x: 400, y: 0 }, data: { label: 'Inv' } },
//       // { id: '3q', type: 'queue', position: { x: 410, y: 100 }, data: { label: 'InvQueue' } },
//       // { id: '4',  type: 'microservice', position: { x: 600, y: 0 }, data: { label: 'Bill' } },
//       // { id: '4q', type: 'queue', position: { x: 610, y: 100 }, data: { label: 'BillQueue' } },
//       // { id: 'ex', type: 'exchange', position: { x: 325, y: 800 }, data: { label: 'Exchange' } },
//     ])

//     setEdges([
//       // { id: '1->ex', type: 'binding', source: '1', target: 'ex' },
//       // { id: '2->ex', type: 'binding', source: '2', target: 'ex' },
//       // { id: '3->ex', type: 'binding', source: '3', target: 'ex' },
//       // { id: '4->ex', type: 'binding', source: '4', target: 'ex' },
//       // { id: '1q->1', type: 'binding', target: '1', source: '1q' }, 
//       // { id: 'ex->1q', type: 'binding', target: '1q', source: 'ex' },
//       // { id: '2q->2', type: 'binding', target: '2', source: '2q' },
//       // { id: 'ex->2q', type: 'binding', target: '2q', source: 'ex' },
//       // { id: '3q->3', type: 'binding', target: '3', source: '3q' }, 
//       // { id: 'ex->3q', type: 'binding', target: '3q', source: 'ex' },
//       // { id: '4q->4', type: 'binding', target: '4', source: '4q' },
//       // { id: 'ex->4q', type: 'binding', target: '4q', source: 'ex' },
//     ])

//   }, [])

 
//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges],
//   );


 
//   return (
//     <div id='chart'>
//       <div id='flow-chart'>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           nodeTypes={nodeTypes}
//           edgeTypes={edgeTypes}
//           fitView
//         >
//           <Controls />
//           <MiniMap />
//           {/* <Background variant="dots" gap={12} size={1} /> */}
//         </ReactFlow>
//       </div>
//     </div>
//   );
// }

// export default FlowChart;