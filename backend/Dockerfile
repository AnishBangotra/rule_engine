# Dockerfile (in ./backend)
FROM python:3.10-slim
# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# Set the working directory inside the container
WORKDIR /app
# Copy only requirements first to leverage Docker's caching
COPY requirements.txt /app/requirements.txt
# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r /app/requirements.txt
# Now copy the rest of the backend project files
COPY . /app
# Expose the FastAPI default port
EXPOSE 8000
# Start the FastAPI server using Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]