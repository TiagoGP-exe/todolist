const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('li');
    item.classList.add('list');
    item.innerHTML = `
        <label> 
            <input class="checkbox" type="checkbox" ${status} data-indice=${indice}> 
            <span>${tarefa}</span> 
            <button type="button" data-indice=${indice}>-</button>
        </label>`
    document.querySelector('.list').appendChild(item)
}

const limparTarefas = () => {
    const todoList = document.querySelector('.list')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value
    if (tecla === "Enter") {
        if (texto != "") {
            const banco = getBanco();
            banco.push({ 'tarefa': texto, 'status': '' });
            setBanco(banco)
            atualizarTela()
            evento.target.value = '';
        } else {
            Toast.show('Digite uma meta', 'error')
        }
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1)
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco)
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;

    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice)
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}


document.querySelector('.txtinput').addEventListener('keypress', inserirItem)
document.querySelector(".list").addEventListener('click', clickItem)

atualizarTela()
