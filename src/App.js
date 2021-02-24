import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Input,
  Table,
  Space,
  Collapse
} from 'antd'

import TaskStore from './models/TaskStore'
import Task from './models/Task'

import {
  UserOutlined,
  LockOutlined,
  SearchOutlined,
  PlusOutlined,
  RobotOutlined,
  CheckOutlined
} from '@ant-design/icons'

import {
  TagConfidencialidade,
  TagNaoConcluido,
  TagTrabalhista,
  TagConcluido,
  TagBancaria
} from '../src/components/Tags'

const { Panel } = Collapse
const { Header, Content, Footer } = Layout
const { Title, Text } = Typography

const store = TaskStore.create()

const tarefa = Task.create({
  key: '1',
  tarefa: 'Colaborar na construção',
  documento: 'Acordo de Confidencialidade',
  status: 'Aguardando execução',
  responsavel: 'Angelo Caldeira',
  dataDeCriacao: '16/07/2020',
  dataPrevistaDeConclusao: '-',
  tags: ['Confidencialidade', 'Bancária']
})
const tarefa2 = Task.create({
  key: '2',
  tarefa: 'Concluir construção',
  documento: 'Contestação Revisional Ban...',
  status: 'Aguardando execução',
  responsavel: 'Fabio Nagao',
  dataDeCriacao: '16/07/2020',
  dataPrevistaDeConclusao: '-',
  tags: ['Trabalhista', 'Não concluído']
})
const tarefa3 = Task.create({
  key: '3',
  tarefa: 'Concluir construção',
  documento: 'Contestação Revisional Ban...',
  status: 'Em execução',
  responsavel: 'Laís Gerólamo',
  dataDeCriacao: '16/07/2020',
  dataPrevistaDeConclusao: '-',
  tags: ['Bancária', 'Concluído']
})
const tarefa4 = Task.create({
  key: '4',
  tarefa: 'Concluir construção',
  documento: 'Contestação Revisional Ban...',
  status: 'Em breve',
  responsavel: 'Laís Gerólamo',
  dataDeCriacao: '16/07/2020',
  dataPrevistaDeConclusao: '-',
  tags: ['Bancária', 'Concluído']
})
const tarefa5 = Task.create({
  key: '5',
  tarefa: 'Concluir construção',
  documento: 'Contestação Revisional Ban...',
  status: 'Finalizada',
  responsavel: 'Robô Looplex',
  dataDeCriacao: '16/07/2020',
  dataPrevistaDeConclusao: '-',
  tags: ['Bancária', 'Concluído']
})
const tarefa6 = Task.create({
  key: '6',
  tarefa: 'Concluir construção',
  documento: 'Contestação Revisional Ban...',
  status: 'Aguardando execução',
  responsavel: 'Robô Looplex',
  dataDeCriacao: '16/07/2020',
  dataPrevistaDeConclusao: '-',
  tags: ['Bancária', 'Concluído']
})

store.addTask(tarefa)
store.addTask(tarefa2)
store.addTask(tarefa3)
store.addTask(tarefa4)
store.addTask(tarefa5)
store.addTask(tarefa6)

function App () {
  function renderTags (tags) {
    return (
      <>
        {tags.map(tag => {
          const tags = {
            Confidencialidade: <TagConfidencialidade />,
            'Não concluído': <TagNaoConcluido />,
            Trabalhista: <TagTrabalhista />,
            Concluído: <TagConcluido />,
            Bancária: <TagBancaria />
          }
          return tags[tag]
        })}
      </>
    )
  }

  function renderResponsible (responsavel) {
    return (
      <> {responsavel === 'Robô Looplex'
        ? <><RobotOutlined /> {responsavel} </>
        : <> <UserOutlined /> {responsavel} </>}
      </>
    )
  }

  function renderStatus (status) {
    const states = {
      'Em execução': <> <LockOutlined /> {status} </>,
      Finalizada: <> <CheckOutlined /> {status} </>,
      'Aguardando execução': <> {status} </>,
      'Em breve': <> {status} </>
    }
    return states[status]
  }

  const columns = [
    {
      title: <b>Tarefa</b>,
      dataIndex: 'tarefa',
      key: 'tarefa',
      sorter: (a, b) => a.tarefa.length - b.tarefa.length,
      render: text => (
        <p>{text}</p>
      )
    },
    {
      title: <b>Documento</b>,
      dataIndex: 'documento',
      key: 'documento',
      filters: store.generateFiltersFromDataSet('documento'),
      sorter: (a, b) => a.documento.length - b.documento.length,
      render: documento => (
        <span>
          <a>{documento}</a>
        </span>
      )
    },
    {
      title: <b>Status da tarefa</b>,
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.length - b.status.length,
      render: status => renderStatus(status)
    },
    {
      title: <b>Responsável</b>,
      dataIndex: 'responsavel',
      key: 'responsavel',
      sorter: (a, b) => a.responsavel.length - b.responsavel.length,
      filters: store.generateFiltersFromDataSet('responsavel'),
      filterMultiple: false,
      onFilter: (value, record) => record.responsavel.indexOf(value) === 0,
      /*       render: responsavel => (
        <Space size='middle'>
          <UserOutlined />
          {responsavel}
        </Space>
      ) */
      render: responsavel => renderResponsible(responsavel)
    },
    {
      title: <b>Criada em</b>,
      dataIndex: 'dataDeCriacao',
      key: 'dataDeCriacao',
      sorter: (a, b) => a.dataDeCriacao.length - b.dataDeCriacao.length
    },
    {
      title: <b>Prevista para</b>,
      dataIndex: 'dataPrevistaDeConclusao',
      key: 'dataPrevistaDeConclusao',
      sorter: (a, b) => a.dataPrevistaDeConclusao.length - b.dataPrevistaDeConclusao.length
    },
    {
      title: <b>Tags</b>,
      key: 'tags',
      dataIndex: 'tags',
      render: tags => renderTags(tags)
    },
    {
      title: <b>Opções</b>,
      key: 'opcoes',
      render: text => (
        <Space size='middle'>
          <a>Finalizar</a>
        </Space>
      )
    }
  ]

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ backgroundColor: 'transparent', color: 'black', textAlign: 'left' }}>
        <Title level={2}>Tarefas</Title>
      </Header>
      <Content>
        <Row justify='center'>
          <Col span={24}>

            <Row gutter={16} justify='space-around'>
              <Col span={19}>
                <Input placeholder='Buscar tarefas' suffix={<SearchOutlined />} />
              </Col>
              <Col span={4}>
                <Button type='primary' icon={<PlusOutlined />}>
                  Solicitar criação de documento
                </Button>
              </Col>
            </Row>

            <Collapse defaultActiveKey={['1']} ghost accordion>
              <Panel header='Em execução e aguardando execução' key='1'>
                <Table
                  columns={columns}
                  dataSource={store.getFilteredTasks('EXECUTING')}
                  pagination={false}
                />
              </Panel>
              <Panel header='Em breve' key='2'>
                <Table
                  columns={columns}
                  dataSource={store.getFilteredTasks('SOON')}
                  pagination={false}
                />
              </Panel>
              <Panel header='Finalizadas' key='3'>
                <Table
                  columns={columns}
                  dataSource={store.getFilteredTasks('COMPLETED')}
                  pagination={false}
                />
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}><Text type='secondary'>Made with ❤️ by Looplex Front Team</Text></Footer>
    </Layout>
  )
}

export default App
