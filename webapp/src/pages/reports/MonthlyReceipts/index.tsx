import React, { useState } from "react";
import "./index.scss";
import { FaCalendar, FaDownload, FaFileAlt, FaSearch } from "react-icons/fa";
import { trpc } from "../../../lib/trpc";
import { Loader } from "../../../components/Loader/Loader";
import { NotFoundPage } from "../../other/NotFoundPage/NotFoundPage";
import { getS3UploadUrl } from "@insaniyat/shared/src/s3";
import { useMe } from "../../../lib/context";
import Button from "../../../components/Button/Button";
import { Alert } from "../../../components/Alert/Alert";

export const MonthlyDonations: React.FC = () => {
  const currentYear = new Date().getFullYear().toString();
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const trpcUtils = trpc.useUtils();

  const me = useMe();

  const { data, error, isLoading, isFetching, isError } = trpc.getIncomeReport.useQuery({
    year: selectedYear,
  });

  const deleteReport = trpc.deleteIncomeReport.useMutation();

  if (isLoading || isFetching) {
    return <Loader type="page" />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data.incomeReport || !data) {
    return <NotFoundPage message="Такой программы не существует!!!" />;
  }

  const handleDelete = async (reportId: string) => {
    try {
      await deleteReport.mutateAsync({ reportId });
      await trpcUtils.getIncomeReport.refetch({ year: selectedYear });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSubmittingError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="monthly-donations page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            <span className="hero-title">Ежемесячные</span>
            <span className="hero-accent">Поступления</span>
          </h1>
          <p className="hero-subtitle">Прозрачность и открытость каждого пожертвования</p>
          <div className="hero-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-wave"></div>
          </div>
        </div>
      </div>

      <div className="controls-container">
        <div className="controls">
          <div className="year-selector">
            <label htmlFor="year">
              <FaCalendar />
              Выберите год:
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="styled-select"
            >
              <option value={currentYear}>{currentYear}</option>
              <option value={+currentYear - 1}>{+currentYear - 1}</option>
              <option value={+currentYear - 2}>{+currentYear - 2}</option>
            </select>
          </div>
          <div className="stats-summary">
            <div className="summary-item">
              <span>Общая сумма:</span>
              <strong>{data.totalSum._sum.totalReceived}₽</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="reports-container">
        {data.incomeReport.length > 0 ? (
          <div className="reports-grid">
            {data.incomeReport.map((report) => (
              <div
                className={`report-card ${hoveredCard === report.id ? "hovered" : ""}`}
                key={report.id}
                onMouseEnter={() => setHoveredCard(report.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card-header">
                  <div className="month-badge">
                    {report.year}
                    <span>{report.month}</span>
                  </div>
                  <div className="amount-display">
                    <span className="amount">{report.totalReceived}</span>
                    <span className="currency">₽</span>
                  </div>
                </div>

                <div className="card-footer">
                  <a
                    href={getS3UploadUrl(report.fileUrl)}
                    className="download-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaDownload /> Полный отчет
                    <span className="file-format">PDF</span>
                  </a>
                  {me?.isAdmin && (
                    <>
                      <Button
                        onClick={() => handleDelete(report.id)}
                        width="100%"
                        variant="danger"
                        children="Удалить отчет"
                      />
                      {submittingError && (
                        <Alert color="red" children={submittingError} />
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-illustration">
              <div className="illustration-container">
                <div className="empty-box">
                  <FaFileAlt />
                </div>
                <div className="search-icon">
                  <FaSearch />
                </div>
              </div>
            </div>
            <h3>Нет отчетов за выбранный период</h3>
            <p>Попробуйте выбрать другой год или зайдите позже</p>
          </div>
        )}
      </div>
    </div>
  );
};
