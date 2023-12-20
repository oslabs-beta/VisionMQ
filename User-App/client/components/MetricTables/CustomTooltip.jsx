import React, { useState } from 'react'

function CustomToolTip({ payload, label, active }) {
  if (active) {
    // console.log(payload, label)
    return (
      <div className="custom-tooltip">
          <h4 className="label">{`time: ${label}`}</h4>
        {payload.map((el) => {
            return <p><span>{`${el.name}:`}</span><span>{`${el.payload[el.name]}`}</span></p>
        })}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
}


export default CustomToolTip