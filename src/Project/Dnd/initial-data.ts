export type Columns = keyof typeof initialData.columns
export type Tasks = keyof typeof initialData.tasks

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'watch my favorite show' },
    'task-3': { id: 'task-3', content: 'charge my phone' },
    'task-4': {id: 'task-4', content: 'cook dinner'}
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'to do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'] as const
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3'] as const
}

export default initialData

