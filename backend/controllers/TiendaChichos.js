export class TiendaChichos {
    constructor (model) { this.model = model;}

    async GetTiendaChichos(){
        const result = await this.model.GetTiendaChichos();

        return result;

    }
    async GetTiendaChichosForID(id){
        const result = await this.model.GetTiendaChichosForID(id);
        
        return result;
    }
    async GetTiendaChichosForFilter(typeFilter, filter) {
        const result = await this.model.GetTiendaChichosForFilter(typeFilter, filter);

        return result;
    }
    async CreateProduct(data){
        const result = await this.model.CreateProduct(data);

        return result;

    }
    async UpdateProduct(data, id){
        const result = await this.model.UpdateProduct(data, id);
        
        return result;
    }
    async UpdateProductForFilter(data, filter){
        const result = await this.model.UpdateProductForFilter(data, filter);

        return result;

    }
    async ReplaceProduct(data, id){
        const result = await this.model.ReplaceProduct(data, id);
        
        return result;
    }
    async DeleteProduct(id){
        const result = await this.model.DeleteProduct(id);
        
        return result;
    }
    async DeleteProductForFilter(filter){
        const result = await this.model.DeleteProductForFilter(filter);

        return result;

    }


}