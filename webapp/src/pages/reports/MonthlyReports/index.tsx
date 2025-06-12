import React, { useState } from "react";
import "./monthlyReports.scss";
import { FaDownload, FaFileAlt, FaSearch } from "react-icons/fa";
import { Loader } from "../../../components/Loader/Loader";
import { NotFoundPage } from "../../other/NotFoundPage/NotFoundPage";
import { trpc } from "../../../lib/trpc";
import { getS3UploadUrl } from "@insaniyat/shared/src/s3";
import { useMe } from "../../../lib/context";
import Button from "../../../components/Button/Button";
import { Alert } from "../../../components/Alert/Alert";

export const MonthlyReports: React.FC = () => {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const { data, error, isLoading, isFetching, isError } =
    trpc.getSpendingsReport.useQuery({
      year: selectedYear,
    });

  const me = useMe();
  const deleteReport = trpc.deleteSpendingReport.useMutation();
  const trpcUtils = trpc.useUtils();

  if (isLoading || isFetching) {
    return <Loader type="page" />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data.spendingsReport || !data) {
    return <NotFoundPage message="Такой программы не существует!!!" />;
  }

  const handleDelete = async (reportId: string) => {
    try {
      await deleteReport.mutateAsync({ reportId });
      await trpcUtils.getSpendingsReport.refetch({ year: selectedYear });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSubmittingError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="monthly-reports page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            <span className="hero-title">Ежемесячные</span>
            <span className="hero-accent">Отчеты</span>
          </h1>
          <p className="hero-subtitle">Как мы распоряжаемся вашими пожертвованиями</p>
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
              <i className="fas fa-calendar-alt"></i> Выберите год:
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
              <span>Общая помощь:</span>
              <strong>{data.totalSumSpent}₽</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="reports-container">
        {data.spendingsReport.length > 0 ? (
          <div className="reports-grid">
            {data.spendingsReport.map((report) => (
              <div className={`report-card `} key={report.id}>
                <div className="card-header">
                  <div className="month-badge">
                    {report.month}
                    <span>{report.year}</span>
                  </div>
                  <div className="financial-summary">
                    <div className="financial-item received">
                      <span>Поступило</span>
                      <span className="amount">{report.totalReceived} ₽</span>
                    </div>
                    <div className="financial-item spent">
                      <span>Направлено</span>
                      <span className="amount">{report.totalSpent} ₽</span>
                    </div>
                  </div>
                </div>

                <div className="beneficiaries-count">
                  <i className="fas fa-users"></i>
                  <span>
                    Помощь оказана <strong>{report.beneficiariesCount}</strong> людям
                  </span>
                </div>

                <div className="projects-preview">
                  <h4>Что сделано в этом месяце:</h4>
                  <div className="projects-list">
                    <div className="project-item">
                      <p>{report.description}</p>
                    </div>
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
