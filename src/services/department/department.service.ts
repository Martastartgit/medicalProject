import {DepartmentModel} from '../../database';
import {IDepartment, IProcedure} from '../../interfaces';
require('../../database/models');

class DepartmentService {
  createDepartment(departmentObject: Partial<IDepartment>): Promise<IDepartment> {
    return DepartmentModel.create(departmentObject);
  }

  findDepartmentById(id: string): Promise<IDepartment | null> {
    return DepartmentModel.findById(id).exec();
  }

  async deleteDepartment(id: string): Promise<void> {
    await DepartmentModel.findByIdAndDelete(id);
  }

  updateOne(id: string, departmentObject: Partial<IDepartment>): Promise<IDepartment> {
    return DepartmentModel.findByIdAndUpdate(id, departmentObject, {new: true}) as any;
  }
  //
  // findDepartments(): Promise<IDepartment[] | []> {
  //   return DepartmentModel.find() as any;
  // }
  finf(): Promise<IProcedure | null> {
    return DepartmentModel.find().populate('Procedures').select('Procedures') as any;
  }
  // async findUserByToken(findObject: { accessToken?: string, refreshToken?: string }): Promise<IUser | null> {
  //   const tokenWithUser = await TokenModel
  //       .findOne(findObject)
  //       .populate('userId')
  //       .select({userId: 1, _id: 0}) as any;
  //
  //   return tokenWithUser?.userId?.toJSON();
  // }

  // findByParams(query: Partial<IDoctorFilterQuery>): Promise<IDoctor[] | []> {
  //     const { skip, limit, sort, filters} = queryBuilder(query);
  //
  //     if (filters.fullName) {
  //         filters.fullName = {$regex: filters.fullName as string, $options: 'i'};
  //     }
  //
  //     return DoctorModel.find(filters).limit(+limit).skip(skip).sort(sort) as any;
  // }
}

export const departmentService = new DepartmentService();
