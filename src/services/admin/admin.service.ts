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

  findAdminById(id: string): Promise<IAdmin | null> {
    return AdminModel.findById(id).select('-password').exec();
  }

  // findByActionToken(action: AdminsActionEnum, token: string): Promise<IAdmin | null> {
  //   return AdminModel.findOne({$and: [
  //     {'tokens.action': AdminsActionEnum},
  //     {'tokens.token': token}
  //   ]}).exec();
  // }

  updateByParams(id: string, params: Partial<IAdmin>): Promise<IAdmin> {
    return AdminModel.findByIdAndUpdate(id, params, {new: true}) as any;
  }

  deleteAdmin(id: string): Promise<IAdmin> {
    return AdminModel.findByIdAndDelete(id) as any;
  }

}

export const adminService = new AdminService();
