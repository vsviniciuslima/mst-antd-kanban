import { types } from 'mobx-state-tree'

import Task from './Task.js'

function slugify (x) {
  return encodeURIComponent(x.toLowerCase().replace(/\s+/gim, '-'))
}

const TaskStore = types
  .model({
    tasks: types.array(Task)
  })
  .views(self => ({
    getFilteredTasks (filter) {
      switch (filter) {
        case ('Em execução / Aguardando execução') :
          return self.tasks.filter(task => task.status === 'Aguardando execução' || task.status === 'Em execução')
        case 'Em breve':
          return self.tasks.filter(task => task.status === 'Em breve')
        case 'Finalizadas':
          return self.tasks.filter(task => task.status === 'Finalizada')
/*         default:
          return self.tasks.filter(task => task.status === 'Aguardando execução' || task.status === 'Em execução') */
      }
    },
    generateFiltersFromDataSet (key) {
      const notFilteredEntriesArray = []

      self.tasks.forEach(task => { notFilteredEntriesArray.push(task[key]) })
      const filteredEntriesArray = [...new Set(notFilteredEntriesArray)]

      const uniqueEntries = []

      filteredEntriesArray.forEach(entry => {
        uniqueEntries.push({ text: entry, value: entry })
      })

      return uniqueEntries
    }
  }))
  .actions(self => ({
    addTask (Task) {
      self.tasks.push(Task)
    }
  }))

export default TaskStore
