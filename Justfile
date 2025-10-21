bundle:
  ags3 bundle app.ts ./build/ags-shell --gtk 4

build-dir:
  mkdir -p ./build

build: build-dir bundle

run:
  ags3 run app.ts
