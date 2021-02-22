import { types } from 'mobx-state-tree'

import Task from './Task'

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
    }
  }))
  .actions(self => ({
    addTask (Task) {
      self.tasks.push(Task)
    },
    getResponsaveis () {
      const responsaveis = []

      self.tasks.forEach(task => { responsaveis.push(task.responsavel) })
      responsaveis.forEach(responsavel => { console.log(responsavel) })

      return responsaveis
    }
  }))

export default TaskStore
