FROM ubuntu:latest

LABEL maintainer = "adelle matt <adelle.lin@gmail.com>"

RUN apt-get update
RUN apt-get install -y python3 python3-dev python3-pip build-essential nginx

COPY ./ ./app
WORKDIR ./app
RUN pip3 install -r requirements.txt
ENTRYPOINT ["python3"]
CMD ["hello.py"]
