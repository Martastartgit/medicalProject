import {ProcedureModel} from '../../database';
import {IProcedure, IProcedureFilterQuery} from '../../interfaces';
import {queryBuilder} from '../../helpers';

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

  findProcedureById(id: string): Promise<IProcedure | null> {
    return ProcedureModel.findById(id) as any;
  }

  getProcedures(query: Partial<IProcedureFilterQuery>): Promise<IProcedure[] | []> {
    const { skip, limit, sort, filters} = queryBuilder(query);

    if (filters.name) {
      filters.name = { $regex: filters.name as string, $options: 'i' };
    }

    return ProcedureModel.find(filters).limit(+limit).skip(skip).sort(sort) as any;
  }

}

export const procedureService = new ProcedureService();
