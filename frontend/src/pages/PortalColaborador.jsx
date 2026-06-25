import React from 'react'
import Main from '../components/template/Main'
import './PortalColaborador.css'

export default function PortalColaborador() {
    return (
        <Main
            icon="briefcase"
            title="Portal do Colaborador"
            subtitle="Acesse rapidamente os recursos e informações da empresa."
        >
            <div className="portal-page">
                <section className="portal-hero">
                    <div>
                        <h2>Bem-vindo ao Portal do Colaborador</h2>
                        <p>
                            Aqui você poderá acessar comunicados, documentos, solicitações,
                            treinamentos e outras ferramentas internas da empresa.
                        </p>
                    </div>
                </section>

                <section className="cards-grid">
                    <article className="portal-card">
                        <div className="card-top">
                            <div className="card-icon hr-icon">
                                <i className="fa fa-user-friends"></i>
                            </div>
                            <div>
                                <h3>Recursos Humanos</h3>
                                <p>Acesse informações relacionadas ao RH.</p>
                            </div>
                        </div>
                        <div className="card-actions">
                            <button type="button">Acessar</button>
                        </div>
                    </article>

                    <article className="portal-card">
                        <div className="card-top">
                            <div className="card-icon docs-icon">
                                <i className="fa fa-file-alt"></i>
                            </div>
                            <div>
                                <h3>Documentos</h3>
                                <p>Visualize documentos e arquivos internos.</p>
                            </div>
                        </div>
                        <div className="card-actions">
                            <button type="button">Acessar</button>
                        </div>
                    </article>

                    <article className="portal-card">
                        <div className="card-top">
                            <div className="card-icon news-icon">
                                <i className="fa fa-bullhorn"></i>
                            </div>
                            <div>
                                <h3>Comunicados</h3>
                                <p>Fique por dentro das novidades da empresa.</p>
                            </div>
                        </div>
                        <div className="card-actions">
                            <button type="button">Acessar</button>
                        </div>
                    </article>

                    <article className="portal-card">
                        <div className="card-top">
                            <div className="card-icon training-icon">
                                <i className="fa fa-chalkboard-teacher"></i>
                            </div>
                            <div>
                                <h3>Treinamentos</h3>
                                <p>Cursos e capacitações internas.</p>
                            </div>
                        </div>
                        <div className="card-actions">
                            <button type="button">Acessar</button>
                        </div>
                    </article>
                </section>
            </div>
        </Main>
    )
}
