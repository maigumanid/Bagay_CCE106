export type TaskStatus = 'Pending' | 'Completed';

export type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: TaskStatus;
  description: string;
};

export const tasks: Task[] = [
  {
    id: '1',
    title: 'React Native Activity',
    subject: 'Mobile Development',
    dueDate: 'September 18, 2026',
    status: 'Pending',
    description: 'Complete the React Native navigation activity.',
  },
  {
    id: '2',
    title: 'Subnetting Exercises',
    subject: 'Networking 2',
    dueDate: 'September 19, 2026',
    status: 'Pending',
    description: 'Complete the assigned subnetting and VLSM exercises.',
  },
  {
    id: '3',
    title: 'System Analysis Diagram',
    subject: 'Systems Analysis',
    dueDate: 'September 15, 2026',
    status: 'Completed',
    description: 'Finalize the required system analysis diagrams.',
  },
  {
    id: '4',
    title: 'Physics Problem Set',
    subject: 'Physics',
    dueDate: 'September 20, 2026',
    status: 'Pending',
    description: 'Answer the assigned work, energy, and power problems.',
  },
  {
    id: '5',
    title: 'Database Review',
    subject: 'Database Systems',
    dueDate: 'September 13, 2026',
    status: 'Completed',
    description: 'Review SQL queries and database normalization.',
  },
  {
    id: '6',
    title: 'Capstone Documentation',
    subject: 'Capstone Project',
    dueDate: 'September 22, 2026',
    status: 'Pending',
    description: 'Update the latest capstone project documentation.',
  },
];