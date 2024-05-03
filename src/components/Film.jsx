/* Burada Değişiklik yapmanıza gerek yok */
export const Film = ({ film }) => {
  return (
    <div className="film-card karakter-card">
      <h4>{film.title}</h4>
      <p>
        <span className="label">Director</span>
        <span className="value">{film.director}</span>
      </p>
      <p>
        <span className="label">Release Date</span>
        <span className="value">{film.release_date}</span>
      </p>
    </div>
  );
};
