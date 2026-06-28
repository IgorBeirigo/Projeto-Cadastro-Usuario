import React from 'react';
import Card from './ui/Card';
import Badge from './ui/Badge';
import './Dashboard.css';

/**
 * Dashboard Moderno com KPIs, Gráficos e Resumo do Sistema
 */
const Dashboard = () => {
  // Mock data
  const stats = [
    {
      id: 'clientes',
      label: 'Clientes',
      value: 1234,
      change: '+12%',
      trend: 'up',
      icon: 'users',
      color: 'primary',
    },
    {
      id: 'produtos',
      label: 'Produtos',
      value: 567,
      change: '+8%',
      trend: 'up',
      icon: 'shopping-bag',
      color: 'secondary',
    },
    {
      id: 'entregas',
      label: 'Entregas',
      value: 789,
      change: '+15%',
      trend: 'up',
      icon: 'truck',
      color: 'success',
    },
    {
      id: 'funcionarios',
      label: 'Funcionários',
      value: 45,
      change: '+2%',
      trend: 'up',
      icon: 'user-tie',
      color: 'info',
    },
  ];

  const recentActivities = [
    { id: 1, type: 'success', title: 'Novo cliente cadastrado', description: 'João Silva', time: 'há 2 minutos' },
    { id: 2, type: 'info', title: 'Produto adicionado', description: 'Notebook Dell Inspiron', time: 'há 15 minutos' },
    { id: 3, type: 'warning', title: 'Entrega pendente', description: 'Pedido #2341 aguardando confirmação', time: 'há 1 hora' },
    { id: 4, type: 'success', title: 'Entrega concluída', description: 'Pedido #2340 entregue', time: 'há 2 horas' },
  ];

  const chartData = [
    { month: 'Jan', value: 400 },
    { month: 'Fev', value: 300 },
    { month: 'Mar', value: 500 },
    { month: 'Abr', value: 350 },
    { month: 'Mai', value: 600 },
    { month: 'Jun', value: 550 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Bem-vindo! Aqui está o resumo do seu sistema.</p>
        </div>
        <button className="dashboard-filter-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filtrar
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <Card key={stat.id} variant="elevated" hoverable className="stat-card">
            <div className="stat-content">
              <div className="stat-header">
                <div className={`stat-icon stat-icon-${stat.color}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {stat.icon === 'users' && (
                      <>
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </>
                    )}
                    {stat.icon === 'shopping-bag' && (
                      <>
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </>
                    )}
                    {stat.icon === 'truck' && (
                      <>
                        <rect x="1" y="6" width="22" height="12" rx="2"></rect>
                        <path d="M15 20v2m-8 0v2"></path>
                        <circle cx="5" cy="17" r="2"></circle>
                        <circle cx="21" cy="17" r="2"></circle>
                      </>
                    )}
                    {stat.icon === 'user-tie' && (
                      <>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </>
                    )}
                  </svg>
                </div>
                <Badge variant={stat.color} size="sm">
                  {stat.change}
                </Badge>
              </div>
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value.toLocaleString('pt-BR')}</h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Chart */}
        <Card variant="elevated" className="dashboard-card chart-card">
          <h3 className="card-title">Vendas por Mês</h3>
          <div className="simple-chart">
            {chartData.map((data) => (
              <div key={data.month} className="chart-column">
                <div
                  className="chart-bar"
                  style={{ height: `${(data.value / maxValue) * 100}%` }}
                  title={`${data.month}: ${data.value}`}
                ></div>
                <span className="chart-label">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="chart-info">
            <p>Total: <strong>2.710</strong> vendas</p>
            <p>Crescimento: <strong>+18%</strong> vs. mês anterior</p>
          </div>
        </Card>

        {/* Status Overview */}
        <Card variant="elevated" className="dashboard-card status-card">
          <h3 className="card-title">Status do Sistema</h3>
          <div className="status-list">
            <div className="status-item">
              <div className="status-indicator status-success"></div>
              <span className="status-label">API</span>
              <span className="status-value">Operacional</span>
            </div>
            <div className="status-item">
              <div className="status-indicator status-success"></div>
              <span className="status-label">Banco de Dados</span>
              <span className="status-value">Operacional</span>
            </div>
            <div className="status-item">
              <div className="status-indicator status-success"></div>
              <span className="status-label">Servidor</span>
              <span className="status-value">Operacional</span>
            </div>
            <div className="status-item">
              <div className="status-indicator status-warning"></div>
              <span className="status-label">Cache</span>
              <span className="status-value">Verificando...</span>
            </div>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card variant="elevated" className="dashboard-card activities-card">
          <h3 className="card-title">Atividades Recentes</h3>
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon activity-${activity.type}`}>
                  {activity.type === 'success' && '✓'}
                  {activity.type === 'warning' && '!'}
                  {activity.type === 'info' && 'ℹ'}
                </div>
                <div className="activity-content">
                  <p className="activity-title">{activity.title}</p>
                  <p className="activity-description">{activity.description}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card variant="elevated" className="dashboard-card actions-card">
          <h3 className="card-title">Ações Rápidas</h3>
          <div className="quick-actions">
            <button className="quick-action-button quick-action-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m-7-7h14"></path>
              </svg>
              Novo Cliente
            </button>
            <button className="quick-action-button quick-action-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m-7-7h14"></path>
              </svg>
              Novo Produto
            </button>
            <button className="quick-action-button quick-action-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m-7-7h14"></path>
              </svg>
              Nova Entrega
            </button>
            <button className="quick-action-button quick-action-info">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14m-7-7h14"></path>
              </svg>
              Novo Funcionário
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

