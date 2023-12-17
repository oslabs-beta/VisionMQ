import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import ChannelEdge from './NodeTypes/types/ChannelEdge';
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
   'channel': ChannelEdge
  };


  const [num, setNum] = useState(5)
  const [namesExample, setNames] = useState(['App', 'Inv', 'Auth', 'Bill', 'Notif'])
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
    

  useEffect(() => {
    // console.log('hello')
    const exchange = { id: 'ex', type: 'exchange', position: { x: 0, y: 0 }, data: { label: 'Exchange' } }
    const microservices = [];
    const queues = [];
    const bindings = [];

    const n = num;
    const radius = 400;


    for(let i = 0; i < n; i++){
      // console.log(i)
      const deg = (((2*Math.PI)/n)*i) - Math.PI/2
      const xCoor = Math.floor(radius * Math.cos(deg)*1.2);
      const yCoor = Math.floor(radius * Math.sin(deg)*1.2);

      microservices.push({ id: `${i}`, type: 'microservice', position: { x: xCoor , y: yCoor }, data: { name: `${namesExample[i]}`}})
      queues.push({ id: `${i}q`, type: 'queue', position: { x: xCoor*.8 , y: yCoor*.8 }, data: { name: `${namesExample[i]}Queue` } })
    
      bindings.push({ id: `${i}->ex`, type: 'channel', markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#FF0072',
    }, target: `ex`, source: `${i}` })
      bindings.push({ id: `${i}q->${i}`, type: 'channel', markerEnd: {
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

  }, [num, namesExample])

  const changeNum = () => {
    const newNum = document.querySelector('#num-changer')
    const newName = document.querySelector('#service')
    if(newName.value) {
      const newNames = namesExample
      console.log(newName)
      setNames([...namesExample, newName.value])
      setNum(num + 1)
    }
    if(newNum.value) setNum(newNum.value)
  }

 
  return (
    <div id='chart'>
        <input id='num-changer'placeholder='Node Count'></input>
        <input id='service' placeholder='Service Name'></input>
        <button onClick={changeNum}>Load</button>
      <div id='flow-chart'>
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