import axios from "axios";
import { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchProjects() {
    axios
      .get("http://127.0.0.1:8000/api/projects")
      .then((response) => {
        setProjects(response.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(fetchProjects, []);
  console.log(projects);

  return (
    <section id="projects">
      <div className="container mt-5">
        {isLoading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {!isLoading && projects && (
          <>
            <h1>Ecco i miei progetti:</h1>
            <div className="row row-cols-2 g-3 mt-3">
              {projects.map((project) => {
                return (
                  <div key={project.id} className="col">
                    <div className="card border-dark mb-3 h-100">
                      <div className="card-header">{project.periodo}</div>
                      <div className="card-body">
                        <h5 className="card-title">{project.nome}</h5>
                        <p>{project.cliente}</p>
                        <Link to={"/" + project.id}>
                          <button className="btn btn-outline-dark btn-sm">
                            Scopri di più
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
