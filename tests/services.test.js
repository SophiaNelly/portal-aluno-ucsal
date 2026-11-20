'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const registrations = {};
const appModule = {
  factory(name, creator) { registrations[name] = creator; return appModule; }
};
const storage = new Map();
const windowMock = {
  localStorage: {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, value); }
  }
};
const context = vm.createContext({
  angular: {
    module() { return appModule; },
    copy(value) { return value == null ? value : JSON.parse(JSON.stringify(value)); }
  }
});
for (const name of ['AuthService', 'AlunoService', 'NoticiasService', 'FinanceiroService']) {
  const file = path.join(__dirname, '..', 'www', 'js', 'services', name + '.js');
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, {filename: file});
}
const auth = registrations.AuthService();
const aluno = registrations.AlunoService(windowMock);
const noticias = registrations.NoticiasService();
const financeiro = registrations.FinanceiroService();

test('RF01: não permite credenciais incorretas ou vazias', () => {
  assert.equal(auth.entrar('', ''), null);
  assert.equal(auth.entrar('20261001', 'errada'), null);
  assert.equal(auth.estaAutenticado(), false);
});
test('RF01: autentica, protege a senha e encerra sessão', () => {
  const user = auth.entrar('20261001', '123456');
  assert.equal(user.nome, 'Ana Souza');
  assert.equal(user.senha, undefined);
  assert.equal(auth.estaAutenticado(), true);
  auth.sair();
  assert.equal(auth.estaAutenticado(), false);
});
test('RF02: retorna notícias e encontra detalhes por ID', () => {
  const lista = noticias.listar();
  assert.equal(lista.length, 5);
  assert.ok(lista.some(n => n.categoria === 'Evento'));
  assert.ok(lista.some(n => n.categoria === 'Notícia'));
  assert.equal(noticias.buscarPorId(3).id, 3);
  assert.equal(noticias.buscarPorId(999), null);
});
test('RF03: atualiza campos editáveis e mantém dados institucionais', () => {
  const antes = aluno.obter('20261001');
  const modificado = {
    ...antes, nome: 'Nome adulterado', curso: 'Curso adulterado', matricula: '123',
    email: 'atualizado@email.com', telefone: '(71) 90000-9999',
    endereco: {...antes.endereco, cidade: 'Simões Filho'}
  };
  aluno.salvar('20261001', modificado);
  const depois = aluno.obter('20261001');
  assert.equal(depois.nome, 'Ana Souza');
  assert.equal(depois.matricula, '20261001');
  assert.equal(depois.curso, 'Engenharia de Software');
  assert.equal(depois.email, 'atualizado@email.com');
  assert.equal(depois.endereco.cidade, 'Simões Filho');
  assert.ok(storage.size > 0);
});
test('RF04: permite escolher semestres e separa parcelas pagas/pendentes', () => {
  const semestres = financeiro.listarSemestres();
  assert.deepEqual(Array.from(semestres), ['2026.2', '2026.1', '2025.2']);
  const parcelas = financeiro.buscarPorSemestre('2026.2');
  assert.equal(parcelas.length, 6);
  assert.equal(parcelas.filter(x => x.status === 'Paga').length, 4);
  const pendentes = parcelas.filter(x => x.status === 'A Pagar');
  assert.equal(pendentes.length, 2);
  assert.ok(pendentes.every(x => x.codigo));
  assert.equal(financeiro.buscarPorSemestre('2000.1').length, 0);
});
