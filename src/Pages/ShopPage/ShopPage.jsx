import React from 'react'
import SHOP_DATA from './2.2 shop.data'
import {PreviewCollcetion} from '../../Component/preview-collcetion/preview-collection.components'
import Header from '../../Component/Header/Header.component'
export default class ShpoPage extends React.Component{
    constructor(props){
        super(props)

        this.state={
            collection :SHOP_DATA
        }
    }
    render(){
        const {collection} = this.state
        return (
            <div className='shope-page'>
                <Header/>
                {
                    collection.map(({id , ...otheProperties}) => (
                        <PreviewCollcetion key={id} {...otheProperties}/>
                    ))
                }

            </div>
        )
    }
}