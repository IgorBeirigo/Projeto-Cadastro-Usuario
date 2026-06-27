import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ActionCard.css'

export default function ActionCard({ icon, title, description, path, accent }) {
  const navigate = useNavigate()

  return (
    <article className={`action-card ${accent || ''}`}>
      <div className="action-card-top">
        <div className="action-card-icon">
          <i className={`fa fa-${icon}`} aria-hidden="true"></i>
        </div>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="action-card-actions">
        <button type="button" onClick={() => navigate(path)}>
          Acessar
        </button>
      </div>
    </article>
  )
}
