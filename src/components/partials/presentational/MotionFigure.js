import React from 'react'
import {
    motion
  } from "framer-motion"
import { Caption } from 'ui-neumorphism';

export default function MotionFigure(props) {

  const { color, crossPathA, crossPathB, handleOption, id, tickPath, x } = props

  return (
        <div className="d-md-none">
        <Caption className="mt-2 text-center">Delete/Edit</Caption>
        <motion.div
        style={{x}}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        id={"option"+id}
        onPointerLeave={ ()=> handleOption() }
        >
          <svg className="progress-icon d-md-none" viewBox="0 0 50 50" >
              <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M14,26 L 22,33 L 35,16"
              strokeDasharray="0 1"
              style={{ pathLength: tickPath }}
              />
              <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M17,17 L33,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathA }}
              />
              <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M33,17 L17,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathB }}
              />
          </svg>
        </motion.div>
        </div>
    )
}
