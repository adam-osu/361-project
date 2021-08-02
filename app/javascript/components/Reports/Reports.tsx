import React from "react";

export const Reports = () => {
  return (
    <>
      <h1>Report</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="start-date">Start Date</label>
          <input name="start-date" type="date" />
        </div>
        <div>
          <label htmlFor="end-date">End Date</label>
          <input name="end-date" type="date" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
