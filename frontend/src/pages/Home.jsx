function Home() {
  return (
    <section style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
      <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>Bienvenidos a Tienda Chichos</h2>
      <p style={{ fontSize: "18px" }}>
        Somos una tienda especializada en productos para mascotas. Encontrá todo lo que tu compañero necesita.
      </p>
      <div style={{ marginTop: "30px", fontSize: "14px", color: "#555" }}>
        <p>📍 Av. Mascotas 123, Buenos Aires</p>
        <p>📞 +54 11 3334-5566</p>
        <p>📧 contacto@tiendachichos.com</p>
      </div>
    </section>
  );
}

export default Home;
