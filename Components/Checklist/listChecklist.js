import { Utils } from "../../Utils/utils.js";
import { Points } from "../Points/Points.js";

export class ListChecklist {
    utils = new Utils
    point = new Points
    template() { 
        return `
        <div id='divListChecklist'>
            <header>
                <h1>Checklists criados.</h1>
            </header>
            <section>
                ${this.list() || ""}
            </section>
        </div>
        `
    }
    list() {
        if (localStorage.getItem('data_sisyphus')) {
            let listChecklist = JSON.parse(localStorage.data_sisyphus);
            let response = "";
            Object.keys(listChecklist).forEach(key => {
                response += `<li><i>${listChecklist[key]['title']}</i> <button type="button" data-function="deleteChecklist" value='${key}'>X</button></li>`
            })
            return `<ol>${response}</ol>`
        }
    }
    listHome() {
        if (localStorage.getItem('data_sisyphus')) {
            let listChecklist = JSON.parse(localStorage.data_sisyphus);
            let response = "";
            Object.keys(listChecklist).forEach(key => {
                if(this.utils.biggestDate(listChecklist[key]['listItems']) >= this.utils.toDay()){                
                    response += `
                    <div class="itemChecklist"  id="itemChecklist${key}">
                        <header value="${key}"><p>${listChecklist[key]['title']}</p></header>
                        <section style="display: none">
                            ${this.itemsChecklistToday(listChecklist[key]['listItems'],key) || '<b>* Ops! Você não possuí tarefas para hoje.</b>'}
                        </section>
                    </div>`
                }
            })
            return `${response}`
        }
    }
    settingsList(){
       if(document.querySelectorAll('.itemChecklist')){ 
           document.querySelectorAll('.itemChecklist header').forEach(element=>{
               element.addEventListener('click',()=>{
                this.controllerChecklist(element.getAttribute('value'));
               })
           })
       }
    }
    itemsChecklistToday(item,keyChecklist) {
        let response ="";
        Object.keys(item).forEach(key => {
            if(item[key].date == this.utils.toDay()){
                response += `<div><input data-function="checkedItem" value=${key} data-checklist=${keyChecklist} type="checkbox" id='${keyChecklist}_${item[key].idItem}' ${item[key].done && 'checked disabled'}/><label for='${keyChecklist}_${item[key].idItem}'><i>${item[key].description}</i></label></div>`
            }
        })
        return response;
    }
    openChecklist(element){
        document.querySelector(`#itemChecklist${element} section`).style.display = 'flex';
    }
    closeChecklist(element){ 
        document.querySelector(`#itemChecklist${element} section`).style.display = 'none';
    }
    doneItem(element){ 
        this.point.setPoint(parseInt(localStorage.getItem('point_sisyphus')))           
        let dataSisyphus = JSON.parse(localStorage.data_sisyphus)        
        let item = dataSisyphus[element.getAttribute('data-checklist')].listItems[element.value];
        item.done = true;
        element.disabled = true;
        this.utils.setDataSisyphus(dataSisyphus)
        this.point.setPoint(parseInt(item.level) * 20 + this.point.getPoint())
    }

    controllerChecklist(element){ 
        if(document.querySelector(`#itemChecklist${element} section`).style.display == 'flex'){
            this.closeChecklist(element);
        }else{       
            this.openChecklist(element);
        }
    }
    deleteChecklist(key) {
        let listChecklist = JSON.parse(localStorage.data_sisyphus);
        delete listChecklist[key];
        localStorage.data_sisyphus = JSON.stringify(listChecklist);
        this.reloadList();
    }
    reloadList() {
        document.querySelector('#divListChecklist section').innerHTML = "";
        document.querySelector('#divListChecklist section').insertAdjacentHTML('beforeend', this.list())
    }
}