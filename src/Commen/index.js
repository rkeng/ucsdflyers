import React from 'react'
import {ColCenter} from './ColCenter'
import { FaSearch } from 'react-icons/lib/fa'
import { InputGroup, FormControl } from 'react-bootstrap'

function SearchBar(props){
    var placeholder = props.placeholder
    var value = props.value
    var onChange = props.onChange
    return(
        <ColCenter>
            <InputGroup>
                <InputGroup.Addon><FaSearch/></InputGroup.Addon>
                <FormControl type="text" placeholder={placeholder} value={value} onChange={onChange}/>
            </InputGroup>
        </ColCenter>
    )
}





export { ColCenter, SearchBar }
