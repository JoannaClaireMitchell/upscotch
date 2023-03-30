export interface NewTask {
  listId: number;
  name: string;
  description: string;
}

export interface Task extends NewTask {
  id: number;
  order: number;
}

export interface TaskList {
  [listId: number]: Task[];
}

export interface List {
  description: string;
  listId: number;
  name: string;
  order: number;
}

export interface State {
  lists: List[];
  tasks: {[key: string]: Task};
}

export interface DataContext extends State {
  listData: TaskList;
  addTask: (task: NewTask) => void;
  updateTask: (task: Task) => void;
  removeTask: (taskId: number) => void;
  updateTaskParent: (taskId: number, listId: number) => void;
  addList: () => void;
  updateListHeading: (list: List) => void;
  removeList: (listId: number) => void;
}

export interface UpdateListArgs {
  taskId: number;
  listId: number;
}

export type Action =
  | {type: "ADD_LIST"}
  | {type: "UPDATE_LIST_HEADING"; payload: List}
  | {type: "REMOVE_LIST"; payload: number}
  | {type: "ADD_TASK"; payload: NewTask}
  | {type: "UPDATE_TASK"; payload: Task}
  | {type: "REMOVE_TASK"; payload: number}
  | {type: "UPDATE_TASK_PARENT"; payload: UpdateListArgs};
