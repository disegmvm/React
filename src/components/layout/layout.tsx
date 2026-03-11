export const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Рестики</h1>
      </header>

      <main>{children}</main>

      <footer>
        <p>Домашка по react</p>
      </footer>
    </div>
  );
};