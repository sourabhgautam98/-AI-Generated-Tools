import Dashboard from "@/containers/Dashboard";


export default function Home() {
  return (
    <main
      style={{
       
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "80vh",
      }}
    >
      <Dashboard />
    </main>
  );
}
