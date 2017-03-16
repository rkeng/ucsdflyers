import React from 'react';
import { RecruitmentNote } from './RecruitmentNote'
import { ColCenter } from '../Commen'
import Masonry from 'react-masonry-component'


class RecruitmentNoteList extends React.Component {


    //Generates a list of feedbacks
    render() {
            return(
                <Masonry
                className={'my-gallery-class'}
                options={{transitionDuration: 800}}
                enableResizableChildren={true} 
                >
                {this.props.recruitmentNotesList.map(function(recruitmentNote, index){
                  return( 
                    <ColCenter>
                      <RecruitmentNote key={index} data={recruitmentNote}/>
                    </ColCenter>
                  )

                })}
                </Masonry>
            )
        }
    }


export { RecruitmentNoteList };
