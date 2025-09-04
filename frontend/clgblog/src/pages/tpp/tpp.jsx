import './tpp.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Tpp() {
  return (
    <>
      <div className="my-2 d-flex justify-content-center">
        <div className="d-flex" style={{ gap: "8.5rem" }}>
          
          {/* Theory Card */}
          <div className="card" style={{ width: '18rem' }}>
            <img src="/media/theory.png" className="card-img-top" alt="theory" />
            <div className="card-body">
              <h5 className="card-title">Theory Subject Materials</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card’s content.
              </p>
              <Link to="/theory">
                <button className="btn btn-primary">open</button>
              </Link>
            </div>
          </div>

          {/* Practical Card */}
          <div className="card" style={{ width: '18rem' }}>
            <img src="/media/practical.png" className="card-img-top" alt="practical" />
            <div className="card-body">
              <h5 className="card-title">Practical Subject Materials</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card’s content.
              </p>
              <Link to="/practical">
                <button className="btn btn-primary">open</button>
              </Link>
            </div>
          </div>

          {/* Previous Papers Card */}
          <div className="card" style={{ width: '18rem' }}>
            <img src="/media/previous.png" className="card-img-top" alt="previous papers" />
            <div className="card-body">
              <h5 className="card-title">Previous Question Papers</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card’s content.
              </p>
              <Link to="/previous">
                <button className="btn btn-primary">open</button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Tpp;
