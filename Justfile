bundle:
  ags3 bundle app.ts ./build/ags-shell --gtk 4

build-dir:
  mkdir -p ./build

build: build-dir bundle

run:
  ags3 run app.ts

test-notifications:
  notify-send Test1 Test1 && sleep 1
  notify-send Test2 Test2 && sleep 1
  notify-send Test3 Test3 && sleep 1
  notify-send Test4 Test4 && sleep 1
  notify-send Test5 Test5 && sleep 1
