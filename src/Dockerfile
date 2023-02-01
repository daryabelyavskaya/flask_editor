FROM python:3.6
ADD . /app
WORKDIR /app
EXPOSE 6000
RUN pip install -r requirements.txt
ENTRYPOINT ["python","index.py"]