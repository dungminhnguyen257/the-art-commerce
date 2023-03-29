import './FormInput.css';

import React from 'react';

interface Props {
  placeholder: string;
}

export default function FormInput(props: Props) {
  return (
    <div className="formInput">
      <label>Name</label>
      <input placeholder={props.placeholder} />
    </div>
  );
}
