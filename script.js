 


const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco)=> localStorage.setItem('todoList', JSON.stringify(banco))




const criar = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice = ${indice}>
    <div>${tarefa}</div>
    <input type="button"value="X"  data-indice = ${indice}>
    `;
    document.getElementById('todo_list').appendChild(item);
    /*quando essa função for chamada ela criará esses elementos*/
}
const  limparTarefas =()=>{
 const todoList = document.getElementById('todo_list');
while(todoList.firstChild){
    todoList.removeChild(todoList.lastChild);
}
// remove a última tarefa

} 
const atualizarTela = () =>{
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criar (item.tarefa,item.status,indice));
   
    /*pega os objetos e os indices do banco de dados e manda para  a função criar)  */
}
const inserirItem = (evento) =>{
   const tecla = evento.key
   let texto = document.getElementById('newItem').value;
   if(tecla === 'Enter'){
    const banco = getBanco();
    banco.push( {'tarefa': texto,'status':''})
    setBanco(banco);
    atualizarTela ();
    evento.target.value = '';

   }
//    adiciona a tarefa no banco de dados
}
const removerItem=(indice) =>{
   const banco = getBanco();
    banco.splice(indice,1);
    setBanco(banco)
    atualizarTela ();
}
const atualizarItem = (indice) =>{
   const banco = getBanco()
    banco[indice].status=  banco[indice].status===''?'checked':'';
    setBanco(banco)
    atualizarTela();
} 
const clickItem = (evento) =>{
    const elemento= evento.target;
    if(elemento.type ==='button'){
        const indice= elemento.dataset.indice;
        removerItem(indice);
    }else if(elemento.type==='checkbox'){
        const indice= elemento.dataset.indice;
        atualizarItem(indice);
    }

    
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todo_list').addEventListener('click',clickItem)
atualizarTela ();