import React from 'react'
import {
    useMotionValue,
    useTransform,
  } from "framer-motion"

import MotionFigurePresentational from "../presentational/MotionFigure"

export default function MotionFigure(props) {

    const { note, openNote, openDelete, id } = props

    const x = useMotionValue(0);
    const xInput = [-1, 0, 1];
    const color = useTransform(x, xInput, [
        "rgb(211, 9, 225)",
        "rgb(68, 0, 255)",
        "rgb(3, 209, 0)"
    ]);
    const tickPath = useTransform(x, [10, 100], [0, 4]);
    const crossPathA = useTransform(x, [-10, -100], [0, 10]);
    const crossPathB = useTransform(x, [-50, -100], [0, 10]);

    const handleOption = () => {
        if (document.getElementById('option'+id).style.transform.split(/\w+\(|\);?/)[1]) {
        let value = document.getElementById('option'+id).style.transform.split(/\w+\(|\);?/)[1].split(/,\s?/g)[0]
        value = parseInt(value.substring(0, value.length - 2));
        if (value > 0 && value >= 35) {
            openNote(note)
        } else if (value < 0 && value <= -35) {
            openDelete(note)
        }
        }
    } 

    return (
        <MotionFigurePresentational 
        color={color}
        crossPathA={crossPathA} crossPathB={crossPathB}
        handleOption={handleOption} id={id} 
        tickPath={tickPath} x={x} />
    )
}
