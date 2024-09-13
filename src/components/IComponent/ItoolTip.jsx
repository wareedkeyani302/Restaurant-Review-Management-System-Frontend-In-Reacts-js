import { Tooltip } from 'antd'
import React from 'react'

const ItoolTip = ({ title, placement, color, children }) => {
  return (
    <div>
      <Tooltip
        title={title}
        placement={placement}
        color={color}
      >
        {children}
      </Tooltip>
    </div>
  )
}

export default ItoolTip;