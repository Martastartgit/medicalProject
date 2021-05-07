import {IDoctor} from '../../interfaces';
import {DoctorModel} from '../../database';

class DoctorService {
  createDoctor(doctorObject: Partial<IDoctor>): Promise<IDoctor> {
    return DoctorModel.create(doctorObject);
  }

  findDoctorById(id: string): Promise<IDoctor | null> {
    return DoctorModel.findById(id).exec();
  }

  async deleteDoctor(id: string): Promise<void> {
    await DoctorModel.findByIdAndDelete(id);
  }

  updateOne(id: string, doctorObject: Partial<IDoctor>): Promise<IDoctor> {
    return DoctorModel.findByIdAndUpdate(id, doctorObject, {new: true}) as any;
  }

  // findByParams(query: Partial<IDoctorFilterQuery>): Promise<IDoctor | IDoctor[] | null> {
  //   const { skip, limit, sort, filters} = queryBuilder(query);
  //   const filterObject: Partial<IDoctorFilter> = {};
  //   const keys = Object.keys(filters) as Array<keyof IDoctorFilterParams>;
  //
  //   keys.forEach((key) => {
  //     if (key === 'fullName') {
  //       filterObject.fullName = {$regex: filters.fullName as string, $options: 'i'};
  //     } else if (key === 'profession') {
  //       filterObject.profession = {$regex: filters.profession as string, $options: 'i'};
  //     } else {
  //
  //       filterObject[key] = filters[key];
  //     }
  //   });
  //
  //   return DoctorModel.find(filterObject).limit(+limit).skip(skip).sort(sort) as any;
  // }

}

export const doctorService = new DoctorService();
