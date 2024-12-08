export interface UserController {
  handleGetAll(...args: any): Promise<any>;
  handleCreate(...args: any): Promise<any>;
  handleFindById(...args: any): Promise<any>;
  handleUpdate(...args: any): Promise<any>;
  deleteById(...args: any): Promise<any>;
}
