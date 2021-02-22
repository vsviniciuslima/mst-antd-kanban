import { types } from 'mobx-state-tree'

const Task = types
// descreva o que a gente considera um TODO
  .model({
    key: types.identifier,
    tarefa: '',
    documento: '',
    status: '',
    responsavel: '',
    dataDeCriacao: '',
    dataPrevistaDeConclusao: '',
    tags: types.array(types.string)
  })
  .views(self => ({
    getResponsavel () {
      return self.responsavel
    }
  }))
  .actions(self => ({
    finalizar () {
      self.status = 'finalizado'
    }
  }))

export default Task
