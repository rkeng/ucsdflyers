import React from 'react'
import {ColCenter} from './ColCenter'
import { FaSearch } from 'react-icons/lib/fa'
import { InputGroup, FormControl } from 'react-bootstrap'
import { AuthWrapper, STUDENT, GUEST, ORG } from './AuthWrapper'

function SearchBar(props){
    var placeholder = props.placeholder
    var value = props.value
    var onChange = props.onChange
    return(
        <ColCenter>
            <InputGroup>
                <InputGroup.Addon><FaSearch/></InputGroup.Addon>
                <FormControl type="text" placeholder={placeholder} value={value} onChange={onChange}/>
                {props.children}
            </InputGroup>
        </ColCenter>
    )
}
export function compareTitles(a,b){
  var d1 = a.name
  var d2 = b.name
  if(d1 < d2)
    return -1;
  if(d1 > d2)
    return 1;
  return 0;
}

export function compareDates(a,b){
     var d1 = stringtoDate(a.date)
     var d2 = stringtoDate(b.date)
    // console.log(d1 , d2)
     if (d1 < d2)
       return -1;
     if (d1 > d2)
       return 1;
     return 0;
}

export function compareDatesReverse(a,b){
     var d1 = stringtoDate(a.date)
     var d2 = stringtoDate(b.date)
    // console.log(d1 , d2)
     if (d1 > d2)
       return -1;
     if (d1 < d2)
       return 1;
     return 0;
}

export function compareDueDates(a,b){
     var d1 = stringtoDate(a.dueDate)
     var d2 = stringtoDate(b.dueDate)
    // console.log(d1 , d2)
     if (d1 < d2)
       return -1;
     if (d1 > d2)
       return 1;
     return 0;
}

export function compareDueDatesReverse(a,b){
     var d1 = stringtoDate(a.dueDate)
     var d2 = stringtoDate(b.dueDate)
    // console.log(d1 , d2)
     if (d1 > d2)
       return -1;
     if (d1 < d2)
       return 1;
     return 0;
}

export function compareClubNames(a,b){
    var d1 = a.clubName
    var d2 = b.clubName
    if (d1 < d2)
      return -1;
    if (d1 > d2)
      return 1;
    return 0;
}

export function compareSeekings(a,b){
    var d1 = a.seeking
    var d2 = b.seeking
    if (d1 < d2)
      return -1;
    if (d1 > d2)
      return 1;
    return 0;
}


export function compareClubs(a,b){
    var d1 = a.name
    var d2 = b.name
    if (d1 < d2)
      return -1;
    if (d1 > d2)
      return 1;
    return 0;
}

export function compareLikes(a,b){
//    console.log(a.name , a.likes, b.name, b.likes)
    var d1 = a.likes
    var d2 = b.likes
    if (d1 > d2)
      return -1;
    if (d1 < d2)
      return 1;
    return 0;
}

export function stringtoDate(input){
    var parts = input.split('-');
    //please put attention to the month (parts[0]), Javascript counts months from 0:
    // January - 0, February - 1, etc
    var mydate = new Date(parts[0],parts[1]-1,parts[2   ]);
    return mydate
}

export function ObjectToArray(object){
    if(!object){
        return []
    }
    var keyList = Object.keys(object)
    return keyList.map(key => object[key])
}

export function IDtoObject(id){
  var obj = {}
  obj[`${id}`] = id
  return obj
}

export { ColCenter, SearchBar }
export { AuthWrapper, STUDENT, GUEST, ORG }
