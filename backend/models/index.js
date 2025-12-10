const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// Use a instância já configurada em /database/db.js
const sequelize = require('../database/db');

const db = {};

// Carrega todos os modelos. Suporta modelos que exportam
// a função (sequelize, DataTypes) ou o próprio Model já definido.
fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.js') && file !== 'index.js' && file !== 'dbConnect.js')
    .forEach(file => {
        const modelPath = path.join(__dirname, file);
            const modelImport = require(modelPath);

            // Caso 1: modelo exportado como função-fábrica (sequelize, DataTypes)
            if (typeof modelImport === 'function' && modelImport.length >= 2) {
                const model = modelImport(sequelize, Sequelize.DataTypes);
                if (model && model.name) db[model.name] = model;
                return;
            }

            // Caso 2: modelo já definido via sequelize.define e exportado (subclasse de Model)
            // instanceof pode falhar across multiple sequelize instances, fall back to checking .name
            try {
                const ModelClass = modelImport;
                if (
                    typeof ModelClass === 'function' &&
                    ModelClass.prototype &&
                    (ModelClass.prototype instanceof Sequelize.Model || ModelClass.name)
                ) {
                    // Modelo já definido (usa a instância em database/db.js internamente)
                    db[ModelClass.name] = ModelClass;
                    return;
                }
            } catch (e) {
                // ignore and try the next check
            }

            // Caso 3: exportou um objeto com propriedade 'name' (definição pronta)
            if (modelImport && modelImport.name) {
                db[modelImport.name] = modelImport;
            }
    });

// Configura associações
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
