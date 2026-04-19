export default function Home() {
  return (
    <main className="px-10 py-12 space-y-16 max-w-4xl mx-auto">

      {/* Hero */}
      <section>
        <h1 className="text-5xl font-bold text-pink-600">MOURYA N</h1>
        <p className="mt-4 text-lg text-gray-600">
          Aspiring aviator building Connections.
        </p>
      </section>

      {/* About */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">About Me</h2>
        <p className="text-gray-700">
          I’m a student interested in Airflow analysis,modelling and coding.
          Currently learning and building projects using modern tools such as Solidworks,Ansys(Static structural,Fluid FLow)
        </p>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Algae Biodiesel Poster Project</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Project 1</h3>
            <p className="text-sm text-gray-600">Short description</p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Project 2</h3>
            <p className="text-sm text-gray-600">Short description</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <p className="text-gray-700">
          solidWorks, XFLR5, Ansys FEA, 
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Contact</h2>
        <p>Email: mouryamouryan@gmail.com</p>
      </section>

    </main>
  );
}
