import React from 'react';
import ReactLoading from 'react-loading';

const Loader = ({ type, color }) => (
  <div className='w-full min-h-[40vh] flex justify-center items-center'>
	<ReactLoading type={type} color={color} height={'5%'} width={'5%'} />
  </div>
);

export default Loader;