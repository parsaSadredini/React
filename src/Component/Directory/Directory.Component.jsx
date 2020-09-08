import React ,{Component} from 'react';
import './Directory.Style.scss';
import {sections} from './10.2 directory.data'
import MenuItem from '../MenuItem/MenuItem.Component'
class Directory extends Component{
    constructor(){
        super();
        this.state= {
            section:sections
        }
    }
    render(){
        return(
            <div className="directrory-menu">
                {
                    this.state.section.map(({id, ...otherSectionVariables}) => (
                        <MenuItem  id={id} {...otherSectionVariables}/>
                    ))
                }
            </div>
        );
    }

}
export default Directory;