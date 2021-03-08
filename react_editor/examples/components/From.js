import React, {useState} from 'react';

import JoditEditor from "../../src";
import regeneratorRuntime from "regenerator-runtime";

require("regenerator-runtime/runtime");

const APP_API = process.env.APP_API || "http://127.0.0.1:5000/api/v1/" ;

const From = ({ document,  handleOffisEdit }) => {
	const [config, setConfig] = useState({
		readonly: false,
		toolbar: true,
	})
	
	const [textAreaValue, setTextAreaValue] = useState(document.content)

	const [inputValue, setInputValue] = useState('')

	const [spin, setSpin] = useState(1)

	const toggleToolbar = () => (
		setConfig(config => ({
			...config,
			toolbar: !config.toolbar,
		}))
	)

	const toggleReadOnly = () => (
		setConfig(config => ({
			...config,
			readonly: !config.readonly,
		}))
	)

	const handleBlurAreaChange = () => {
		console.log('Blur')
	};

	const handleTextAreaChange = newTextAreaValue => {
		document.content=newTextAreaValue
		return (

			setTextAreaValue(() => newTextAreaValue)
			

		)
	}

	const handleInputChange = e => {
		const {value} = e.target
		handleTextAreaChange(value)
	}
	const  perfom_fetch  = async (method, endpoint, body) =>{
		try {
		  const response = await fetch(`${APP_API}${endpoint}`, {
			method,
			body: body && JSON.stringify(body),
			headers: {
			  'content-type': 'application/json',
			  accept: 'application/json',
			},
		  });
		  return  response.json();
		} catch (error) {
		  console.error(error);
	  
		  this.setState({ error });
		}
	}
	const saveDocuments =  async () =>{
		await perfom_fetch('patch', `documents/${document._id}/`, {"content": document.content});
		
	}
	
	const handleSpin = () => setSpin(spin => ++spin)
	return (
		<div>
		<div >
			<button  onClick={handleOffisEdit}>Back</button>
		</div>
		<button  onClick={(textAreaValue) => saveDocuments()}>
				{'Save'}
		</button>
		<div>
			<JoditEditor
				config={config}
				onChange={handleTextAreaChange}
				onBlur={handleBlurAreaChange}
				value={textAreaValue}/>
			<input
				onChange={handleInputChange}
				placeholder={"enter some text"}
				type={"text"}
				value={inputValue}/>
			<button
				onClick={toggleReadOnly}
				type={"button"}>
				{'Toggle Read-Only'}
			</button>
			<button
				onClick={toggleToolbar}
				type={"button"}>
				{'Toggle Toolbar'}
			</button>
			<button
				type={"button"}
				onClick={handleSpin}>
				{`Spin ${spin}`}
			</button>

		</div>
		</div>
	)
}

export default From
