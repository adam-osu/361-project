import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

import { useAuth } from "../Auth";
import { Table, TableCell } from "../../shared/components/Table";

const GET_REPORT = gql`
  query getReport($startDate: ISO8601DateTime, $endDate: ISO8601DateTime) {
    report(startDate: $startDate, endDate: $endDate)
  }
`;

const SEND_REPORT_EMAIL = gql`
  mutation sendReportEmail(
    $email: String!
    $subject: String!
    $message: String!
  ) {
    sendReportEmail(email: $email, subject: $subject, message: $message) {
      status
    }
  }
`;

const Report = ({ reportData, firstName, lastName, startDate, endDate }) => {
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
  const [sendReportEmail, { data: reportEmailData }] =
    useMutation(SEND_REPORT_EMAIL);
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  React.useEffect(() => {
    if (data?.report) {
      setReport(data.report);

      if (email) {
        const reportString = ReactDOMServer.renderToStaticMarkup(
          <Report
            firstName={user.firstName}
            lastName={user.lastName}
            reportData={data.report}
            startDate={startDate || ""}
            endDate={endDate || ""}
          />
        );

        sendReportEmail({
          variables: {
            email: email,
            subject: `${user.firstName} ${user.lastName}'s Expense Report - ${startDate} to ${endDate}`,
            message: reportString,
          },
        });
      }
    }
  }, [data, email, startDate, endDate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      return;
    }

    const results = await getReport({
      variables: {
        startDate: new Date(startDate),
        endDate: new Date(
          new Date(endDate).setHours(23, 59, 59, 59)
        ).toISOString(),
      },
    });
  };

  return (
    <>
      <h1>Report</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
          />
        </div>
        <div>
          <label htmlFor="start-date">Start Date</label>
          <input
            onChange={(e) => setStartDate(e.target.value)}
            name="start-date"
            type="date"
          />
        </div>
        <div>
          <label htmlFor="end-date">End Date</label>
          <input
            onChange={(e) => setEndDate(e.target.value)}
            name="end-date"
            type="date"
          />
        </div>
        <button disabled={!startDate || !endDate} type="submit">
          Submit
        </button>
      </form>
      <br />
      {report ? (
        <Report
          firstName={user.firstName}
          lastName={user.lastName}
          reportData={report}
          startDate={startDate || ""}
          endDate={endDate || ""}
        />
      ) : null}
    </>
  );
};
