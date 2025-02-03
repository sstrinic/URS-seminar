#!/bin/bash

python3 reader.py &
python3 logs.py &

chromium 127.0.0.1:5000

