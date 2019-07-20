/**
 * just api code to take in person info and
 * build a person and candidate record
 */

import { convertNullsToEmpty } from "../../assets/js/library";

const API_PERSON = "persons";
const API_CANDIDATE = "candidates";
const API_QUERY = "?api_cc=three&api_key=fj49fk390gfk3f50";

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
  const urlBase = window.apiUrl;
  let body = {
    ...personInfo
  };
  const basicUrl = `${urlBase}${API_PERSON}${API_QUERY}`;
  let httpConfig = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const response = await fetch(basicUrl, httpConfig);
    let result = await response.json();
    // figure out what to do here
    console.log("person result: ", result);
    if (result.error) {
      return result;
    } else {
      result = convertNullsToEmpty(result.data);
      return result;
    }
  } catch (error) {
    console.log("Fetch error: ", error);
    return error;
  }
}

async function createCandidateFetch(candInfo) {
  const urlBase = window.apiUrl;
  let body = {
    ...candInfo
  };
  const basicUrl = `${urlBase}${API_CANDIDATE}${API_QUERY}`;
  let httpConfig = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const response = await fetch(basicUrl, httpConfig);
    let result = await response.json();
    // figure out what to do here
    if (result.error) {
      return result;
    } else {
      result = convertNullsToEmpty(result.data);
      return result;
    }
  } catch (error) {
    console.log("Fetch error: ", error);
    return error;
  }
}
