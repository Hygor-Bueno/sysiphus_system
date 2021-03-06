export class Utils {
    selectUniqueButton(elementClass, elementException) {
        document.querySelectorAll(`.${elementClass}`).forEach(eClass => {
            eClass.getAttribute("id") == elementException.getAttribute("id") ? eClass.setAttribute("style", "background-color:#ffffffff") : eClass.setAttribute("style", "background-color:#ffffff66")
        })
    }
    itemsMandatory(elements) {
        let response = true;
        document.querySelectorAll(elements).forEach(element => {
            if (document.querySelector(`#${element.getAttribute("id")} :nth-child(2)`).value == "") {
                response = false
            }
        })
        return response;
    }
    highestValue(items) {
        let aux = 0;
        items.forEach(item => {
            if (parseInt(item) > aux) {
                aux = item;
            }
        })

        return aux;
    }
    minutesForHour(minutes) {
        const hour = Math.floor(minutes / 60);
        const min = minutes % 60;
        const textHour = (`00${hour}`).slice(-2);
        const textMinutes = (`00${min}`).slice(-2);

        return `${textHour}:${textMinutes}`;
    }
    hourForMinutes(hour) {
        let HHmm = hour.split(":");
        let validHour = HHmm[0] == '00' ? 24 : HHmm[0]
        let reponse = ((Number(validHour) * 60) + Number(HHmm[1]));
        return reponse;
    }
    toDay() {
     
        let data = new Date();
        let day = String(data.getDate()).padStart(2, '0');
        let month = String(data.getMonth() + 1).padStart(2, '0');
        let year = data.getFullYear();
        return  year + '-' + month + '-' + day;

    }
    setDataSisyphus(newData){
        localStorage.setItem('data_sisyphus',JSON.stringify(newData))
    }
    getDataSisyphus(){ 
        let response;
        if(localStorage.getItem('data_sisyphus')){
            response = {
                error: false,
                data:JSON.parse(localStorage.getItem('data_sisyphus'))
            }
        }else{
            response = {
                error:true,
                data: 'no data'
            }
        }
        return response;
    }
    biggestDate(itens){ 
        let assistent = "1900-01-01";
        let arrayDate = [];
        Object.keys(itens).forEach(key=>{
            arrayDate.push(itens[key].date)
        })
        arrayDate.forEach(date=>{
            if(assistent < date){ 
                assistent = date
            }
        }) 
        return assistent
    }
}