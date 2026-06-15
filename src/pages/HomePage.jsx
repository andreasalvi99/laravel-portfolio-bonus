import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function HomePage() {
  const [projects, setProjects] = useState([]);

  function fetchProjects() {
    axios.get("http://127.0.0.1:8000/api/projects").then((response) => {
      setProjects(response.data.data);
    });
  }

  useEffect(fetchProjects, []);
  console.log(projects);

  return (
    <section id="projects">
      <div className="container mt-5">
        <div className="row row cols 2">
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
      </div>
    </section>
  );
}
