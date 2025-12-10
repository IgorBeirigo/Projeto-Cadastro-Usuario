import React from 'react';

export default function Main(props) {
  return (
    <div className="main">
      <header className="header d-none d-sm-flex flex-column">
        <h1 className="mt-3">
          <i className={`fa fa-${props.icon}`}></i> {props.title}
        </h1>
        <p className="lead text-muted">{props.subtitle}</p>
      </header>
      <main className="content container-fluid">
        <div className="p-3 mt-3">
          {props.children}
        </div>
      </main>
    </div>
  );
}
