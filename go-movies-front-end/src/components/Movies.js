import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
      const headers = new Headers();
      headers.append("Content-Type","application/json");
      
      const requestOptions = {
        method: "GET",
        headers: headers,
      }

      fetch(`http://localhost:8080/movies`, requestOptions)
          .then((response) => response.json())// Converts the response to JSON
          .then((data) => {
            setMovies(data);// This runs if the promise is fulfilled
          })
          .catch(err => {
            console.log(err);
          })
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <hr />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Release Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td>
                <Link to={`/movies/${m.id}`}>{m.title}</Link>
              </td>
              <td>{m.release_date}</td>
              <td>{m.mpaa_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Movies;
