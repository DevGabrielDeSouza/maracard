import React from 'react';
import ReactDOM from 'react-dom';

import '@atlaskit/css-reset';
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

class App extends React.Component {
	state = initialData;

	render() {
		return this.state.columnOrder.map(columnId => {
			const column = this.state.columns[columnId];
			const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

			//return column.title;
			return <Column key={column.id} column={column} tasks={tasks} />;
		});
	}
}

ReactDOM.render(<App/>,document.getElementById('root'));