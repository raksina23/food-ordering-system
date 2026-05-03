export default function Home() {
  return (
    <div style={{ textAlign:"center", padding:"4rem 2rem" }}>
      <h1>🍔 Welcome to CampusEats</h1>
      <p style={{ color:"#666", margin:"1rem 0" }}>Order food from campus restaurants</p>
      <a href="/menu" style={{ padding:"0.8rem 2rem", background:"#4ecca3", color:"#000", borderRadius:"8px", textDecoration:"none", fontWeight:"bold" }}>
        Browse Menu
      </a>
    </div>
  );
}
