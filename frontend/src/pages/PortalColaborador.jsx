import React from 'react'
import Main from '../components/template/Main'
import ActionCard from '../components/ui/ActionCard'
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
                            Aqui você poderá acessar seus registros, contracheques e tomar decisões com
                            uma experiência simples e moderna.
                        </p>
                    </div>
                </section>

                <section className="cards-grid">
                    <ActionCard
                        icon="file-text"
                        title="Holerites"
                        description="Consulte e faça o download dos seus holerites."
                        path="/portal-colaborador/holerites"
                        accent="accent-pay"
                    />
                    <ActionCard
                        icon="calendar-check-o"
                        title="Folha de Ponto"
                        description="Consulte seus registros de jornada."
                        path="/portal-colaborador/ponto"
                        accent="accent-timesheet"
                    />
                    <ActionCard
                        icon="clock-o"
                        title="Registrar Ponto"
                        description="Registre sua entrada e saída de trabalho."
                        path="/portal-colaborador/bater-ponto"
                        accent="accent-clock"
                    />
                </section>
            </div>
        </Main>
    )
}
