import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	border: 1px solid lightgrey;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: ${props => (props.isDragDisabled ? 'lightgrey' : props.isDragging ? 'lightgreen' : 'white')};
	display: flex;
`

const Handle = styled.div`
	width:20px;
	height:20px;
	background-color:orange;
	border-radius:4px;
	margin-right:8px;
 `

export default class Task extends React.Component {
	render() {
		//Disable movement of the first task
		//const isDragDisabled = this.props.task.id === 'task-1';
		return (
			<Draggable 
				draggableId= {this.props.task.id} 
				index={this.props.index}
				//Need to disable movement of the first task
				//isDragDisabled={isDragDisabled}
			>
				{(provided, snapshot) => (
					<Container
						{...provided.draggableProps}
						//remove this line to to only allow grabbing from handle
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						isDragging={snapshot.isDragging}
						//Need to disable movement of the first task
						//isDragDisabled={isDragDisabled}
					>
						{/*<Handle {...provided.dragHandleProps} />*/}
						{this.props.task.content}
					</Container>
				)}
			</Draggable>
		);
	}
}