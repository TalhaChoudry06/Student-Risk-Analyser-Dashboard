import React from 'react';
import { useNavigate } from 'react-router-dom';
import FilterForm from './FilterForm';
import '../css/RiskTable.css';

const RiskTable = ({ risklevel }) => {
    return (
      <div className="risk-box">
        Your risk level is {risklevel !== undefined ? risklevel.toString() : 'N/A'}
      </div>
    );
  };
      
export default RiskTable;
  