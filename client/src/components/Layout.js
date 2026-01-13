import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px" }}>
        {children}
      </main>
    </>
  );
}

export default Layout;
