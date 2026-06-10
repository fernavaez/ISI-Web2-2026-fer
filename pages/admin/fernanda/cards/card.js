// ==========================================
// CONFIGURACIÓN DE CONTEXTO Y JWT TOKEN
// ==========================================
const API_BASE_URL = 'https://localhost:7117/api'; 
const token = localStorage.getItem('token'); 

// Inyecta dinámicamente el Token JWT en el encabezado para pasar el atributo [Authorize]
function getHeaders(extraHeaders = {}) {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...extraHeaders
    };
}

// Renderiza las respuestas formateadas en el cuadro oscuro de la derecha
async function handleResponse(response) {
    const logger = document.getElementById('apiResponse');
    
    let resultData = {
        status: `${response.status} ${response.statusText}`,
        ok: response.ok
    };

    if (response.status === 204) {
        resultData.body = "No Content (Operación exitosa en backend sin retorno de objeto)";
    } else {
        try {
            resultData.body = await response.json();
        } catch(e) {
            resultData.body = "Respuesta recibida (No se pudo formatear como JSON plano)";
        }
    }
    
    logger.textContent = JSON.stringify(resultData, null, 2);
}

// ==========================================
// ENDPOINTS DEL CONTROLADOR: TeamsController
// ==========================================

// GET /api/Teams
async function getMyTeams() {
    const res = await fetch(`${API_BASE_URL}/Teams`, { method: 'GET', headers: getHeaders() });
    await handleResponse(res);
}

// GET /api/Teams/{id}
async function getTeamById() {
    const id = document.getElementById('ctxTeamId').value;
    const res = await fetch(`${API_BASE_URL}/Teams/${id}`, { method: 'GET', headers: getHeaders() });
    await handleResponse(res);
}

// POST /api/Teams
async function createTeam() {
    const name = document.getElementById('teamName').value;
    const payload = { name: name }; 
    const res = await fetch(`${API_BASE_URL}/Teams`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });
    await handleResponse(res);
}

// PUT /api/Teams/{id}
async function updateTeam() {
    const id = document.getElementById('ctxTeamId').value;
    const name = document.getElementById('teamName').value;
    const payload = { name: name }; 
    const res = await fetch(`${API_BASE_URL}/Teams/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });
    await handleResponse(res);
}

// DELETE /api/Teams/{id}
async function deleteTeam() {
    const id = document.getElementById('ctxTeamId').value;
    const res = await fetch(`${API_BASE_URL}/Teams/${id}`, { method: 'DELETE', headers: getHeaders() });
    await handleResponse(res);
}

// GET /api/Teams/{teamId}/members
async function getTeamMembers() {
    const teamId = document.getElementById('ctxTeamId').value;
    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/members`, { method: 'GET', headers: getHeaders() });
    await handleResponse(res);
}

// POST /api/Teams/{teamId}/members
async function addTeamMember() {
    const teamId = document.getElementById('ctxTeamId').value;
    const userId = document.getElementById('ctxUserId').value;
    if(!userId) return alert("Ingresa un ID de Usuario Objetivo");
    
    const payload = { userId: parseInt(userId) }; 
    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/members`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });
    await handleResponse(res);
}

// DELETE /api/Teams/{teamId}/members/{userId}
async function removeTeamMember() {
    const teamId = document.getElementById('ctxTeamId').value;
    const userId = document.getElementById('ctxUserId').value;
    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/members/${userId}`, { method: 'DELETE', headers: getHeaders() });
    await handleResponse(res);
}

// PUT /api/Teams/{teamId}/members/{userId}
async function updateMembership() {
    const teamId = document.getElementById('ctxTeamId').value;
    const userId = document.getElementById('ctxUserId').value;
    const role = document.getElementById('memberRole').value;
    
    const payload = { role: parseInt(role) }; 
    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/members/${userId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });
    await handleResponse(res);
}

