export const colaboradorPerfil = {
  nome: 'Joao Henrique Silva',
  cargo: 'Analista de Logistica Senior',
  departamento: 'Operacoes e Distribuicao',
  email: 'joao.silva@idislogistica.com.br',
  telefone: '(11) 98765-4321',
  dataAdmissao: '15/01/2020',
  matricula: 'IDIS-2048',
  cpf: '123.***.***-09',
  status: 'Ativo',
  avatarUrl: '',
  ultimoAcesso: 'Hoje, 08:42',
  tempoEmpresa: '6 anos e 5 meses'
}

export const perfilAcoes = [
  { id: 'editar', label: 'Editar Perfil', variant: 'primary', action: 'message' },
  { id: 'senha', label: 'Alterar Senha', variant: 'secondary', action: 'message' },
  { id: 'holerites', label: 'Ver Holerites', variant: 'outline', path: '/portal-colaborador/holerites' },
  { id: 'ponto', label: 'Folha de Ponto', variant: 'outline', path: '/portal-colaborador/ponto' },
  { id: 'bater-ponto', label: 'Bater Ponto', variant: 'outline', path: '/portal-colaborador/bater-ponto' }
]
