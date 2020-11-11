import React from 'react';
import ShoeCard from './ShoeCard';
import './Home/Home.css';

const ShoeList = (props) => {
    const { shoes } = props;
    console.log(shoes);
    const listShoes = [1,2,3].map((shoe) =>
        <div key={shoe} class="col-3">
            <ShoeCard shoe={shoe}/>
        </div>
    );
    return (
        <div class="row">
            {listShoes}
        </div>);
}

export default ShoeList;