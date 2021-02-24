import { types, flow } from 'mobx-state-tree'

import Task from './Task.js'

function slugify (x) {
  return encodeURIComponent(x.toLowerCase().replace(/\s+/gim, '-'))
}

/* function (pagination, filters, sorter, extra:
  {​​ currentDataSource: [], action: paginate | sort | filter }
​​)
*/

const TaskStore = types
  .model({
    tasks: types.array(Task)
  })
  .views(self => ({
    getFilteredTasks (filter) {
      const filters = {
        EXECUTING: self.tasks.filter(task => task.status === 'Aguardando execução' || task.status === 'Em execução'),
        SOON: self.tasks.filter(task => task.status === 'Em breve'),
        COMPLETED: self.tasks.filter(task => task.status === 'Finalizada')
      }
      return filters[filter]
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
