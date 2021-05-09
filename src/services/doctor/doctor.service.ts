import {DoctorModel} from '../../database';
import {IDoctor, IDoctorFilterQuery} from '../../interfaces';
import {queryBuilder} from '../../helpers';

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

  findByParams(query: Partial<IDoctorFilterQuery>): Promise<IDoctor[] | []> {
    const { skip, limit, sort, filters} = queryBuilder(query);

    if (filters.fullName) {
      filters.fullName = {$regex: filters.fullName as string, $options: 'i'};
    }

    return DoctorModel.find(filters).limit(+limit).skip(skip).sort(sort) as any;
  }

}

export const doctorService = new DoctorService();
