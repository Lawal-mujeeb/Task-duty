import React from 'react'

export default function ErrorAlert({error}) {  
  return (
   <div role="alert" className="alert alert-error alert-soft">
  <span>Error! {error}.</span>
  
</div>
  );
}