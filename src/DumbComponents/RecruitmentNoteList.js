import React from 'react';

import { RecruitmentNote } from './RecruitmentNote'
import { ColCenter } from '../Commen'

class RecruitmentNoteList extends React.Component {


    //Generates a list of feedbacks
    render() {
            return(
              <ColCenter>
                {this.props.recruitmentNotesList.map(function(recruitmentNote, index){
                  console.log(recruitmentNote)
                  return <RecruitmentNote key={index} data={recruitmentNote}/>

                })}
              </ColCenter>
            )
        }
    }


export { RecruitmentNoteList };
