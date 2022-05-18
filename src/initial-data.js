const initialData= {
	tasks: {
		'task1': {id: 'task-1', content: 'Take out the garbage'},
		'task2': {id: 'task-2', content: 'Watch my favorite show'},
		'task3': {id: 'task-3', content: 'Charge my phone'},
		'task4': {id: 'task-4', content: 'Cook dinner'},
		'task5': {id: 'task-5', content: 'Read a book'},
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'To do',
			taskIds: ['task1', 'task2', 'task3', 'task4', 'task5']
		},
	},
	
	columnOrder: ['column-1']
};

export default initialData;