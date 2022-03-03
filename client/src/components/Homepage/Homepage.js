import React from 'react';

import Left from './components/Left';
import Middle from './components/Middle';
import Right from './components/Right';

const Homepage = () => {

    return (                                      //  max-w-5xl
      <div className="grid grid-cols-12 md:gap-5 max-w-6xl m-auto w-full text-white p-2">
        <Left/>
        <Middle/>
        <Right />
      </div>
    )
}

export default Homepage
