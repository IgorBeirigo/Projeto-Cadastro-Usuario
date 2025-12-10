// test-api.js - Script para testar os endpoints
// Execute: node test-api.js

const http = require('http');

const BASE_URL = 'http://localhost:3001';

async function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: body ? JSON.parse(body) : null
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: body
                    });
                }
            });
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function testAPIs() {
    console.log('🧪 Iniciando testes da API...\n');

    try {
        // Health Check
        console.log('1️⃣  Testando Health Check...');
        let res = await makeRequest('GET', '/health');
        console.log(`Status: ${res.status}`, res.data, '\n');

        // Criar Cliente
        console.log('2️⃣  Criando Cliente...');
        res = await makeRequest('POST', '/api/clientes', {
            nome: 'João Silva',
            email: `joao${Date.now()}@example.com`,
            telefone: '(11) 98765-4321',
            endereco: 'Rua Principal, 123'
        });
        console.log(`Status: ${res.status}`, res.data, '\n');
        const clienteId = res.data?.id;

        // Listar Clientes
        console.log('3️⃣  Listando Clientes...');
        res = await makeRequest('GET', '/api/clientes');
        console.log(`Status: ${res.status}, Total: ${res.data?.length || 0}\n`);

        if (clienteId) {
            // Buscar Cliente por ID
            console.log('4️⃣  Buscando Cliente por ID...');
            res = await makeRequest('GET', `/api/clientes/${clienteId}`);
            console.log(`Status: ${res.status}`, res.data?.nome, '\n');

            // Atualizar Cliente
            console.log('5️⃣  Atualizando Cliente...');
            res = await makeRequest('PUT', `/api/clientes/${clienteId}`, {
                nome: 'João Silva Atualizado',
                email: `joao${Date.now()}@example.com`,
                telefone: '(11) 99999-8888',
                endereco: 'Rua Secundária, 456'
            });
            console.log(`Status: ${res.status}`, res.data?.nome, '\n');
        }

        // Criar Produto
        console.log('6️⃣  Criando Produto...');
        res = await makeRequest('POST', '/api/produtos', {
            nome: 'Café Premium',
            tipo: 'Bebida',
            validade: '2025-12-31',
            descricao: 'Café arábica importado'
        });
        console.log(`Status: ${res.status}`, res.data?.nome, '\n');
        const produtoId = res.data?.id;

        // Listar Produtos
        console.log('7️⃣  Listando Produtos...');
        res = await makeRequest('GET', '/api/produtos');
        console.log(`Status: ${res.status}, Total: ${res.data?.length || 0}\n`);

        if (clienteId && produtoId) {
            // Criar Entrega
            console.log('8️⃣  Criando Entrega...');
            res = await makeRequest('POST', '/api/entregas', {
                protocolo: `ENT-${Date.now()}`,
                status: 'Pendente',
                clienteId: clienteId,
                produtoId: produtoId
            });
            console.log(`Status: ${res.status}`, res.data?.protocolo, '\n');
            const entregaId = res.data?.id;

            // Listar Entregas
            console.log('9️⃣  Listando Entregas...');
            res = await makeRequest('GET', '/api/entregas');
            console.log(`Status: ${res.status}, Total: ${res.data?.length || 0}\n`);

            if (entregaId) {
                // Atualizar Entrega
                console.log('🔟 Atualizando Entrega...');
                res = await makeRequest('PUT', `/api/entregas/${entregaId}`, {
                    status: 'Em Trânsito'
                });
                console.log(`Status: ${res.status}`, res.data?.status, '\n');

                // Deletar Entrega
                console.log('1️⃣1️⃣  Deletando Entrega...');
                res = await makeRequest('DELETE', `/api/entregas/${entregaId}`);
                console.log(`Status: ${res.status}\n`);
            }
        }

        console.log('✅ Testes concluídos com sucesso!');
    } catch (error) {
        console.error('❌ Erro durante os testes:', error.message);
    }
}

testAPIs();
