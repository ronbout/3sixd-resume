/**
 * just api code to take in person info and
 * build a person and candidate record
 */

import dataFetch from "../../assets/js/dataFetch";

const API_PERSON = "persons";
const API_CANDIDATE = "candidates";

export async function candidateCreate(personInfo) {
  const person = await createPersonFetch(personInfo);

  console.log("person after await: ", person);
  // check for error and if good, create Candidate
  if (person.error) {
    return person;
  }

  return await createCandidateFetch({ personId: person.id });
}

export async function createPersonFetch(personInfo) {
  const body = {
    ...personInfo
  };
  const endpoint = API_PERSON;
  return await dataFetch(endpoint, "", "POST", body);
}

async function createCandidateFetch(candInfo) {
  let body = {
    ...candInfo
  };
  const endpoint = API_CANDIDATE;
  return await dataFetch(endpoint, "", "POST", body);
}
