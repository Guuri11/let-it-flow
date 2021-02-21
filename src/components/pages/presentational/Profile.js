import React, { useState } from 'react'
import { Tab, Tabs, TabItem, TabItems, Dialog, Caption, Body2, Button, Card, CardContent, 
  CardHeader, H4, H5, TextField, TextArea, IconButton } from 'ui-neumorphism'
import Icon from '@mdi/react';
import { mdiPlus, mdiMicrophone, mdiMicrophoneOff } from "@mdi/js"
import {
  motion,
} from "framer-motion"
import Header from '../../partials/container/Header';
import Note from '../../partials/container/Note';

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

export default function Profile(props) {

    const { error, handleChangeNoteDescription, handleChangeNoteName, handleDelete, handleFav, handleNewNote, handleSearch,is_listening, loading,
			name, note, notes, openDelete, openNew, openNote, setIsListening, setVisible, setVisibleDelete, showNote, SpeechRecognition,
			visible, visibleDelete, voice_supported		
	} = props

  	const [active, setActive] = useState(0)

  	// delay to display notes
  	let delay = 0

	const tabs = () => {
		return (
		<TabItems value={active}>

			{/* All notes */}
			<TabItem>
				<div className="row m-0">
				{
					notes.map( (note,idx) =>{
						delay += 0.2
						return <Note key={idx} idx={idx} openNote={openNote} delay={delay} note={note} openDelete={openDelete} handleFav={handleFav} />
					})
				}
				</div>
			</TabItem>

			{/* Favorite notes */}
			<TabItem>
				<div className="row m-0">
				{
					notes.map( (note,idx) =>{
						delay += 0.2
						
						if (note.favorite) 
							return <Note key={idx} idx={idx} openNote={openNote} delay={delay} note={note} openDelete={openDelete} handleFav={handleFav} />
					})
				}
				</div>
			</TabItem>

		</TabItems>
		
		)
	}

	return (
	<>
		<motion.div
		initial="initial"
		animate="in"
		exit="out"
		variants={pageVariants}
		transition={pageTransition}
		className="container"
		>
		<Header/>

		<div className="p-2">
			<div className="row">
			<div className="col-sm-12 col-md-6">
				<H4 >{name}</H4>
			</div>
			<div className="col-sm-12 offset-md-2 col-md-4">
				<TextField label="Search..." onChange={handleSearch} className="float-right float-none-xs w-100" inputStyles={{width: "100%"}} />
			</div>
			</div>
			{
			error.error_delete ?
			<motion.div
			animate={{ scale: [0,1.2,1] }}
			transition={{ duration: 1 }}
			>
				<H5 className="text-danger text-center">Couldn't delete the note! Try later</H5>
			</motion.div>
			:
			null
			}
			
			<div className="row mt-2">
			<div className="col-sm-12 col-md-6">
			<Tabs value={active} onChange={({active})=>setActive(active)} >
				<Tab>All</Tab>
				<Tab>Favorites</Tab>
			</Tabs>
			</div>
			<div className="col-sm-12 col-md-6 d-none d-md-block">
				<Button rounded className="pt-0 float-right" size='large' onClick={openNew}>
				<Icon path={mdiPlus} size={1}/> Add note
				</Button>
				{
				voice_supported ?
					is_listening ?
					<Button rounded className="pt-0 float-right mr-2" size='large' onClick={()=>{setIsListening(!is_listening);SpeechRecognition.stopListening()}}>
					<Icon path={mdiMicrophone} size={1}/> Voice
					</Button>
					:
					<Button rounded className="pt-0 float-right mr-2" size='large' onClick={()=>{setIsListening(!is_listening);SpeechRecognition.startListening({ language: 'es-ES' })}}>
					<Icon path={mdiMicrophoneOff} size={1}/> Voice
					</Button>
					:
					null
				}
				
				
			</div>
			</div>
			{
			loading ?
			null
			:
			<>
			{tabs()}
			</>
			}



		</div>
		<Dialog
			minWidth={300}
			visible={visible}
			onClose={()=> setVisible(false)}
		>
			<Card className="p-md-4">
				<CardHeader 
					title={<H5 className="text-center">{ Object.keys(note).length > 0 ? "Edit note":"New note" }</H5>}
				/>
				<CardContent className="mt-4">
					<form onSubmit={handleNewNote}>
					{
					error.error_new ?
					<motion.div
					animate={{ scale: [0,1.2,1] }}
					transition={{ duration: 1 }}
					>
					<Caption className="text-danger">Couldn't create the note! Try later</Caption>
					</motion.div>
					:
					error.error_update ?
					<motion.div
					animate={{ scale: [0,1.2,1] }}
					transition={{ duration: 1 }}
					>
					<Caption className="text-danger">Couldn't edit the note! Try later</Caption>
					</motion.div>
					:
					null
				}
					<Body2 className="mb-2">Name</Body2>
					<TextField 
					type="text"
					className="m-0 w-100"
					onChange={handleChangeNoteName}
					inputStyles={{ width: "100%" }}
					value={note.name}
					/>
					<Body2 className="mb-2">Description</Body2>
					<TextArea style={{width: "100%"}} className="w-100" inputStyles={{width: "100%", maxHeight: 450}} height={150} autoExpand label='Description'
					onChange={handleChangeNoteDescription}
					value={note.description}
					/>
					<Button className="w-100 mb-4w-100 mb-4" onClick={handleNewNote}>Save</Button>
					</form>
				</CardContent>
			</Card>
		</Dialog>

		<Dialog
			minWidth={300}
			visible={visibleDelete}
			onClose={()=> setVisibleDelete(false)}
		>
			<Card className="p-xs-2 p-md-4">
			<CardHeader 
				title={<H5 className="text-center">Are you sure about delete "{ note.name }"?</H5>}
			/>
			<CardContent className="mt-4 d-flex justify-content-center py-2">
				<Button className="m-2" rounded onClick={()=> setVisibleDelete(false)}>Cancel</Button>
				<Button className="m-2" rounded onClick={()=> {handleDelete(note.id); setVisibleDelete(false)}} color='var(--white)' bgColor='var(--error)' >
					Delete
				</Button>
			</CardContent>
			</Card>
		</Dialog>

		</motion.div>

		<motion.div className="d-md-none add-new-mobile"
		whileHover={{ scale: 1.1 }}
		whileTap={{ scale: 0.9 }}
		>
		<IconButton rounded text={false} size="large" onClick={openNew} color='var(--white)' bgColor='var(--success)'>
			<Icon path={mdiPlus} size={1} />
		</IconButton>
		</motion.div>

		<motion.div className="d-md-none voice-mobile"
		whileHover={{ scale: 1.1 }}
		whileTap={{ scale: 0.9 }}
		>
		{
		voice_supported ?
			is_listening ?
			<IconButton rounded text={false} size="large" onClick={()=>{setIsListening(!is_listening);SpeechRecognition.stopListening()}}>
			<Icon path={mdiMicrophone} size={1} />
			</IconButton>
			:
			<IconButton rounded text={false} size="large" onClick={()=>{setIsListening(!is_listening);SpeechRecognition.startListening({ language: 'es-ES' })}}>
			<Icon path={mdiMicrophoneOff} size={1} />
			</IconButton>
			:
			null
		}
		</motion.div>
	</>
	)
}