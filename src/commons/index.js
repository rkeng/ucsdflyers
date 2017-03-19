import React from 'react'
import { Col } from 'react-bootstrap'
import { ColCenter } from './ColCenter'
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

function getWindowSize(){
   var d= document, root= d.documentElement, body= d.body;
   var width= window.innerWidth || root.clientWidth || body.clientWidth, 
   height= window.innerHeight || root.clientHeight || body.clientHeight ;
   return {width, height}
}

// function windowIsXm(){
//     const { width } = getWindowSize()
//     return width < 768
// }

// function windowIs(size){
//     const { width } = getWindowSize()
//     var xs, sm, md, lg
//         xs = width < 768
//         sm = width >= 768 && width < 992
//         md = width >= 992 && width < 1200
//         lg = width >= 1200
//     return { xs, sm, md, lg }
// }

function ColFull(props){
    return(
        <Col xs={12} sm={12} md={12} lg={12}>
            {props.children}
        </Col>
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

    //  var d1 = stringtoDate(a.date)
    //  var d2 = stringtoDate(b.date)
    // // console.log(d1 , d2)
    //  if (d1 < d2)
    //    return -1;
    //  if (d1 > d2)
    //    return 1;
    //  return 0;
     return Date.parse(a.date) - Date.parse(b.date)
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
    // var d1 = a.likes
    // var d2 = b.likes
    // if (d1 > d2)
    //   return -1;
    // if (d1 < d2)
    //   return 1;
    // return 0;
    return -(a.likes - b.likes)
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

export function activeDate(date){
    var givenDate = Date.parse(date)
    var today = Date.parse(new Date().toISOString().substring(0, 10))
    return givenDate >= today
}

export { ColCenter, SearchBar, ColFull, getWindowSize }
export { AuthWrapper, STUDENT, GUEST, ORG }
