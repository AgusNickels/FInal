import "./Home.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Home() {
  return (
    <section className="home-container">
      <h2>Bienvenidos a Tienda Chichos</h2>
      <p className="home-description">
        Somos una tienda especializada en productos para mascotas.
        Encontrá todo lo que tu compañero necesita.
      </p>

      <div className="home-contact">
        <p><FaMapMarkerAlt /> Dellepiane Sur 4350 C1407, CABA Buenos Aires</p>
        <p><FaPhoneAlt /> +54 11 68928007</p>
        <p><FaEnvelope /> Yaaz97@gmail.com</p>
      </div>

      <div className="home-map">
        <iframe
          title="Ubicación Tienda Chichos"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.6760028450155!2d-58.48348198428952!3d-34.63767838045273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb97ceac0dd1%3A0xe88ef4c7fa8aa448!2sDellepiane%20Sur%204350%2C%20C1407%20CABA!5e0!3m2!1ses-419!2sar!4v1691082878470!5m2!1ses-419!2sar"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}

export default Home;