// GET /api/Teams/{teamId}/labels
async function getTeamLabels() {
    const teamId = document.getElementById('ctxTeamId').value;
    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/labels`, { method: 'GET', headers: getHeaders() });
    await handleResponse(res);
}

// POST /api/Teams/{teamId}/labels
async function addTeamLabels() {
    const teamId = document.getElementById('ctxTeamId').value;
    const rawJson = document.getElementById('labelJsonPayload').value;
    
    let payload;
    try { payload = JSON.parse(rawJson); } catch (e) { return alert("Usa un arreglo JSON válido."); }

    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/labels`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });
    await handleResponse(res);
}

// PUT /api/Teams/{teamId}/labels/{id}
async function updateTeamLabel() {
    const teamId = document.getElementById('ctxTeamId').value;
    const labelId = document.getElementById('ctxLabelId').value;
    const rawJson = document.getElementById('labelJsonPayload').value;
    
    let payload;
    try { payload = JSON.parse(rawJson); } catch (e) { return alert("Payload de Label inválido."); }

    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/labels/${labelId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });
    await handleResponse(res);
}

// DELETE /api/Teams/{teamId}/labels/{id}
async function deleteTeamLabel() {
    const teamId = document.getElementById('ctxTeamId').value;
    const labelId = document.getElementById('ctxLabelId').value;
    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/labels/${labelId}`, { method: 'DELETE', headers: getHeaders() });
    await handleResponse(res);
}

// GET /api/Teams/{teamId}/cards
async function getTeamCards() {
    const teamId = document.getElementById('ctxTeamId').value;
    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/cards`, { method: 'GET', headers: getHeaders() });
    await handleResponse(res);
}

// GET /api/Teams/{teamId}/cards/{id}
async function getSingleTeamCard() {
    const teamId = document.getElementById('ctxTeamId').value;
    const cardId = document.getElementById('ctxCardId').value;
    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/cards/${cardId}`, { method: 'GET', headers: getHeaders() });
    await handleResponse(res);
}

// POST /api/Teams/{teamId}/cards
async function createTeamCard() {
    const teamId = document.getElementById('ctxTeamId').value;
    const title = document.getElementById('cardTitle').value;
    const payload = { title: title }; 
    
    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/cards`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });
    await handleResponse(res);
}

// PATCH /api/Teams/{teamId}/cards/{id}
async function patchTeamCard() {
    const teamId = document.getElementById('ctxTeamId').value;
    const cardId = document.getElementById('ctxCardId').value;
    const title = document.getElementById('cardTitle').value;
    const ifMatchToken = document.getElementById('cardIfMatch').value;
    
    if(!ifMatchToken) return alert("Tu API exige la cabecera 'If-Match' para control de concurrencia optimista.");

    const payload = { title: title }; 
    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/cards/${cardId}`, {
        method: 'PATCH',
        headers: getHeaders({ 'If-Match': ifMatchToken }),
        body: JSON.stringify(payload)
    });
    await handleResponse(res);
}

// DELETE /api/Teams/{teamId}/cards/{id}
async function deleteTeamCard() {
    const teamId = document.getElementById('ctxTeamId').value;
    const cardId = document.getElementById('ctxCardId').value;
    const res = await fetch(`${API_BASE_URL}/Teams/${teamId}/cards/${cardId}`, { method: 'DELETE', headers: getHeaders() });
    await handleResponse(res);
}


// ==========================================
// ENDPOINTS DEL CONTROLADOR: CardsController
// ==========================================

// GET /api/Cards/{id}
async function getCardByIdGlobal() {
    const cardId = document.getElementById('ctxCardId').value;
    const res = await fetch(`${API_BASE_URL}/Cards/${cardId}`, { method: 'GET', headers: getHeaders() });
    await handleResponse(res);
}

// GET /api/Cards/{id}/labels
async function getCardLabels() {
    const cardId = document.getElementById('ctxCardId').value;
    const res = await fetch(`${API_BASE_URL}/Cards/${cardId}/labels`, { method: 'GET', headers: getHeaders() });
    await handleResponse(res);
}

