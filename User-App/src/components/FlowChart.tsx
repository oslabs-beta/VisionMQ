//import { parseQueues, parseExchanges, parseBindings } from ''
import React, { useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import BindingEdge from './NodeTypes/BindingEdge';
import ExchangeNode from './NodeTypes/ExchangeNode';
import './NodeTypes/nodeStyles/application.scss'
import QueueNode from './NodeTypes/QueueNode';


// const initialNodes = [
// ];
// const initialEdges = [

// ];


const FlowChart = ({ data }): JSX.Element => {
  const nodeTypes = useMemo(() => ({ 
    exchange: ExchangeNode, 
    queue: QueueNode
  }), []);
  const edgeTypes = {
   'binding': BindingEdge,
  };

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  //fetch
  //then
  //forloop
  //each queue make queue
  //each exchange make exchange
  //each binding connect exchange to queue
  //each consumer is made service
  //consumer tag bound to queue



  useEffect(() => {
    const setup = () => {
      /** 
       * parseQueues(data.queues), 
       * parseExchanges(data.exchanges), 
       * parseBindings(data.bindings)
       * 
      */
    }

    setNodes([
      { id: '1', position: { x: 0, y: 0 }, data: { label: 'App' } },
      { id: '1q', type: 'queue', position: { x: 50, y: 100 }, data: { label: 'AppQueue' } },
      { id: '2', position: { x: 200, y: 0 }, data: { label: 'Auth' } },
      { id: '2q', type: 'queue', position: { x: 250, y: 100 }, data: { label: 'AuthQueue' } },
      { id: '3', position: { x: 400, y: 0 }, data: { label: 'Inv' } },
      { id: '3q', type: 'queue', position: { x: 450, y: 100 }, data: { label: 'InvQueue' } },
      { id: '4', position: { x: 600, y: 0 }, data: { label: 'Bill' } },
      { id: '4q', type: 'queue', position: { x: 650, y: 100 }, data: { label: 'BillQueue' } },
      { id: 'ex', type: 'exchange', position: { x: 325, y: 200 }, data: { label: 'Exchange' } },
    ])

    setEdges([
      { id: '1->1q', type: 'binding', source: '1', target: '1q' }, 
      { id: '1q->ex', type: 'binding', source: '1q', target: 'ex' },
      { id: '2->2q', type: 'binding', source: '2', target: '2q' },
      { id: '2q->ex', type: 'binding', source: '2q', target: 'ex' },
      { id: '3->3q', type: 'binding', source: '3', target: '3q' }, 
      { id: '3q->ex', type: 'binding', source: '3q', target: 'ex' },
      { id: '4->4q', type: 'binding', source: '4', target: '4q' },
      { id: '4q->ex', type: 'binding', source: '4q', target: 'ex' },
    ])

  }, [])

 
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges],
  );


 
  return (
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
        <MiniMap />
        {/* <Background variant="dots" gap={12} size={1} /> */}
      </ReactFlow>
    </div>
  );
}

export default FlowChart;