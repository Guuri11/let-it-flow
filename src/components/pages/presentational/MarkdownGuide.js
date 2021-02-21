import React from 'react'
import { motion } from 'framer-motion';
import Header from '../../partials/container/Header';
import ReactMarkdown from 'react-markdown';
import { Body2, Card, Divider, H3, H5 } from 'ui-neumorphism';
import { Link } from 'react-router-dom';

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


export default function MarkdownGuide(props) {
    return (
        <motion.div
        initial="initial"
		animate="in"
		exit="out"
		variants={pageVariants}
		transition={pageTransition}
		className="container h-100"
        >
            <Header goBack={true}/>
            <H3 className="mb-2">Markdown Guide (in development...)</H3>
            <Body2> Is a lightweight markup language for creating formatted text using a plain-text editor. John Gruber and Aaron Swartz created Markdown in 2004 as a markup language that is appealing to human readers in its source code form. 
                Markdown is widely used in blogging, instant messaging, online forums, collaborative software, documentation pages, and readme files.</Body2>
            {/** HEADERS **/}
            <H5 className="mt-2">Headers</H5>
            <Divider dense={true}/>
            <div className="row mt-3">
                <div className="col-md-6">
                    <Card bordered className="p-3"> 
                    # H1 <br/>
                    ## H2 <br/>
                    ### H3 <br/>
                    #### H4 <br/>
                    ##### H5 <br/>
                    ###### H6 <br/>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card bordered className="p-3">
                        <ReactMarkdown>
                        {`# H1
## H2
### H3
#### H4
##### H5
###### H6
`}
                        </ReactMarkdown>
                    </Card>
                </div>
            </div>
            {/** HEADERS **/}

            {/** EMPHASIS **/}
            <H5 className="mt-2">Emphasis</H5>
            <Divider dense={true}/>
            <div className="row mt-3">
                <div className="col-md-6">
                    <Card bordered className="p-3"> 
                    Emphasis, aka italics, with *asterisks* or _underscores_.<br/>
                    Strong emphasis, aka bold, with **asterisks** or __underscores__.<br/>
                    Combined emphasis with **asterisks and _underscores_**.<br/>
                    Strikethrough uses two tildes. ~~Scratch this.~~<br/>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card bordered className="p-3">
                        <ReactMarkdown>
                        {`Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~`}
                        </ReactMarkdown>
                    </Card>
                </div>
            </div>
            {/** EMPHASIS **/}

            {/** LISTS **/}
            <H5 className="mt-2">Lists</H5>
            <Divider dense={true}/>
            <div className="row mt-3">
                <div className="col-md-6">
                    <Card bordered className="p-3"> 
                    - Item 1<br/>
                    - Item 2<br/>                    
                    - Item 3<br/>
                    - Item 4<br/>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card bordered className="p-3">
                        <ReactMarkdown>
                        {`- Item 1
- Item 2
- Item 3
- Item 4`}
                        </ReactMarkdown>
                    </Card>
                </div>
            </div>
            {/** LISTS **/}


        </motion.div>
    )
}
