import {IProcedure} from '../../interfaces';
import {ProcedureModel} from '../../database/models';

class ProcedureService {
  createProcedure(procedureObject: Partial<IProcedure>): Promise<IProcedure> {
    return ProcedureModel.create(procedureObject);
  }

  updateProcedure(id: string, procedureObject: Partial<IProcedure>): Promise<IProcedure> {
    return ProcedureModel.findByIdAndUpdate(id, procedureObject, {new: true}) as any;
  }

  async deleteProcedure(id: string): Promise<void> {
    await ProcedureModel.findByIdAndDelete(id);
  }

  findOneProcedure(findObject: any): Promise<IProcedure | null> {
    return ProcedureModel.findOne(findObject) as any;
  }

}

export const procedureService = new ProcedureService();
