import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getStraightPath,
  useReactFlow,
} from 'reactflow';

export default function BindingEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  //nodrag nopan for className that doesnt move on click

  const bindingName = 'binding'


  return (
    <>
      <BaseEdge id={id} path={edgePath} />
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
          {bindingName}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}