import React from "react";
import { gql, useLazyQuery } from "@apollo/client";

import { Table, TableCell } from "../../shared/components/Table";

const GET_REPORT = gql`
  query getReport($startDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
    report(startDate: $startDate, endDate: $endDate)
  }
`;

const Report = ({ reportData, firstName, lastName, startDate, endDate }) => {
  console.log(reportData);
  return (
    <div>
      <h2>{firstName + " " + lastName + "'s Report"}</h2>
      <h3>{startDate + " to " + endDate}</h3>
      <Table>
        <tbody>
          {reportData &&
            reportData.map((category) => (
              <tr>
                <TableCell>{category[0]}</TableCell>
                <TableCell>{category[1]}</TableCell>
              </tr>
            ))}
          <tr>
            <td>Total</td>
            <td>
              {reportData &&
                reportData
                  .map((category) => parseFloat(category[1]))
                  .reduce((acc, cur) => cur + acc)}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export const Reports = () => {
  const [getReport, { loading, data }] = useLazyQuery(GET_REPORT);
  const [report, setReport] = React.useState(null);

  const emailRef = React.useRef();
  const startRef = React.useRef();
  const endRef = React.useRef();

  React.useEffect(() => {
    if (data?.report) {
      setReport(data.report);
    }
  }, [data]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef?.current?.value ?? "";
    const start = startRef?.current?.value ?? "";
    const end = endRef?.current?.value ?? "";

    const startDate = start && new Date(start);
    const endDateUTC = end && new Date(end).setHours(23, 59, 59, 59);
    const endDate = endDateUTC && new Date(endDateUTC).toISOString();

    if (!email || !startDate || !endDate) {
      return;
    }

    const results = await getReport({
      variables: { email, startDate, endDate },
    });

    console.log(results);
  };

  return (
    <>
      <h1>Report</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} name="email" type="email" />
        </div>
        <div>
          <label htmlFor="start-date">Start Date</label>
          <input ref={startRef} name="start-date" type="date" />
        </div>
        <div>
          <label htmlFor="end-date">End Date</label>
          <input ref={endRef} name="end-date" type="date" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <br />
      {report ? (
        <Report
          firstName="Adam"
          lastName="Okasha"
          reportData={report}
          startDate={startRef?.current?.value || ""}
          endDate={endRef?.current?.value || ""}
        />
      ) : null}
    </>
  );
};
