import React from 'react'
import './preview-collection.style.scss'
import CollectinItem from '../collectin-item/collection-item.component'
export const PreviewCollcetion =({id,title , items})=>{
    console.log(items)

    return (
        <div className='collection-preview'>
           <h1 className='title'>{title.toUpperCase()}</h1>
           <div className='preview'>

           {items.filter((item,idx) => idx < 4).map(item =>(
               <CollectinItem key={item.id} item={item} />
           ))}
            </div>           
        </div>
    )
}

