import React from 'react';

import Left from '../../components/Homepage/components/Left';
import Right from '../../components/Homepage/components/Right';
import MiddleSearch from './components/MiddleSearch';


const Search = () => {
    
    return (
        <div className="grid grid-cols-12 md:gap-5 max-w-6xl m-auto w-full text-white p-2">
            <Left />
            <MiddleSearch />
            <Right />
        </div>
    )
}

export default Search
