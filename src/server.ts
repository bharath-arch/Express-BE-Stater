import app from "./app";
import { setupPrismaProvider } from "./utils/setup-db";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Ensure database provider is correctly set based on env
    setupPrismaProvider();
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Metrics available at http://localhost:${PORT}/api/metrics`);
      console.log(`Health check at http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
