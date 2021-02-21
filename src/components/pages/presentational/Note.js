import { mdiContentSaveEdit, mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import { motion } from 'framer-motion';
import React from 'react'
import ReactMarkdown from 'react-markdown';
import { H4, IconButton, TextArea } from 'ui-neumorphism';
import Header from '../../partials/container/Header';


const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
      scale: 0.8
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      x: "100vw",
      scale: 1.2
    }
  };
  
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

export default function Note(props) {

    const { note } = props

    return (
        <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
		className="container"
        >
            <Header goBack={true}/>
            {
                note !== undefined ?
                <div className="p-4">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-6">
                                    <H4>{note.name}</H4>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 mt-3">
                            <div>
                                <ReactMarkdown>{note.description}</ReactMarkdown>
                            </div>
                        </div>
                        
                    </div>
                </div>
                :
                null
            }
        
        </motion.div>
    )
}
