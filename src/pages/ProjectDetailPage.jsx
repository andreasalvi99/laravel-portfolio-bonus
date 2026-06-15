import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState();

  function fetchProject() {
    axios.get(`http://127.0.0.1:8000/api/projects/${id}`).then((response) => {
      console.log(response.data.data);
      setProject(response.data.data);
    });
  }

  useEffect(fetchProject, []);

  return (
    <section id="project">
      <div className="container mt-5">
        {project && (
          <div className="card border-secondary mb-3">
            <div className="card-header d-flex justify-content-between">
              <span>{project.periodo}</span>
              <span>{project.type.nome}</span>
            </div>
            <div className="card-body text-secondary">
              <h5 className="card-title d-inline-block me-2">{project.nome}</h5>
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
              <p className="card-text">{project.riassunto}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
