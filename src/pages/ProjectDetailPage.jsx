import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function fetchProject() {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setProject(response.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(fetchProject, []);

  return (
    <section id="project">
      <div className="container mt-5">
        {/* LOADER */}

        {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* PROJECT */}

        {project && (
          <>
            <h1 className="mb-3">{project.nome}</h1>
            <div className="card border-secondary mb-3">
              <div className="card-header d-flex justify-content-between">
                <span>{project.periodo}</span>
                <span>{project.type.nome}</span>
              </div>
              <div className="card-body text-secondary">
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div>
                    <h4 className="card-title d-inline-block me-2">
                      {project.nome}
                    </h4>
                    {project.technologies.map((technology) => {
                      return (
                        <span
                          key={technology.id}
                          className="badge rounded-pill me-1"
                          style={{ backgroundColor: `${technology.colore}` }}
                        >
                          {technology.nome}
                        </span>
                      );
                    })}
                  </div>
                  <span>{project.cliente}</span>
                </div>
                <p className="card-text mt-3">{project.riassunto}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
