import './index.scss'

export const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-page__title">Ошибка!</h1>
      <p className="error-page__dscr">Извините, такой страницы не существует.</p>
    </div>
  );
}