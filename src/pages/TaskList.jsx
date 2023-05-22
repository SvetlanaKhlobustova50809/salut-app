import React from 'react';
import {EvolveForm} from '../components/EvolveForm';
import {TaskItemList} from '../components/TaskItemList';


export const TaskList = (props) => {
  const { items, onAdd, onDone } = props;
  return (
    <main className="container">
      <EvolveForm
        onAdd = { onAdd }
      />
      <TaskItemList
        items  = { items }
        onDone = { onDone }
      />
    </main>
  )
}
