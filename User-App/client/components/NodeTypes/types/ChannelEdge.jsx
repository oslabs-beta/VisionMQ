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

export default function ChannelEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition,
  targetPosition,
  markerEnd,
  data, running}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
  targetPosition
  });
  //nodrag nopan for className that doesnt move on click

  const intensity = 102;

  // const [intensity, setIntensity] = useState(200)

  // const changer = () => setTimeout(() => {
  //   setIntensity(Math.floor(Math.random() * 245) + 10);
  // }, 200)

  // changer();

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={
        {
            stroke: `rgba(255, ${intensity}, 0, 0.5)`, strokeWidth: "2"
          }}/>
      <EdgeLabelRenderer>
        <div 
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            // pointerEvents: 'all',
          }}
          className="binding-label"
        //   onClick={() => {
        //     setEdges((es) => es.filter((e) => e.id !== id));
        //   }}
        >
        </div>
      </EdgeLabelRenderer>
    </>
  );
}