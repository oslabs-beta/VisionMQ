import React, { useState } from 'react'
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getStraightPath,
  getSmoothStepPath,
  useReactFlow,
} from 'reactflow';
// import styled from 'styled-components';

export default function BindingEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition,
  targetPosition,
  markerEnd,
 data, running }) {
  // console.log(data.name, data.offset)
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
  targetPosition
  });
  //nodrag nopan for className that doesnt move on click

  const bindingName = data?.name || 'binding'
  const intensity = 102;
  // const opacity = data.offset === 1 ? .5 : 0
  const opacity = .5

  // const [intensity, setIntensity] = useState(200)

  // const changer = () => setTimeout(() => {
  //   setIntensity(Math.floor(Math.random() * 245) + 10);
  // }, 200)

  // changer();

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={
        {
            stroke: `rgba(255, ${intensity}, 0, ${opacity})`, strokeWidth: "2"
            // stroke: `rgba(102, 200, 102, .5)`, strokeWidth: "2"
          }} />
      <EdgeLabelRenderer>
        <div 
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY + (10*(data.offset - 1))}px)`,
            // pointerEvents: 'all',
          }}
          className="binding-label"
          // onClick={() => {
          //   setEdges((es) => es.filter((e) => e.id !== id));
          // }}
        >
          {bindingName}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}