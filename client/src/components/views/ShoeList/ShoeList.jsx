import React from 'react';
import ShoeCard from '../ShoeCard/ShoeCard';

const ShoeList = (props) => {
    const { shoes } = props;
    console.log(shoes);
    const listShoes = shoes.map((shoe) =>
        <div key={shoe._id} className="col-4">
            <ShoeCard shoe={shoe}/>
        </div>
    );
    return (
        <div className="row">
            {listShoes}
        </div>);
}

export default ShoeList;