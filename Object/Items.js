export class Items{
    #idItem;
    #description;
    #date;
    #level;
    #hourInit;
    #hourEnd;

    constructor(idItem, description, date, level, hourInit, hourEnd) {
        this.#idItem = idItem;
        this.#description = description;
        this.#date = date;
        this.#level = level;
        this.#hourInit= hourInit;
        this.#hourEnd = hourEnd;
    }

    getIdItem(){ return this.#idItem;}
    getDescription() { return this.#description; }
    getDate() { return this.#date; }
    getLevel() { return this.#level; }
    getHourInit() { return this.#hourInit; }
    getHourEnd() { return this.#hourEnd; }
    
    setIdItem(idItem){ return this.#idItem = idItem;}
    setDescription(description) { this.#description = description; }
    setDate(date) { this.#date = date; }
    setLevel(level) { this.#level = level; }
    setHourInit(hourInit) { this.#hourInit = hourInit; }
    setHourEnd(hourEnd) { this.#hourEnd = hourEnd; }
}