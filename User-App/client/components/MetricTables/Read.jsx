import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
      
function ReadGraph() {

const [operations, setOperations] = useState(0);
const [targetOperations, setTargetOperations] = useState(0);
const [animationValue, setAnimationValue] = useState(0);
const [animationCompleted, setAnimationCompleted] = useState(false);
      
        //Needle startup
useEffect(() => {
  
  let value = 0;
  const increment = 1;
  const animationDuration = 9000; 
  const animationInterval = 4;
  const maxValue = 172;
  let forward, reverse;
      
  
  const animateForward = () => {
    forward = setInterval(() => {
    value += increment;
        if(value >= maxValue) {
        clearInterval(forward);
        animateReverse();
        }
        
        setAnimationValue(value);
            }, animationInterval);
          };
        
          const animateReverse = () => {
            reverse = setInterval(() => {
              value -= increment;
              if (value <= 0) {
                clearInterval(reverse);
                setAnimationCompleted(true);
              }
              setAnimationValue(value)
            }, animationInterval)
          };
        
          animateForward();
        
          return () => {
            clearInterval(forwardIntervalId)
            clearInterval(reverseIntervalId)
          };
        }, []);

        //Needle mover
        useEffect(() => {
          const intervalId = setInterval(() => {
            setOperations((prevOperations) => {
              if (prevOperations < targetOperations) {
                return Math.min(prevOperations + 1, targetOperations)
              } else if (prevOperations > targetOperations) {
                return Math.max(prevOperations - 1, targetOperations)
              } else {
                return prevOperations
              }
            })
          }, .2)
          return () => clearInterval(intervalId)
        }, [targetOperations])
      
        //Fetches data
        useEffect(() => {
          if (animationCompleted) {
            const fetcher = async () => {
              let read = await fetch('http://localhost:9090/api/v1/query?query=rabbitmq_io_read_ops_total')
              const read_object = await read.json()
              const read_result = read_object.data.result[0].value[1]
              setTargetOperations(read_result)
            };
      
            const intervalId = setInterval(fetcher, 1000)
            return () => clearInterval(intervalId)
          }
}, [animationCompleted]);

const RADIAN = Math.PI / 180;
const data = [
  { name: 'A', value: 100, color: '#42B405' },
  { name: 'B', value: 45, color: '#F58A07' },
  { name: 'C', value: 25, color: '#F50707' },
];
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;
const value = operations;
const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;
  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
  };

  return (
    <PieChart width={400} height={500}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {animationCompleted ? needle(operations, data, cx, cy, iR, oR, '#264653') : needle(animationValue, data, cx, cy, iR, oR, '#264653')}
  
      {/* Display the value of the needle below the pie chart */}
      <text x={cx} y={cy + oR + 20} fill="#000" textAnchor="middle" dominantBaseline="central">
        {value}
      </text>
      <text x={cx} y={cy + oR + 5} fill="#000" textAnchor="middle" dominantBaseline="central">
          Read Operations
          </text>
    </PieChart>
  );

}
  

export default ReadGraph