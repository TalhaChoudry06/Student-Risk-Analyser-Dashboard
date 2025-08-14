FROM python:3.9-slim

# Set working directory inside container
WORKDIR /app/FlaskAPIServer

# Copy requirements and install
COPY FlaskAPIServer/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask server code
COPY FlaskAPIServer /app/FlaskAPIServer

# Copy data folder
COPY data /app/FlaskAPIServer/data

# Use headless matplotlib
ENV MPLBACKEND=Agg

# Set PYTHONPATH so imports work
ENV PYTHONPATH=/app/FlaskAPIServer

EXPOSE 5000

# Run the server
CMD ["python", "APIServer.py"]
