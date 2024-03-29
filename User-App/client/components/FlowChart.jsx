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


const FlowChart = ({refresh, refreshed, running}) => {
  const nodeTypes = useMemo(() => ({ 
    exchange: ExchangeNode, 
    queue: QueueNode,
    microservice: ServiceNode
  }), []);
  const edgeTypes = {
   'binding': BindingEdge,
   'channel': ChannelEdge
  };


  const [loaded, setLoaded] = useState(false);
  const [num, setNum] = useState(5)
  const [focus, setFocus] = useState('all')
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  
  const isolate = (name) => {
    console.log(name)
    focus === 'all' ? setFocus(name) : setFocus('all') 
  }
  
  

  let data;
  const queueCache = {}
  let services;

  
  
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
    );
    
    
    //fetch then forloop
    //each queue make queue, each exchange make exchange, each binding connect exchange to queue
    //each consumer is made service
    //consumer tag bound to queue
    useEffect( () => {
      
      const username = 'guest';
      const password = 'guest';
      const url = 'http://localhost:15672/api/definitions';

      const base64Credentials = btoa(`${username}:${password}`);

      const fetcher = () => {

        fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
          },
        })
        .then(res => res.json())
        .then(res => {
          // console.log('THIS IS THE RESPONSE FROM MANAGEMENT API', res);
          data = res;
          
          const queues = [];
          const microservices = [];
          const exchanges = [];
          const bindings = [];
          
          const bindingCount = {}
          
          data.bindings.forEach((el, i) => {
            // console.log(el.destination, focus, el.destination == focus)
            if(focus === 'all' || el.destination == focus){
              // console.log('inside')
              bindingCount[el.destination] = bindingCount[el.destination] ? bindingCount[el.destination] + 1 : 1
              const myId = `${el.source}:${el.routing_key}:${el.destination}` //exchange:binding:queue
              // console.log(myId, bindingCount[el.destination])
              bindings.push({ id: myId, type: 'binding', markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#FF6600',
              }, target: `${el.destination}`, targetHandle: `${bindingCount[el.destination]}`, source: `${el.source}`, data:{name: `${el.routing_key}`, offset: bindingCount[el.destination] }, running: running })
            }
          })
          
          const n = data.queues.length;
          const radius = 400;
          //First, we parse the queues and create nodes for each, paired and binded to a 'Service' consumer (for our demo only, usually we wouldn't know the name of consumer just its channel)
          data.queues.forEach((el, i) => {
            const deg = (((2*Math.PI)/n)*i) - Math.PI/2
            const xCoor = Math.floor(radius * Math.cos(deg)*1.2);
            const yCoor = Math.floor(radius * Math.sin(deg)*1.2);
            
            if(focus === 'all' || el.name == focus){
              queues.push({ id: `${el.name}`,  type: 'queue', position: { x: xCoor*.7 , y: yCoor*.7 }, data: { name: `${el.name}`, offset: bindingCount[el.name], isolate: isolate }})
            microservices.push({ id: `${i}`, type: 'microservice', position: { x: xCoor+(30) , y: yCoor }, data: { name: `${el.name.slice(0, -5)}`}})
            
            bindings.push({ id: `${el.name}->${i}`, type: 'channel', markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#FF6600',
            }, target: `${i}`, source: `${el.name}`, running: running })
          }
          })
            
            //for now this is only a single exchange, will have to congifure position
            //for additional exchanges so that they don't overlap and then that ex's
            //respective services will have a circle with a different center
          data.exchanges.forEach((ex) => {
            exchanges.push({ id: `${ex.name}`, type: 'exchange', position: { x: -15, y: -50 }, data: { name: `${ex.name}`, refresh: refresh }  })
          })
  
            setNodes([...microservices, ...queues, ...exchanges ])
            setEdges([...bindings])
          })
      }

      fetcher()
      // const intervalId = setInterval( () => {
      //   console.log('calling')
      //   fetcher()
      // }, 2000)
      // console.log(intervalId)
    
      // return ( () => {

      //   console.log('clean up')
      //   clearTimeout(intervalId)
      // }
      // )
      }, [focus, refreshed])
   

  const changeNum = () => {
    const newNum = document.querySelector('#num-changer')
    const newName = document.querySelector('#service')
    if(newName.value) {
      const newNames = namesExample
      console.log(newName)
      setNames([...namesExample, newName.value])
      setNum(num + 1)
      return;
    }
    if(newNum.value) setNum(newNum.value)
  }

 
  return (
    <div id='chart'>
        {/* <input id='num-changer'placeholder='Node Count'></input>
        <input id='service' placeholder='Service Name'></input>
        <button onClick={changeNum}>Load</button> */}
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
          <MiniMap zoomable={true} pannable={true} nodeColor={'#ff6600'}/>
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default FlowChart;