import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import './PortalColaborador.css';

/**
 * Portal do Colaborador - Interface Corporativa Moderna
 */
const PortalColaborador = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const usuario = {
    nome: 'João Silva',
    cargo: 'Desenvolvedor Senior',
    departamento: 'Tecnologia',
    email: 'joao.silva@empresa.com',
    telefone: '(11) 98765-4321',
    dataAdmissao: '15 de Janeiro de 2020',
  };

  const folhaPonto = [
    { data: '25/06/2024', entrada: '09:00', saida: '18:00', horas: '9h' },
    { data: '24/06/2024', entrada: '08:45', saida: '18:15', horas: '9h 30m' },
    { data: '23/06/2024', entrada: '09:15', saida: '17:45', horas: '8h 30m' },
    { data: '22/06/2024', entrada: '09:00', saida: '18:00', horas: '9h' },
  ];

  const holerites = [
    { mes: 'Junho 2024', data: '30/06/2024', status: 'disponivel' },
    { mes: 'Maio 2024', data: '31/05/2024', status: 'disponivel' },
    { mes: 'Abril 2024', data: '30/04/2024', status: 'disponivel' },
    { mes: 'Março 2024', data: '31/03/2024', status: 'disponivel' },
  ];

  const beneficios = [
    { nome: 'Vale Refeição', status: 'ativo', valor: 'R$ 500,00' },
    { nome: 'Vale Transporte', status: 'ativo', valor: 'R$ 200,00' },
    { nome: 'Seguro Saúde', status: 'ativo', valor: 'Cobertura Completa' },
    { nome: 'Auxílio Educação', status: 'ativo', valor: 'R$ 150,00' },
  ];

  return (
    <div className="portal-colaborador">
      {/* Header */}
      <div className="portal-header">
        <div className="portal-user-info">
          <div className="portal-avatar">
            <span>JS</span>
          </div>
          <div>
            <h1 className="portal-user-name">{usuario.nome}</h1>
            <p className="portal-user-role">{usuario.cargo}</p>
            <p className="portal-user-department">{usuario.departamento}</p>
          </div>
        </div>
        <button className="portal-edit-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
          Editar Perfil
        </button>
      </div>

      {/* Quick Stats */}
      <div className="portal-stats">
        <Card variant="default" className="portal-stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Dias de Férias</div>
          <p className="stat-description">Disponíveis em 2024</p>
        </Card>
        <Card variant="default" className="portal-stat-card">
          <div className="stat-value">8h 45m</div>
          <div className="stat-label">Horário Hoje</div>
          <p className="stat-description">Até o momento</p>
        </Card>
        <Card variant="default" className="portal-stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Faltas</div>
          <p className="stat-description">Este mês</p>
        </Card>
        <Card variant="default" className="portal-stat-card">
          <div className="stat-value">+2</div>
          <div className="stat-label">Horas Extras</div>
          <p className="stat-description">Este mês</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="portal-tabs">
        <button
          className={`portal-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Visão Geral
        </button>
        <button
          className={`portal-tab ${activeTab === 'ponto' ? 'active' : ''}`}
          onClick={() => setActiveTab('ponto')}
        >
          Folha de Ponto
        </button>
        <button
          className={`portal-tab ${activeTab === 'holerites' ? 'active' : ''}`}
          onClick={() => setActiveTab('holerites')}
        >
          Holerites
        </button>
        <button
          className={`portal-tab ${activeTab === 'beneficios' ? 'active' : ''}`}
          onClick={() => setActiveTab('beneficios')}
        >
          Benefícios
        </button>
      </div>

      {/* Tab Content */}
      <div className="portal-content">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="portal-tab-content">
            <div className="portal-grid">
              <Card variant="elevated">
                <h3 className="portal-card-title">Informações Pessoais</h3>
                <div className="portal-info-list">
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{usuario.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Telefone</span>
                    <span className="info-value">{usuario.telefone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Data de Admissão</span>
                    <span className="info-value">{usuario.dataAdmissao}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Tempo na Empresa</span>
                    <span className="info-value">4 anos 5 meses</span>
                  </div>
                </div>
              </Card>

              <Card variant="elevated">
                <h3 className="portal-card-title">Ações Rápidas</h3>
                <div className="portal-quick-links">
                  <a href="#" className="quick-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"></path>
                      <rect x="5" y="2" width="14" height="4"></rect>
                      <path d="M9 9h1m4 0h1M9 13h1m4 0h1M9 17h1m4 0h1"></path>
                    </svg>
                    Solicitar Férias
                  </a>
                  <a href="#" className="quick-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"></path>
                      <line x1="9" y1="9" x2="9" y2="15"></line>
                      <line x1="12" y1="9" x2="12" y2="15"></line>
                      <line x1="15" y1="9" x2="15" y2="15"></line>
                    </svg>
                    Ponto Online
                  </a>
                  <a href="#" className="quick-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <line x1="9" y1="12" x2="15" y2="12"></line>
                    </svg>
                    Documentos
                  </a>
                  <a href="#" className="quick-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                      <line x1="12" y1="6" x2="12" y2="12"></line>
                      <line x1="12" y1="12" x2="16" y2="14"></line>
                    </svg>
                    Suporte
                  </a>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Folha de Ponto */}
        {activeTab === 'ponto' && (
          <div className="portal-tab-content">
            <Card variant="elevated">
              <h3 className="portal-card-title">Últimas Marcações</h3>
              <div className="portal-table">
                <div className="portal-table-header">
                  <div className="portal-table-cell">Data</div>
                  <div className="portal-table-cell">Entrada</div>
                  <div className="portal-table-cell">Saída</div>
                  <div className="portal-table-cell">Horas</div>
                </div>
                {folhaPonto.map((item, index) => (
                  <div key={index} className="portal-table-row">
                    <div className="portal-table-cell">{item.data}</div>
                    <div className="portal-table-cell">{item.entrada}</div>
                    <div className="portal-table-cell">{item.saida}</div>
                    <div className="portal-table-cell">
                      <Badge variant="success" size="sm">{item.horas}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Holerites */}
        {activeTab === 'holerites' && (
          <div className="portal-tab-content">
            <Card variant="elevated">
              <h3 className="portal-card-title">Holerites</h3>
              <div className="portal-list">
                {holerites.map((item, index) => (
                  <div key={index} className="portal-list-item">
                    <div>
                      <p className="portal-list-title">{item.mes}</p>
                      <p className="portal-list-description">Gerado em {item.data}</p>
                    </div>
                    <button className="portal-download-button">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Baixar
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Benefícios */}
        {activeTab === 'beneficios' && (
          <div className="portal-tab-content">
            <Card variant="elevated">
              <h3 className="portal-card-title">Benefícios Ativos</h3>
              <div className="portal-benefits">
                {beneficios.map((beneficio, index) => (
                  <div key={index} className="benefit-card">
                    <div className="benefit-header">
                      <h4 className="benefit-name">{beneficio.nome}</h4>
                      <Badge variant="success" size="sm">Ativo</Badge>
                    </div>
                    <p className="benefit-value">{beneficio.valor}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalColaborador;
