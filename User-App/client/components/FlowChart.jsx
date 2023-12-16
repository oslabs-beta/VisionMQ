import React, { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import Service from './NodeTypes/nodeContents/ServiceContent';

import BindingEdge from './NodeTypes/types/BindingEdge';
import ExchangeNode from './NodeTypes/types/ExchangeNode';
import QueueNode from './NodeTypes/types/QueueNode';
import ServiceNode from './NodeTypes/types/ServiceNode';
import './NodeTypes/nodeStyles/application.scss'

const initialNodes = [];
const initialEdges = [];

const FlowChart = () => {
  const nodeTypes = useMemo(() => ({ 
    exchange: ExchangeNode, 
    queue: QueueNode,
    microservice: ServiceNode
  }), []);
  const edgeTypes = {
   'binding': BindingEdge,
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  //fetch then forloop
  //each queue make queue, each exchange make exchange, each binding connect exchange to queue
  //each consumer is made service
  //consumer tag bound to queue

 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
    );
    

  const getNodes = () => {
    // console.log('hello')
    const exchange = { id: 'ex', type: 'exchange', position: { x: 0, y: 0 }, data: { label: 'Exchange' } }
    const microservices = [];
    const queues = [];
    const bindings = [];

    const n = 50;
    const radius = 400;

    for(let i = 1; i < n + 1; i++){
      // console.log(i)
      const deg = (((2*Math.PI)/n)*i) - Math.PI/2
      const xCoor = Math.floor(radius * Math.cos(deg)*1.2);
      const yCoor = Math.floor(radius * Math.sin(deg)*1.2);

      microservices.push({ id: `${i}`, type: 'microservice', position: { x: xCoor , y: yCoor }, data: { label: <Service /> } })
      queues.push({ id: `${i}q`, type: 'queue', position: { x: xCoor*.8 , y: yCoor*.8 }, data: { label: 'AppQueue' } })
    
      bindings.push({ id: `${i}q->${i}`, type: 'binding', markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#FF0072',
    }, target: `${i}`, source: `${i}q` })
      bindings.push({ id: `ex->${i}q`, type: 'binding', markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#FF0072',
    }, target: `${i}q`, source: `ex` })
    }





    setNodes([...microservices, ...queues, exchange ])
    setEdges([...bindings])

  }


 
  return (
    <div id='chart'>
      <div id='flow-chart'>
        <button onClick={getNodes}>Load</button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Controls />
          {/* <MiniMap /> */}
          {/* <Background variant="dots" gap={12} size={1} /> */}
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowChart;