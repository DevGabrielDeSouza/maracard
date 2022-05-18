import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
	display:flex;
`

//import App from './App';

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
*/

//const App = ()=>'Hello world';


const saveData = (data, filePath) => {

	const finished = (error) => {
		if (error) {
			console.log(error);
			return;
		}
	}

	const jsonData = JSON.stringify(data, null, 2);
	//fs.writeFile(filePath, jsonData, finished);
	localStorage.setItem("testBoard", jsonData);
}

const getInitialData = () => {
	//return initialData;

	let data = localStorage.getItem("testBoard");

	if (data == null) {
		data = initialData;
	} else {
		data = JSON.parse(data);
	}

	console.log("data: " + data);
	return data;
}

class App extends React.Component {
	state = initialData;
	//state = getInitialData();

	onDragStart = start => {
		//DragStart color logic
		/*document.body.style.color='orange';
		document.body.style.transition='background-color 0.2s ease';*/
		
		const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
		this.setState({
			homeIndex,
		});
	}



	onDragEnd = result => {
		this.setState({
			homeIndex: null,
		});


		document.body.style.color = 'inherit';
		document.body.style.backgroundColor = 'inherit';

		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const start = this.state.columns[source.droppableId];
		const finish = this.state.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				taskIds: newTaskIds,
			};

			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newColumn.id]: newColumn,
				},
			};

			saveData(newState, './initial-data');

			this.setState(newState);
			return;
		}

		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds,
		};

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};
		this.setState(newState);
	};

	render() {
		return (
			<DragDropContext
				onDragStart={this.onDragStart}
				onDragUpdate={this.onDragUpdate}
				onDragEnd={this.onDragEnd}
			>
				<Container>
					{this.state.columnOrder.map((columnId, index) => {
						const column = this.state.columns[columnId];
						const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

						const isDropDisabled = index < this.state.homeIndex;

						//return column.title;
						return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} />;
					})}
				</Container>
			</DragDropContext>

		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));