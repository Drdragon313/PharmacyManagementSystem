import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SchemaDetail = () => {
  const { schemaId } = useParams();
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);

  console.log('schemaDataArray:', schemaDataArray);


  const schemaIndex = parseInt(schemaId, 10) - 1; 
  if (schemaIndex >= 0 && schemaIndex < schemaDataArray.length) {
    const schema = schemaDataArray[schemaIndex];
    console.log('schemaId:', schemaId);
    console.log('schemaIndex:', schemaIndex);
    console.log('schemaDataArray:', schemaDataArray);
    return (
      <div>
        <h2>Schema Details</h2>
        <p>Name: {schema.name}</p>
        <div>
          {schemaDataArray}
        </div>
=
      </div>
    );
  } else {

    return <div>Schema not found</div>;
  }
}

export default SchemaDetail;
