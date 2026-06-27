import React, { useEffect, useMemo, useState } from 'react'
import Main from '../components/template/Main'
import './BaterPonto.css'

const fieldLabels = {
  entrada: 'Registrar Entrada',
  saidaAlmoco: 'Registrar Saída para Almoço',
  retornoAlmoco: 'Registrar Retorno',
  saida: 'Registrar Saída'
}

function formatTime(date) {
  return date.toLocaleTimeString('pt-BR', { hour12: false })
}

function calculateHours(record) {
  const parse = time => {
    if (!time) return null
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const entrada = parse(record.entrada)
  const saida = parse(record.saida)
  if (!entrada || !saida) return null
  const total = saida - entrada
  if (total <= 0) return null
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  return `${hours}h${minutes.toString().padStart(2, '0')}`
}

export default function BaterPonto() {
  const [clock, setClock] = useState(new Date())
  const [record, setRecord] = useState({
    entrada: '',
    saidaAlmoco: '',
    retornoAlmoco: '',
    saida: ''
  })

  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const currentDate = clock.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  const status = useMemo(() => {
    if (!record.entrada) return 'Você ainda não registrou sua entrada hoje.'
    if (record.entrada && !record.saidaAlmoco) return 'Entrada registrada. Aguarde a saída para almoço.'
    if (record.saidaAlmoco && !record.retornoAlmoco) return 'Saída para almoço registrada. Aguarde o retorno.'
    if (record.retornoAlmoco && !record.saida) return 'Retorno registrado. Registre sua saída no fim do dia.'
    if (record.saida) return 'Ponto completo para hoje.'
    return 'Registro em andamento.'
  }, [record])

  const totalHours = calculateHours(record)

  function handleRegister(field) {
    setRecord(prev => {
      if (prev[field]) return prev
      return { ...prev, [field]: formatTime(clock) }
    })
  }

  return (
    <Main
      icon="stopwatch"
      title="Registrar Ponto"
      subtitle="Registre sua jornada de trabalho com um painel simples e rápido."
    >
      <section className="bater-page">
        <div className="bater-summary">
          <div>
            <span className="bater-label">Horário atual</span>
            <strong className="bater-clock">{formatTime(clock)}</strong>
          </div>
          <div>
            <span className="bater-label">Data</span>
            <p>{currentDate}</p>
          </div>
          <div>
            <span className="bater-label">Status</span>
            <p className="bater-status">{status}</p>
          </div>
        </div>

        <div className="bater-actions">
          {Object.entries(fieldLabels).map(([field, label]) => (
            <button
              key={field}
              type="button"
              className={record[field] ? 'recorded' : ''}
              onClick={() => handleRegister(field)}
              disabled={Boolean(record[field])}
            >
              {label}
              {record[field] && <span className="recorded-tag">{record[field]}</span>}
            </button>
          ))}
        </div>

        <div className="bater-history">
          <div className="history-head">
            <h2>Histórico de hoje</h2>
            <p>Veja os horários registrados e a jornada do dia.</p>
          </div>
          <div className="history-table">
            <div className="history-row header-row">
              <span>Hoje</span>
              <span>Entrada</span>
              <span>Saída almoço</span>
              <span>Retorno</span>
              <span>Saída</span>
              <span>Horas</span>
            </div>
            <div className="history-row body-row">
              <span>{currentDate}</span>
              <span>{record.entrada || '—'}</span>
              <span>{record.saidaAlmoco || '—'}</span>
              <span>{record.retornoAlmoco || '—'}</span>
              <span>{record.saida || '—'}</span>
              <span>{totalHours || '—'}</span>
            </div>
          </div>
        </div>
      </section>
    </Main>
  )
}
