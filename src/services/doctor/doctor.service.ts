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

  updateDoctor(id: string, doctorObject: Partial<IDoctor>): Promise<IDoctor> {
    return DoctorModel.findByIdAndUpdate(id, doctorObject, {new: true}) as any;
  }

}

export const doctorService = new DoctorService();
