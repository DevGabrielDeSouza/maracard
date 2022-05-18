import React from 'react';
import ReactDOM from 'react-dom';

import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

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
		if(error){
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

	if(data == null){
		data = initialData;
	}else{
		data = JSON.parse(data);
	}

	console.log("data: " + data);
	return data;
}

class App extends React.Component {
	//state = initialData;
	state = getInitialData();

	onDragStart = () =>{
		/*document.body.style.color='orange';
		document.body.style.transition='background-color 0.2s ease';*/
	}

	onDragEnd = result => {
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

		const column = this.state.columns[source.droppableId];
		const newTaskIds = Array.from(column.taskIds);
		newTaskIds.splice(source.index, 1);
		newTaskIds.splice(destination.index, 0, draggableId);

		const newColumn = {
			...column,
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
	};

	render() {
		return (
			<DragDropContext
				onDragStart={this.onDragStart}
				onDragUpdate={this.onDragUpdate}
				onDragEnd={this.onDragEnd}
			>
				
				{this.state.columnOrder.map(columnId => {
					const column = this.state.columns[columnId];
					const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

					//return column.title;
					return <Column key={column.id} column={column} tasks={tasks} />;
				})}
			</DragDropContext>

		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));