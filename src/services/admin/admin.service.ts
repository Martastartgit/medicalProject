import {IAdmin, IAdminToken} from '../../interfaces';
import {AdminModel} from '../../database/models';

class AdminService {
  createAdmin(admin: Partial<IAdmin>): Promise<IAdmin> {
    return AdminModel.create(admin);
  }

  addActionToken(id: string, tokenObject: IAdminToken): Promise<IAdmin> {
    return AdminModel.findByIdAndUpdate(id, {$push: {tokens: tokenObject}}) as any;
  }

  findOneByParams(findObject: any): Promise<IAdmin | null>{
    return AdminModel.findOne(findObject) as any;
  }

  updateByParams(id: string, params: Partial<IAdmin>): Promise<IAdmin> {
    return AdminModel.findByIdAndUpdate(id, params, {new: true}) as any;
  }

}

export const adminService = new AdminService();