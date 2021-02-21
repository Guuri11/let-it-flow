import { mdiPencil, mdiStarOutline, mdiTrashCanOutline, mdiStar } from '@mdi/js'
import Icon from '@mdi/react'
import { motion } from 'framer-motion'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { Card, CardAction, CardHeader, IconButton } from 'ui-neumorphism'
import MotionFigure from '../container/MotionFigure'

export default function Note(props) {

    const { openNote, note, openDelete, idx, delay, handleFav } = props

    return (
        <motion.div
        animate={{ scale: [0, 1.2, 1] }}X
        transition={{ duration: 0.5, delay: delay }}
        className="col-sm-12 col-md-6 col-lg-3"
        >
            <motion.div
            whileHover={{ scale: 1.05 }}
            key={idx}
            >
            <div>
                <Card style={{margin: 5}}>
                <CardHeader
                    title={<div className="d-flex justify-content-between" >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            >
                                <Link to={`/note/${note.id}`} style={{ color: "var(--g-text-color-light)", textDecoration: "none" }} >
                                    <ReactMarkdown className="w-100">{note.name}</ReactMarkdown>
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon onClick={() => handleFav(note)} className="float-right pointer" path={note.favorite ? mdiStar : mdiStarOutline} size={1} />
                            </motion.div>
                    </div>}
                />
                
                <CardAction className="d-none d-md-flex justify-content-center">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <IconButton rounded bgColor='var(--error)' className="m-2" text={false} onClick={()=> openDelete(note)}>
                            <Icon path={mdiTrashCanOutline} color='var(--white)' size={1}></Icon>
                        </IconButton>       
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <IconButton rounded bgColor='var(--success)' className="m-2" text={false} onClick={ ()=> openNote(note) }>
                            <Icon path={mdiPencil} color='var(--white)' size={1}></Icon>
                        </IconButton>
                    </motion.div>
                </CardAction>
                <MotionFigure openNote={openNote} note={note} openDelete={openDelete} id={idx} />
                </Card>
            </div>
            </motion.div>
        </motion.div>
        
    )
}
