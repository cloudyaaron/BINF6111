import { Patient, Info } from './patient';

export function initializePatients(patients) {
  console.log('initializePatients!')
  let list = [];
  let size = Object.keys(patients).length;

  for(let i=0; i<size;i++){
    let id = patients[i]['report_id'];
    let sex = patients[i]['sex'];
    let clinicalStatus = patients[i]['clinicalStatus'];
    let externalID = patients[i]['external_id'];
    let patient: Info = {id:id, sex:sex, clinicalStatus:clinicalStatus, external_id:externalID, standard:[], nonStandard:[]};
    
    for(let feature of patients[i].features) {
      patient.standard.push(feature)
    }

    for(let feature of patients[i].nonstandard_features) {
      patient.nonStandard.push(feature)
    }

    list.push(patient)
  }
  console.log(list)
  return list;
}