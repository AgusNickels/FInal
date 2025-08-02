export class CategoriasController {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return await this.model.getAll();
  }

  async getById(id) {
    return await this.model.getById(id);
  }
}
