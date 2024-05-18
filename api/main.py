from dotenv import load_dotenv
import uvicorn
import os

from src.app import app


if __name__ == "__main__":
    load_dotenv()
    port = os.getenv("PORT") or 8080
    uvicorn.run(app, host="0.0.0.0", port=int(port), timeout_keep_alive=10, timeout_graceful_shutdown=30)
