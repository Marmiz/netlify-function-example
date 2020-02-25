import React from "react";

function CustomerCard({ customer }) {
  const { data } = customer;
  return (
    <div className="card">
      <div className="card__banner" />
      <div className="card__content">
        <figure className="profile-pic">
        </figure>
        <h2 className="title">
          {data.firstName}<br/>{data.lastName}
        </h2>
      </div>
      <div className="card__footer">footer</div>
    </div>
  );
}

export default CustomerCard;
