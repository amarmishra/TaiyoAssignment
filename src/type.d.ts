interface IContact {
    firstName:string,
    lastName:string,
    active:boolean,
    id:string
  }
  
  type ContactState = {
    contacts: IContact[]
  }
  
  type ContactAction = {
    type: string
    payload: IContact
  }
  
  type DispatchType = (args: ContactAction) =>  ContactAction



  //type for editContact used in form

  type editCon=null | IContact


  interface CountryInfo{
        "_id": number,
        "iso2": string,
        "iso3": string,
        "lat": number,
        "long": number,
        "flag": string
  }
  //type for map data
  interface Country{
    "updated": number,
    "country": string,
    "countryInfo": CountryInfo
    "cases": number,
    "todayCases": number,
    "deaths": number,
    "todayDeaths": number,
    "recovered": number,
    "todayRecovered": number,
    "active": number,
    "critical": number,
    "casesPerOneMillion": number,
    "deathsPerOneMillion": number,
    "tests": number,
    "testsPerOneMillion": number,
    "population": number,
    "continent": string,
    "oneCasePerPeople": number,
    "oneDeathPerPeople": number,
    "oneTestPerPeople": number,
    "activePerOneMillion": number,
    "recoveredPerOneMillion": number,
    "criticalPerOneMillion": number
    }