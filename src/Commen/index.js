import React from 'react'
import {ColCenter} from './ColCenter'
import { FaSearch } from 'react-icons/lib/fa'
import { InputGroup, FormControl } from 'react-bootstrap'

function SearchBar(props){
    var placeholder = props.placeholder
    return(
        <ColCenter>
            <InputGroup>
                <InputGroup.Addon><FaSearch/></InputGroup.Addon>
                <FormControl type="text" placeholder={placeholder}/>
            </InputGroup>
        </ColCenter>
    )
}





export { ColCenter, SearchBar }
