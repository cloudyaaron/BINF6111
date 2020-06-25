export class HPOTerm {
  constructor(private details: Details, private relations: Relations) {}
};

export interface Details {
  name: string,
  id:   string,
  altTermIds: string[], 
  definition: string,
  comment: string,
  synonyms: string[], 
  isObsolete: boolean,
  xrefs: string[],
  pubmedXrefs: string[] 
};

export interface Relations {
  termCount: number, 
  parents: RelationTerm[],
  children: RelationTerm[]
};

export interface RelationTerm {
  id: number,
  name: string,
  childrenCount: number,
  ontologyId: string
}; 