import {IProcedure, IProcedureFilter, IProcedureFilterQuery} from '../../interfaces';
import {ProcedureModel} from '../../database/models';
import {queryBuilder} from '../../helpers/queryBuilder';

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

  getProcedures(query: Partial<IProcedureFilterQuery> | null): Promise<IProcedure[] | []> {
    const { skip,
      limit,
      sort,
      filters} = queryBuilder(query);

    const filterObject: Partial<IProcedureFilter> = {};

    // const keys = Object.keys(filters) as Array<keyof IProcedureNameFilter>;
    //
    // keys.forEach((key) => {
    //   switch (key) {
    //     case 'name':
    //       filterObject.name = { $regex: filters.name as string, $options: 'i' };
    //       break;
    //     default:
    //       filterObject[key] = filters[key];
    //   }
    // });

    if (filters.length) {
      console.log('hhh');
      filterObject.name = { $regex: filters.name as string, $options: 'i' };
      // console.log(filterObject);
    }

    return ProcedureModel.find(filterObject).limit(+limit).skip(skip).sort(sort) as any;

  }

}

export const procedureService = new ProcedureService();
